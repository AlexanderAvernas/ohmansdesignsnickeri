import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TextSection from "./components/TextSection";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TextSection />
      <About />
      <Gallery />
      <Footer />
    </main>
  );
}