// server: /api/products
import fs from 'fs';
import path from 'path';
import { initFirebaseAdmin } from '../../lib/firebaseAdmin';

export default async function handler(req,res){
  const { category, pid } = req.query || {};
  const admin = initFirebaseAdmin();
  if(admin){
    try{
      const db = admin.firestore();
      if(pid){
        const snap = await db.collection('products').where('id','==', pid).get();
        return res.status(200).json(snap.docs.map(d=>d.data()));
      }
      let q = db.collection('products');
      if(category) q = q.where('category','==', category);
      const snap = await q.get();
      return res.status(200).json(snap.docs.map(d=>d.data()));
    } catch(e){
      console.warn('Firestore admin read failed', e.message || e);
    }
  }
  const file = path.join(process.cwd(),'public','data','products.json');
  const raw = fs.readFileSync(file,'utf8');
  let arr = JSON.parse(raw);
  if(category) arr = arr.filter(p=>p.category===category);
  if(pid) arr = arr.filter(p=>p.id===pid);
  res.status(200).json(arr);
}