import Link from 'next/link';
export default function Footer(){
  return (
    <>
      <footer className='footer'>
        <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:20}}>
          <div>
            <h3 style={{color:'var(--purple)'}}>Luxe Essentials</h3>
            <p>Minimal luxury — handcrafted & curated essentials.</p>
          </div>
          <div>
            <h4>Newsletter</h4>
            <form onSubmit={(e)=>{ e.preventDefault(); alert('Thanks — subscribed!'); e.target.reset(); }} className='newsletter'>
              <input type='email' placeholder='Email address' required style={{padding:10,borderRadius:8,border:'1px solid #ddd',flex:1}} />
              <button className='btn' type='submit' style={{padding:'10px 14px'}}>Subscribe</button>
            </form>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul style={{listStyle:'none',padding:0}}>
              <li><Link href='/about'><a>About Us</a></Link></li>
              <li><Link href='/orders/track'><a>Orders & Returns</a></Link></li>
              <li><Link href='/contact'><a>Contact</a></Link></li>
              <li><Link href='/faq'><a>FAQ</a></Link></li>
              <li><Link href='/privacy'><a>Privacy Policy</a></Link></li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='footer-note'>📦 FREE STANDARD SHIPPING ON U.S. ORDERS + | FREE EXPRESS SHIPPING ON U.S. ORDERS +</div>
    </>
  );
}