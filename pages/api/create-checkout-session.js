// /api/create-checkout-session
import { stripe } from '../../lib/stripe';
import fs from 'fs';
import path from 'path';
import { initFirebaseAdmin } from '../../lib/firebaseAdmin';

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  try{
    const { items, email } = req.body || {};
    if(!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error:'Invalid items' });

    // fetch product catalog (prefer admin Firestore)
    let products = null;
    const admin = initFirebaseAdmin();
    if(admin){
      const db = admin.firestore();
      const snap = await db.collection('products').get();
      products = snap.docs.map(d=>d.data());
    } else {
      const file = path.join(process.cwd(),'public','data','products.json');
      products = JSON.parse(fs.readFileSync(file,'utf8'));
    }
    const map = Object.fromEntries(products.map(p=>[p.id,p]));

    // server-side stock validation
    for(const it of items){
      const p = map[it.id];
      if(!p) return res.status(400).json({ error: 'Invalid product: ' + it.id });
      if(typeof p.stock === 'number' && p.stock < (it.quantity || 1)) return res.status(400).json({ error: Insufficient stock for  });
    }

    const line_items = items.map(it=>{
      const p = map[it.id];
      return {
        price_data: { currency: 'usd', product_data: { name: p.title }, unit_amount: p.price_cents },
        quantity: it.quantity || 1
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email || undefined,
      success_url: process.env.SUCCESS_URL || 'http://localhost:3000/checkout/success',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:3000/checkout/cancel'
    });

    // optional: record order in Firestore (admin)
    try{
      if(admin){
        const db = admin.firestore();
        await db.collection('orders').add({ stripeSessionId: session.id, email: email || null, items, status:'pending', createdAt: admin.firestore.FieldValue.serverTimestamp() });
      }
    } catch(e){ console.warn('Could not write order to Firestore', e.message || e); }

    return res.status(200).json({ url: session.url, id: session.id });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message || 'server error' });
  }
}