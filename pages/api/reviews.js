// /api/reviews
import fs from 'fs';
import path from 'path';
const file = path.join(process.cwd(),'public','data','reviews.json');

export default function handler(req,res){
  if(req.method === 'GET'){
    const arr = JSON.parse(fs.readFileSync(file,'utf8'));
    return res.status(200).json(arr.filter(r=>r.approved));
  }
  if(req.method === 'POST'){
    const body = req.body;
    if(!body || !body.name || !body.text) return res.status(400).json({ error:'Invalid' });
    const arr = JSON.parse(fs.readFileSync(file,'utf8'));
    arr.push({ id:'rev-'+Date.now(), name: body.name, rating: body.rating||5, text: body.text, approved:false });
    fs.writeFileSync(file, JSON.stringify(arr, null, 2));
    return res.status(201).json({ ok:true });
  }
  res.status(405).end();
}