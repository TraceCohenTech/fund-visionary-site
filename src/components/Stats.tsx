
const Stats = () => {
  const stats = [
    { number: "100+", label: "Portfolio Companies" },
    { number: "$250M+", label: "Assets Under Management" },
    { number: "15+", label: "Successful Exits" },
  ];

  return (
    <div className="bg-secondary py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          Our <span className="text-primary">Track Record</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in bg-secondary/80 backdrop-blur-sm border border-primary/20 p-8 rounded-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
