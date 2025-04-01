
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary">
      {/* Header-like navigation */}
      <div className="w-full absolute top-0 px-6 py-6 flex justify-between items-center z-20">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/16d347ae-026e-4e4d-8545-bf9622076335.png" 
            alt="Six Point Ventures Logo" 
            className="h-12 mr-3" 
          />
          <span className="text-white text-2xl font-bold">
            Six Point <span className="text-primary">Ventures</span>
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm text-white/80">
          <a href="#focus" className="hover:text-white transition-colors">FOCUS</a>
          <a href="#stats" className="hover:text-white transition-colors">TRACK RECORD</a>
          <a href="#news" className="hover:text-white transition-colors">UPDATES</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 mt-20 md:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-primary mb-2 animate-fade-in">VENTURE CAPITAL FOR THE AI ERA</p>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
            Backing Exceptional <br/>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vertical AI</span> Founders
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Investing in the next generation of AI-first companies transforming industries across the US and Israel
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md flex items-center gap-2 font-medium w-full md:w-auto"
            >
              Get Funding <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#focus" className="text-white hover:text-primary transition-colors font-medium flex items-center gap-1 w-full md:w-auto justify-center">
              Our Investment Thesis <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
