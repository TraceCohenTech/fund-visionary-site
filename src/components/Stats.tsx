const Stats = () => {
  const stats = [
    { number: "$100M+", label: "Assets Under Management" },
    { number: "50+", label: "Portfolio Companies" },
    { number: "12", label: "Unicorn Exits" },
  ];

  return (
    <div className="bg-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;