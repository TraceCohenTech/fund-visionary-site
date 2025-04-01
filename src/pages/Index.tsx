
import Hero from "../components/Hero";
import Focus from "../components/Focus";
import Stats from "../components/Stats";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Hero />
      <div id="focus">
        <Focus />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
