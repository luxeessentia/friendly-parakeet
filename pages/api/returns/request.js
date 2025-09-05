// /api/returns/request
import fs from 'fs';
import path from 'path';
import { initFirebaseAdmin } from '../../lib/firebaseAdmin';

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });
  const body = req.body;
  const admin = initFirebaseAdmin();
  if(admin){
    const db = admin.firestore();
    const doc = await db.collection('returns').add({ ...body, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    return res.status(200).json({ ok:true, id: doc.id });
  }
  const file = path.join(process.cwd(),'public','data','returns.json');
  let arr = [];
  if(fs.existsSync(file)) arr = JSON.parse(fs.readFileSync(file,'utf8'));
  arr.push({ id:'RR-'+Date.now(), ...body, status:'Pending' });
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
  return res.status(200).json({ ok:true });
}