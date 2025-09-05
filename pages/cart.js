import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
export default function Cart(){
  const [cart,setCart] = useState([]);
  useEffect(()=> setCart(JSON.parse(localStorage.getItem('cart')||'[]')),[]);
  function updateQty(i,qty){ const c=[...cart]; c[i].quantity = Math.max(1, qty); setCart(c); localStorage.setItem('cart', JSON.stringify(c)); window.dispatchEvent(new Event('storage')); }
  function remove(i){ const c=[...cart]; c.splice(i,1); setCart(c); localStorage.setItem('cart', JSON.stringify(c)); window.dispatchEvent(new Event('storage')); }
  const subtotal = cart.reduce((s,it)=> s + ((it.price_cents||0)/100)*(it.quantity||1),0).toFixed(2);
  async function checkout(){ if(cart.length===0) return alert('Cart is empty'); const email = window.prompt('Email for receipt (optional)'); const res = await fetch('/api/create-checkout-session', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ items: cart, email }) }); const data = await res.json(); if(data.url){ window.location.href = data.url; } else alert('Checkout error: '+(data.error||'unknown')); }
  return (<Layout><h1>Your Cart</h1>{cart.length===0 ? <p>Your cart is empty</p> : (<>{cart.map((it,idx)=>(<div key={idx} style={{display:'flex',gap:12,alignItems:'center',padding:12,borderBottom:'1px solid #eee'}}><img src={it.image || '/img/placeholder.png'} style={{width:80,height:80,objectFit:'cover'}} /><div style={{flex:1}}><strong>{it.title}</strong><div></div></div><div><input type='number' min='1' value={it.quantity} onChange={(e)=>updateQty(idx, Number(e.target.value))} style={{width:80}} /></div><div><button className='btn' onClick={()=>remove(idx)}>Remove</button></div></div>))}<div style={{marginTop:12}}><strong>Subtotal:</strong> </div><div style={{marginTop:12}}><button className='btn' onClick={checkout}>Checkout</button></div></>)}</Layout>);
}