import Link from 'next/link';
export default function ProductCard({ product, onAdd }){
  const inStock = typeof product.stock === 'number' ? product.stock > 0 : true;
  return (
    <div className='card'>
      <Link href={'/product/' + product.id}><a>
        <img className='thumb' src={product.images[0]} alt={product.title} />
        <div className='info'><div style={{fontWeight:700}}>{product.title}</div><div className='price'></div></div>
      </a></Link>
      {!inStock && <div className='sold-badge'>SOLD OUT</div>}
      <button className='cart-fab' onClick={(e)=>{e.preventDefault(); e.stopPropagation(); if(!inStock) return; onAdd && onAdd(product); }} aria-label='Add to cart'>
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><circle cx='9' cy='20' r='1'></circle><circle cx='18' cy='20' r='1'></circle><path d='M2 2h3l3.6 7.59a2 2 0 0 0 1.7 1.16h7.72a2 2 0 0 0 1.93-1.5L23 6H6'></path></svg>
      </button>
    </div>
  );
}