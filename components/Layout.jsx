import TopPromoBar from './TopPromoBar';
import Header from './Header';
import Footer from './Footer';
import '../styles/globals.css';
export default function Layout({ children }){
  return (
    <>
      <TopPromoBar />
      <Header />
      <main className='main-content'>{children}</main>
      <Footer />
    </>
  );
}