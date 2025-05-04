
import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Twitter, Linkedin, Github, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
                <LineChart className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-display font-semibold tracking-tight">StockAI</span>
            </Link>
            <p className="text-sm text-foreground/70 mb-4">
              AI-powered stock predictions and market analysis for smarter investing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="size-8 flex items-center justify-center rounded-full bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="size-8 flex items-center justify-center rounded-full bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="size-8 flex items-center justify-center rounded-full bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="size-8 flex items-center justify-center rounded-full bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase text-foreground/50 mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Predictions</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Analytics</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Notifications</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Mobile App</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase text-foreground/50 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Market News</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Investment Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase text-foreground/50 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Press</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-foreground/50 mb-4 md:mb-0">
            © 2024 StockAI. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
