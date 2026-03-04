import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
