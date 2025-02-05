import Hero from "../components/Hero";
import Focus from "../components/Focus";
import Stats from "../components/Stats";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Hero />
      <Focus />
      <Stats />
      <Contact />
    </div>
  );
};

export default Index;