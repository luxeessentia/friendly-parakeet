import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductPage(){
  const router = useRouter();
  const { id } = router.query;
  const [product,setProduct] = useState(null);

  useEffect(()=>{ if(!id) return; fetch('/api/products?pid=' + encodeURIComponent(id)).then(r=>r.json()).then(arr=> setProduct(arr && arr[0] ? arr[0] : null)); },[id]);

  function addToCart(){
    if(!product) return;
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const ex = cart.find(i=>i.id===product.id);
    if(ex) ex.quantity++; else cart.push({ id:product.id, title:product.title, price_cents:product.price_cents, image:product.images[0], quantity:1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Added to cart');
  }

  if(!product) return (<Layout><div style={{padding:20}}>Loading…</div></Layout>);
  const inStock = typeof product.stock === 'number' ? product.stock > 0 : true;

  return (
    <Layout>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        <div>
          <img src={product.images[0]} style={{width:'100%',borderRadius:8}} alt={product.title} />
          <div style={{display:'flex',gap:8,marginTop:8}}>{product.images.slice(1).map((im,i)=>(<img key={i} src={im} style={{width:80,height:80,objectFit:'cover',borderRadius:6}}/>))}</div>
        </div>
        <div>
          <h1>{product.title}</h1>
          <div style={{color:'var(--purple)',fontWeight:800,fontSize:20}}></div>
          <p>{product.description}</p>
          <div style={{marginTop:12}}>
            <label>Color</label><br/>
            <select style={{padding:8,borderRadius:8,border:'1px solid #ddd'}}>{(product.colors||[]).map((c,i)=>(<option key={i}>{c}</option>))}</select>
          </div>
          <div style={{marginTop:12}}>
            <label>Size</label><br/>
            <select style={{padding:8,borderRadius:8,border:'1px solid #ddd'}}>{(product.sizes||[]).length ? (product.sizes||[]).map((s,i)=>(<option key={i}>{s}</option>)) : <option>One size</option>}</select>
          </div>
          <div style={{marginTop:16}}>{inStock ? <button className='btn' onClick={addToCart}>Add to cart</button> : <button className='btn' disabled>Sold out</button>}<button className='btn outline' style={{marginLeft:8}}>Wishlist ♥</button></div>
        </div>
      </div>
      <section style={{marginTop:24}}><h3>Reviews</h3><div id='product-reviews'>Reviews load here later</div></section>
    </Layout>
  );
}