import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

export default function Home(){
  const [products,setProducts] = useState([]);
  const [reviews,setReviews] = useState([]);

  useEffect(()=> {
    fetch('/api/products').then(r=>r.json()).then(d=>setProducts(d));
    fetch('/data/reviews.json').then(r=>r.json()).then(d=> setReviews(d.filter(x=>x.approved)));
  },[]);

  function addToCart(p){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const ex = cart.find(i=>i.id===p.id);
    if(ex) ex.quantity++; else cart.push({ id:p.id, title:p.title, price_cents:p.price_cents, image:p.images[0], quantity:1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  }

  const featured = (cat) => products.filter(p=>p.category===cat).slice(0,4);

  return (
    <Layout>
      <section style={{marginBottom:18}}>
        <div className='hero'><img src='/img/hero-1.jpg' alt='hero' /></div>
      </section>

      <section>
        <h2 className='section-title'>Handmade Bags</h2>
        <div className='products-grid'>{featured('Handmade Bags').map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div>
      </section>

      <section style={{marginTop:18}}>
        <h2 className='section-title'>Tech Accessories</h2>
        <div className='products-grid'>{featured('Tech Accessories').map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div>
      </section>

      <section style={{marginTop:18}}>
        <h2 className='section-title'>Custom Collection</h2>
        <div className='products-grid'>{featured('Custom Collection').map(p=> <ProductCard key={p.id} product={p} onAdd={addToCart} />)}</div>
      </section>

      <section style={{marginTop:18}}>
        <h2 className='section-title'>Customer Reviews</h2>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {reviews.slice(0,6).map((r,i)=>(
            <div key={i} style={{padding:12,border:'1px solid #eee',borderRadius:8}}>
              <div style={{fontWeight:800}}>{r.name} <span style={{color:'var(--gold)'}}>{'★'.repeat(r.rating)}</span></div>
              <div style={{marginTop:8}}>{r.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop:18}}>
        <h2 className='section-title'>Newsletter</h2>
        <div style={{maxWidth:720}}>
          <form onSubmit={(e)=>{ e.preventDefault(); alert('Thanks — subscribed!'); e.target.reset(); }} className='newsletter'>
            <input type='email' placeholder='Your email' required style={{flex:1,padding:12,borderRadius:8,border:'1px solid #ddd'}} />
            <button className='btn' type='submit'>Subscribe</button>
          </form>
        </div>
      </section>

      <section style={{marginTop:28}}>
        <h3 className='section-title' style={{color:'var(--purple)'}}>Quick Links</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          <div>
            <a href='/about'>About Us</a><br/>
            <a href='/orders/track'>Orders & Returns</a><br/>
            <a href='/contact'>Contact</a><br/>
            <a href='/faq'>FAQ</a><br/>
            <a href='/privacy'>Privacy Policy</a>
          </div>
          <div>
            <a href='/shop'>Shop</a><br/>
            <a href='/shop/bags'>Handmade Bags</a><br/>
            <a href='/shop/tech'>Tech Accessories</a><br/>
            <a href='/shop/custom'>Custom Collection</a><br/>
            <a href='/login'>Login/Register</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}