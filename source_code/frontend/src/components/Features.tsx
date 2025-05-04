
import React, { useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  LineChart, 
  BarChart3, 
  CandlestickChart, 
  Bell, 
  Heart, 
  BookmarkPlus, 
  Clock, 
  Globe, 
  Award 
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const FeatureCard = ({ icon, title, description, className, index = 0 }: FeatureCardProps) => {
  return (
    <div className={`glass-card p-6 rounded-xl animate-card-hover stagger-animation-item ${className}`}
         style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observedElements = document.querySelectorAll('.feature-reveal');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class with higher threshold to ensure visibility
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

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-medium feature-reveal">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 feature-reveal">
            Everything You Need for Smart <span className="text-primary">Investing</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto feature-reveal">
            Our AI-powered platform provides all the tools you need to make informed investment decisions with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            className="feature-reveal"
            index={0}
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            title="Accurate Predictions" 
            description="Get detailed predictions for any stock with up to 93% accuracy, based on advanced machine learning algorithms."
          />
          
          <FeatureCard 
            className="feature-reveal"
            index={1}
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="30-Day Forecasts" 
            description="Look ahead with comprehensive 30-day forecasts that help you plan your investment strategy with confidence."
          />
          
          <FeatureCard 
            className="feature-reveal"
            index={2}
            icon={<CandlestickChart className="h-6 w-6 text-primary" />}
            title="Multiple Chart Types" 
            description="Analyze stocks with various chart types including line, bar, and candlestick for comprehensive market insights."
          />
          
          <FeatureCard 
            className="feature-reveal"
            index={3}
            icon={<Heart className="h-6 w-6 text-primary" />}
            title="Favorite Companies" 
            description="Save your favorite companies for quick access and receive personalized insights based on your preferences."
          />
          
          <FeatureCard 
            className="feature-reveal"
            index={4}
            icon={<Bell className="h-6 w-6 text-primary" />}
            title="Smart Notifications" 
            description="Set up alerts to receive notifications about price changes, trends, and recommended actions for your stocks."
          />
          
          <FeatureCard 
            className="feature-reveal"
            index={5}
            icon={<Globe className="h-6 w-6 text-primary" />}
            title="Global Coverage" 
            description="Access predictions for stocks from markets worldwide, with comprehensive coverage of international exchanges."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
