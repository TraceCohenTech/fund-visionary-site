
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  date: string;
  link: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Six Point Ventures Leads $12M Series A in AI Manufacturing Startup",
    excerpt: "Our newest portfolio company is revolutionizing industrial processes with vertical AI solutions.",
    image: "/placeholder.svg",
    category: "Investment",
    date: "October 2023",
    link: "#"
  },
  {
    id: 2,
    title: "Portfolio Spotlight: How Vertical AI is Transforming Healthcare",
    excerpt: "Deep dive into how our portfolio companies are changing patient outcomes with specialized AI.",
    category: "Research",
    date: "September 2023",
    link: "#"
  },
  {
    id: 3,
    title: "Six Point Ventures Annual AI Summit 2023",
    excerpt: "Join us for our flagship event bringing together the brightest minds in vertical AI applications.",
    image: "/placeholder.svg",
    category: "Event",
    date: "November 2023",
    link: "#"
  },
  {
    id: 4,
    title: "Our Investment Thesis: Why We're Betting Big on Vertical AI",
    excerpt: "The future belongs to specialized AI solutions that transform specific industries.",
    category: "Strategy",
    date: "August 2023",
    link: "#"
  },
  {
    id: 5,
    title: "Portfolio Exit: AI Logistics Platform Acquired for $80M",
    excerpt: "Celebrating another successful exit with a 5x return for our early investors.",
    image: "/placeholder.svg",
    category: "Exit",
    date: "July 2023",
    link: "#"
  },
  {
    id: 6,
    title: "AI and the Supply Chain: New Investment Opportunities",
    excerpt: "How we're identifying the next wave of vertical AI applications in global logistics.",
    category: "Research",
    date: "June 2023",
    link: "#"
  }
];

const News = () => {
  return (
    <div className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest <span className="text-primary">Updates</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            News, insights and perspectives from Six Point Ventures and our portfolio companies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card 
              key={item.id}
              className={`bg-secondary/60 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all overflow-hidden flex flex-col animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.image && (
                <div className="h-48 bg-secondary/80 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 mb-4 flex-grow">
                  {item.excerpt}
                </p>
                
                <a 
                  href={item.link} 
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mt-auto font-medium text-sm"
                >
                  Read more <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
