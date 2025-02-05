import { Brain, Cpu, Globe } from "lucide-react";

const Focus = () => {
  const areas = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Artificial Intelligence",
      description: "Machine learning, deep tech, and cognitive computing solutions",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web3 & Blockchain",
      description: "Decentralized technologies shaping the future of finance and computing",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Enterprise Software",
      description: "Next-generation tools empowering businesses worldwide",
    },
  ];

  return (
    <div className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Investment Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <div
              key={area.title}
              className="bg-secondary/50 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-primary mb-4">{area.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{area.title}</h3>
              <p className="text-gray-400">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Focus;