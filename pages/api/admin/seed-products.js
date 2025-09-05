// /api/admin/seed-products
import fs from 'fs';
import path from 'path';
import { initFirebaseAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const admin = initFirebaseAdmin();
  if(!admin) return res.status(501).json({ error:'Admin not configured' });
  const db = admin.firestore();
  const file = path.join(process.cwd(),'public','data','products.json');
  const arr = JSON.parse(fs.readFileSync(file,'utf8'));
  const batch = db.batch();
  arr.forEach(p=>{
    const ref = db.collection('products').doc(p.id);
    batch.set(ref, p);
  });
  await batch.commit();
  return res.status(200).json({ ok:true, count: arr.length });
}