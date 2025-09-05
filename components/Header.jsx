'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
export default function Header(){
  const [open,setOpen] = useState(false);
  const [cartCount,setCartCount] = useState(0);
  useEffect(()=>{ const sync=()=>{ try{ const c=JSON.parse(localStorage.getItem('cart')||'[]'); setCartCount(c.reduce((s,i)=>s+(i.quantity||1),0)); }catch(e){ setCartCount(0)} }; sync(); window.addEventListener('storage',sync); return ()=>window.removeEventListener('storage',sync); },[]);
  return (
    <>
      <div className='header-wrap'>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button className='hamburger' aria-label='open menu' onClick={()=>setOpen(true)}>☰</button>
          <div className='logo'>Luxe Essentials</div>
          <div className='nav-links' role='navigation' aria-label='main nav'>
            <Link href='/'><a className='nav-link'>Home</a></Link>
            <Link href='/shop'><a className='nav-link'>Shop All</a></Link>
            <Link href='/shop/bags'><a className='nav-link'>Handmade Bags</a></Link>
            <Link href='/shop/tech'><a className='nav-link'>Tech Accessories</a></Link>
            <Link href='/shop/custom'><a className='nav-link'>Custom Collection</a></Link>
            <Link href='/shop/clothing'><a className='nav-link'>Clothing</a></Link>
            <Link href='/shop/footwear'><a className='nav-link'>Footwear</a></Link>
            <Link href='/shop/beauty'><a className='nav-link'>Beauty/Makeup</a></Link>
            <Link href='/shop/jewelry'><a className='nav-link'>Jewelry</a></Link>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center'}}>
          <button className='icon-btn' aria-label='search'>🔍</button>
          <Link href='/reviews'><a className='icon-btn' aria-label='wishlist'>♥</a></Link>
          <Link href='/cart'><a className='icon-btn' aria-label='cart'>🛒 <span style={{background:'var(--gold)',color:'#000',padding:'2px 8px',borderRadius:999,fontWeight:800}}>{cartCount}</span></a></Link>
          <Link href='/login'><a className='icon-btn' aria-label='account'>👤</a></Link>
        </div>
      </div>

      {open && (
        <div style={{position:'fixed',left:0,top:0,width:320,height:'100vh',background:'#fff',zIndex:20000,padding:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>Menu</strong><button onClick={()=>setOpen(false)}>✕</button></div>
          <nav style={{marginTop:16}}>
            <Link href='/'><a onClick={()=>setOpen(false)}>Home</a></Link><br/>
            <strong>Shop</strong><br/>
            <Link href='/shop/bags'><a onClick={()=>setOpen(false)}>Handmade Bags</a></Link><br/>
            <Link href='/shop/tech'><a onClick={()=>setOpen(false)}>Tech Accessories</a></Link><br/>
            <Link href='/shop/custom'><a onClick={()=>setOpen(false)}>Custom Collection</a></Link><br/>
            <Link href='/shop/clothing'><a onClick={()=>setOpen(false)}>Clothing</a></Link><br/>
            <Link href='/shop/footwear'><a onClick={()=>setOpen(false)}>Footwear</a></Link><br/>
            <Link href='/shop/beauty'><a onClick={()=>setOpen(false)}>Beauty/Makeup</a></Link><br/>
            <Link href='/shop/jewelry'><a onClick={()=>setOpen(false)}>Jewelry & Accessories</a></Link><br/>
            <hr/>
            <Link href='/orders/track'><a onClick={()=>setOpen(false)}>Orders & Returns</a></Link><br/>
            <Link href='/login'><a onClick={()=>setOpen(false)}>Login / Register</a></Link><br/>
            <Link href='/contact'><a onClick={()=>setOpen(false)}>Contact</a></Link><br/>
            <Link href='/faq'><a onClick={()=>setOpen(false)}>FAQ</a></Link>
          </nav>
        </div>
      )}
    </>
  );
}