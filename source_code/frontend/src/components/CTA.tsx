
import React from 'react';
import { Button } from "@/components/ui/button";
import { LineChart, TrendingUp, Bell } from "lucide-react";
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70 pointer-events-none" />
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="glass-card p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-white/10">
          <div className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-medium mb-6 animate-fade-in">
            Start Predicting Today
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in">
            Make Smarter <span className="text-primary">Investment Decisions</span> with AI
          </h2>
          
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in">
            Join thousands of investors who are already using our AI-powered predictions to maximize their returns and minimize risks.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Link to="/sign-in">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium min-w-40">
                Get Started <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-medium min-w-40">
              See Pricing Plans
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">93%</div>
              <div className="text-sm text-foreground/70">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">10,000+</div>
              <div className="text-sm text-foreground/70">Global Stocks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">30</div>
              <div className="text-sm text-foreground/70">Day Forecasts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">24/7</div>
              <div className="text-sm text-foreground/70">Market Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
