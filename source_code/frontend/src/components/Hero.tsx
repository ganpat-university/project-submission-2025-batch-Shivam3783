
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { LineChart, TrendingUp, BarChart3, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Animation for elements scrolling into view
    const observedElements = document.querySelectorAll('.reveal-on-scroll');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
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
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-30 pointer-events-none" />
      
      {/* Floating elements with improved animation */}
      <div className="absolute top-1/4 right-[5%] h-16 w-16 rounded-full bg-primary/10 animate-float delay-300" />
      <div className="absolute bottom-1/4 left-[5%] h-24 w-24 rounded-full bg-primary/20 animate-float delay-150" />
      <div className="absolute top-1/2 right-[15%] h-32 w-32 rounded-full bg-primary/5 animate-float" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-medium reveal-on-scroll"
               style={{ animationDelay: "0.1s" }}>
            <span className="flex h-2 w-2 rounded-full bg-success mr-2"></span>
            Predicting Tomorrow's Markets Today
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight reveal-on-scroll"
              style={{ animationDelay: "0.2s" }}>
            <span className="text-foreground">AI-Powered Stock</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Predictions</span>
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-lg reveal-on-scroll"
             style={{ animationDelay: "0.3s" }}>
            Harness the power of advanced AI to predict stock trends with unprecedented accuracy. Get a 30-day forecast for any stock worldwide.
          </p>
          
          <div className="flex flex-wrap gap-4 reveal-on-scroll"
               style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,209,197,0.5)]">
              Start Predicting <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-medium transition-all duration-300">
              See How It Works
            </Button>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-foreground/70 reveal-on-scroll"
               style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-success" />
              93% Accuracy
            </div>
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-primary" />
              Global Markets
            </div>
            <div className="flex items-center">
              <Heart className="mr-2 h-4 w-4 text-destructive" />
              Save Favorites
            </div>
          </div>
        </div>
        
        <div className="reveal-on-scroll" style={{ animationDelay: "0.3s" }}>
          <div className="relative aspect-[4/3] MacbookMockup">
            <div className="absolute inset-0 rounded-t-[var(--body-radius)] bg-[var(--bezel-color)] pt-[var(--screen-bezel-width)] pb-[calc(var(--body-height)-var(--screen-bezel-width))]">
              <div className="relative h-full rounded-t-sm overflow-hidden bg-[var(--screen-color)] animate-pulse-glow shadow-lg">
                {/* Screen Content */}
                <div className="absolute inset-0 opacity-90">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1170"
                    alt="Stock dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
                
                {/* Stock graph overlay with improved animations */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-morph p-4 rounded-xl shadow-lg w-3/4 animate-zoom-in" style={{ animationDelay: "0.8s" }}>
                    <div className="flex justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold">AAPL</div>
                        <div className="text-xs text-success flex items-center">+2.4% <TrendingUp className="h-3 w-3 ml-1" /></div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">$178.72</div>
                        <div className="text-xs text-foreground/70">May 2024</div>
                      </div>
                    </div>
                    <div className="h-20 w-full">
                      <svg viewBox="0 0 100 20" className="w-full h-full">
                        <path
                          d="M0,10 Q10,9 20,15 T40,12 T60,8 T80,10 T100,5"
                          fill="none" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="0.5"
                          strokeDasharray="100"
                          strokeDashoffset="100"
                          style={{
                            animation: "drawLine 1.5s 1s forwards cubic-bezier(0.34, 1.56, 0.64, 1)"
                          }}
                        />
                        <path
                          d="M0,10 Q10,9 20,15 T40,12 T60,8 T80,10 T100,5 V20 H0 Z"
                          fill="url(#gradient)" 
                          opacity="0"
                          style={{
                            animation: "fadeIn 0.8s 1.5s forwards ease-out"
                          }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[var(--body-height)] bg-[var(--bezel-color)] rounded-b-[var(--body-radius)]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[var(--keyboard-height)] bg-[var(--keyboard-color)] rounded-t-[var(--keyboard-radius)]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
