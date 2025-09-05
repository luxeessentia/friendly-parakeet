import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useEffect, useState } from 'react';

export default function ShopAll(){
  const [products,setProducts]=useState([]);
  useEffect(()=> fetch('/api/products').then(r=>r.json()).then(d=>setProducts(d)),[]);
  function addToCart(p){ const cart=JSON.parse(localStorage.getItem('cart')||'[]'); const ex=cart.find(i=>i.id===p.id); if(ex) ex.quantity++; else cart.push({id:p.id,title:p.title,price_cents:p.price_cents,image:p.images[0],quantity:1}); localStorage.setItem('cart',JSON.stringify(cart)); window.dispatchEvent(new Event('storage')); }
  return (<Layout><h1>Shop All</h1><div className='products-grid'>{products.map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div></Layout>);
}