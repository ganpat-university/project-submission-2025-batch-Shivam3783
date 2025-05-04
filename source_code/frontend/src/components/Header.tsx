
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LineChart, BarChart3, Bell, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
      scrolled ? "bg-card/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
            <LineChart className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="text-xl font-display font-semibold tracking-tight">StockAI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#predictions" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Predictions
          </a>
          <a href="#charts" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Charts
          </a>
          <a href="#notifications" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Alerts
          </a>
        </nav>

        {/* <div className="flex items-center space-x-4">
          <Link to="/sign-in">
            <Button variant="ghost" className="text-sm font-medium">
              Sign In
            </Button>
          </Link>
          <Link to="/sign-in">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 text-sm font-medium">
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div> */}

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 text-sm font-medium"
            onClick={() => navigate('/sign-up')}
          >
            Get Started <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
