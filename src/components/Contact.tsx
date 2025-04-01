
import { Mail, Send, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-secondary py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-black/50"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Ready to <span className="text-primary">Transform</span> Your Industry?
          </h2>
          <p className="text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            We partner with ambitious founders building AI-first solutions across healthcare, finance, enterprise, and defense sectors.
          </p>
          
          <div className="bg-secondary/60 backdrop-blur-sm border border-primary/20 rounded-lg p-8 md:p-10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/30 border border-primary/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-black/30 border border-primary/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input 
                  type="text" 
                  className="w-full bg-black/30 border border-primary/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tell us about your startup</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black/30 border border-primary/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-md flex items-center justify-center gap-2 font-medium transition-colors"
              >
                Submit Pitch <Send className="w-4 h-4" />
              </button>
            </form>
            
            <div className="mt-10 pt-8 border-t border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 mb-4 md:mb-0">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:pitch@ventureai.fund" className="hover:text-white transition-colors">pitch@ventureai.fund</a>
                </div>
                
                <div className="flex items-center gap-4">
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
