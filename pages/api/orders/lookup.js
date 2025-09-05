// /api/orders/lookup
import { initFirebaseAdmin } from '../../../lib/firebaseAdmin';
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const { id, email } = req.body || {};
  if(!id || !email) return res.status(400).json({ error:'Missing' });
  const admin = initFirebaseAdmin();
  if(!admin) return res.status(501).json({ error:'Admin not configured' });
  const db = admin.firestore();
  const doc = await db.collection('orders').doc(id).get();
  if(!doc.exists) return res.status(404).json({ error:'not found' });
  const data = doc.data();
  if(data.email !== email) return res.status(403).json({ error:'forbidden' });
  return res.status(200).json({ id: doc.id, ...data });
}