import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-secondary py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Build Something Great?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          We're always looking for ambitious founders pushing the boundaries of what's possible.
        </p>
        <a
          href="mailto:pitch@vcfund.com"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg transition-colors"
        >
          <Mail className="w-4 h-4" />
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default Contact;