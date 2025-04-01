
import Hero from "../components/Hero";
import Focus from "../components/Focus";
import Stats from "../components/Stats";
import News from "../components/News";
import Contact from "../components/Contact";
import ThreeBackground from "../components/ThreeBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-highlight">
      <ThreeBackground />
      <Hero />
      <div id="focus" className="bg-highlight">
        <Focus />
      </div>
      <div id="stats" className="bg-highlight">
        <Stats />
      </div>
      <div id="news" className="bg-highlight">
        <News />
      </div>
      <div id="contact" className="bg-highlight">
        <Contact />
      </div>
    </div>
  );
};

export default Index;
