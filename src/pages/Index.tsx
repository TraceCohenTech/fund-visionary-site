
import Hero from "../components/Hero";
import Focus from "../components/Focus";
import Stats from "../components/Stats";
import News from "../components/News";
import Contact from "../components/Contact";
import ThreeBackground from "../components/ThreeBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <ThreeBackground />
      <Hero />
      <div id="focus">
        <Focus />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="news">
        <News />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
