
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import StockPreview from '@/components/StockPreview';
import ChartTypes from '@/components/ChartTypes';
import NotificationDemo from '@/components/NotificationDemo';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Load framer-motion
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/framer-motion@10.12.5/dist/framer-motion.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <StockPreview />
        <ChartTypes />
        <NotificationDemo />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
