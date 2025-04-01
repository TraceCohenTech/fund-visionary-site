
const Stats = () => {
  const stats = [
    { number: "100+", label: "Portfolio Companies" },
    { number: "$1B+", label: "Follow-on Funding" },
    { number: "10+", label: "Successful Exits" },
    { number: "1", label: "IPO" },
  ];

  return (
    <div className="bg-highlight py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4 text-center">
          Our <span className="text-primary">Track Record</span>
        </h2>
        <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-center mb-16">
          Since our founding, Six Point Ventures has established a strong track record 
          of identifying and supporting exceptional founders building vertical AI solutions.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in bg-secondary/10 backdrop-blur-sm border border-primary/20 p-6 rounded-lg shadow-sm"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-secondary-foreground/90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-secondary-foreground mb-6">Led by 3 General Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((partner) => (
              <div 
                key={partner}
                className="bg-secondary/20 backdrop-blur-sm border border-primary/10 p-6 rounded-lg shadow-sm"
              >
                <div className="w-24 h-24 bg-secondary/60 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary">
                    GP
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-secondary-foreground mb-1">
                  General Partner {partner}
                </h4>
                <p className="text-secondary-foreground/70 text-sm">
                  20+ years experience in tech investments and scaling AI companies
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
