import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Account(){
  const [user,setUser]=useState(null); const [orders,setOrders]=useState([]);
  useEffect(()=> { const unsub = onAuthStateChanged(auth, async (u)=>{ setUser(u); if(u){ try{ const q = query(collection(db,'orders'), where('email','==', u.email)); const snap = await getDocs(q); setOrders(snap.docs.map(d=>({ id:d.id, ...d.data() }))); } catch(e){ console.warn('Firestore not available', e.message || e); } } }); return ()=> unsub(); },[]);
  if(!user) return (<Layout><h1>My Account</h1><p>Please <a href='/login'>login</a> to view your account.</p></Layout>);
  return (<Layout><h1>Welcome, {user.email}</h1><button className='btn' onClick={()=>signOut(auth)}>Logout</button><section style={{marginTop:20}}><h2>Orders</h2>{orders.length===0 ? <p>No orders yet.</p> : <ul>{orders.map(o=>(<li key={o.id}>Order #{o.id} — {o.status||'Pending'} — </li>))}</ul>}</section></Layout>);
}