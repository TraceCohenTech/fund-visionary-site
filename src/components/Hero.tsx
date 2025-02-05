import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-primary">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(131,58,180,0.1)_0%,rgba(253,29,29,0.1)_50%,rgba(252,176,69,0.1)_100%)]"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Funding the Future of
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"> Technology</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            We invest in ambitious founders building the next generation of groundbreaking companies
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Pitch Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;