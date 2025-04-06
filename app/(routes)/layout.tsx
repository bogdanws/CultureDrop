import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar navbarTitleOpacity={1}/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
} 