// /api/admin/approve-review
import fs from 'fs';
import path from 'path';
import { initFirebaseAdmin } from '../../../lib/firebaseAdmin';

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const body = req.body;
  if(!body || !body.id) return res.status(400).json({ error:'Invalid' });
  const admin = initFirebaseAdmin();
  if(admin){
    const db = admin.firestore();
    const q = await db.collection('reviews').where('id','==', body.id).get();
    if(!q.empty){ q.docs[0].ref.update({ approved:true }); return res.status(200).json({ ok:true }); }
  }
  const file = path.join(process.cwd(),'public','data','reviews.json');
  const arr = JSON.parse(fs.readFileSync(file,'utf8'));
  const i = arr.findIndex(x=>x.id === body.id);
  if(i===-1) return res.status(404).json({ error:'not found' });
  arr[i].approved = true;
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
  return res.status(200).json({ ok:true });
}