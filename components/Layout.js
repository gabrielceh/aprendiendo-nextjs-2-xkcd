import { Footer } from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto">{children}</main>
      <Footer />
    </>
  );
}
