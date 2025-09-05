import Layout from '../components/Layout';
import Link from 'next/link';
export default function Custom404(){
  return (
    <Layout>
      <div style={{textAlign:'center',padding:'80px 20px'}}>
        <h1 style={{fontSize:48,color:'var(--purple)'}}>404</h1>
        <h2>Oops! This page doesn't exist.</h2>
        <p>The page you are looking for may have been moved or removed.</p>
        <div style={{marginTop:20,display:'flex',gap:12,justifyContent:'center'}}>
          <Link href='/'><a className='btn'>Go Back to Home</a></Link>
          <Link href='/shop'><a className='btn outline'>Back to Shop</a></Link>
        </div>
      </div>
    </Layout>
  );
}