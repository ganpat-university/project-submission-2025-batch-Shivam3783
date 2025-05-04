
import React, { useEffect, useRef } from 'react';
import { LineChart, ArrowRight, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockCardProps {
  symbol: string;
  name: string;
  currentPrice: string;
  prediction: string;
  change: string;
  isPositive: boolean;
  graphData: number[];
  className?: string;
  index?: number;
}

const StockCard = ({ 
  symbol, 
  name, 
  currentPrice, 
  prediction, 
  change, 
  isPositive, 
  graphData,
  className,
  index = 0
}: StockCardProps) => {
  const points = graphData.map((value, index) => 
    `${index * (100 / (graphData.length - 1))},${100 - value}`
  ).join(' ');

  return (
    <div 
      className={`glass-card p-5 rounded-xl relative overflow-hidden animate-card-hover stagger-animation-item ${className}`}
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-sm text-foreground/70">{name}</div>
          <div className="text-xl font-semibold">{symbol}</div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 transition-all duration-300">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-16 mb-4 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{
              animation: `drawLine 1.5s ${0.3 + index * 0.1}s forwards cubic-bezier(0.34, 1.56, 0.64, 1)`
            }}
          />
          <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity="0.2" />
            <stop offset="100%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity="0" />
          </linearGradient>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill={`url(#gradient-${symbol})`}
            style={{
              opacity: 0,
              animation: `fadeIn 0.8s ${0.8 + index * 0.1}s forwards ease-out`
            }}
          />
        </svg>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm text-foreground/70">Current</div>
          <div className="text-lg font-medium">{currentPrice}</div>
        </div>
        <div>
          <div className="text-sm text-foreground/70">Prediction</div>
          <div className={`text-lg font-medium flex items-center ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {prediction}
            {isPositive ? 
              <TrendingUp className="ml-1 h-4 w-4" /> : 
              <TrendingDown className="ml-1 h-4 w-4" />
            }
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-foreground/70">Change</div>
          <div className={`text-lg font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {change}
          </div>
        </div>
      </div>
    </div>
  );
};

const StockPreview = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observedElements = document.querySelectorAll('.stock-reveal');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before elements come into view
    });
    
    observedElements.forEach(el => {
      el.classList.add('opacity-0');
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        observedElements.forEach(el => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  const stocksData = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      currentPrice: "$178.72",
      prediction: "$189.44",
      change: "+5.99%",
      isPositive: true,
      graphData: [50, 52, 50, 54, 52, 60, 65, 70, 65, 72]
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      currentPrice: "$173.80",
      prediction: "$192.56",
      change: "+10.79%",
      isPositive: true,
      graphData: [50, 55, 58, 56, 54, 59, 65, 60, 70, 75]
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      currentPrice: "$417.88",
      prediction: "$432.50",
      change: "+3.50%",
      isPositive: true,
      graphData: [50, 52, 54, 58, 56, 60, 62, 64, 62, 68]
    },
    {
      symbol: "AMZN",
      name: "Amazon.com, Inc.",
      currentPrice: "$178.75",
      prediction: "$189.20",
      change: "+5.85%",
      isPositive: true,
      graphData: [50, 48, 52, 55, 53, 58, 62, 65, 63, 67]
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      currentPrice: "$877.55",
      prediction: "$950.13",
      change: "+8.27%",
      isPositive: true,
      graphData: [50, 54, 58, 64, 60, 65, 70, 75, 80, 85]
    },
    {
      symbol: "META",
      name: "Meta Platforms, Inc.",
      currentPrice: "$474.99",
      prediction: "$456.20",
      change: "-3.96%",
      isPositive: false,
      graphData: [50, 52, 48, 50, 46, 48, 44, 42, 40, 38]
    },
  ];

  return (
    <section id="predictions" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-medium stock-reveal">
            AI-Powered Predictions
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 stock-reveal">
            Tomorrow's <span className="text-primary">Market Movements</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto stock-reveal">
            Our AI analyzes global market data to accurately predict stock performance up to 30 days in advance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stocksData.map((stock, index) => (
            <StockCard
              key={stock.symbol}
              className={`stock-reveal`}
              index={index}
              {...stock}
            />
          ))}
        </div>
        
        <div className="text-center stock-reveal">
          <Button className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,209,197,0.3)]">
            View All Stocks <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StockPreview;
