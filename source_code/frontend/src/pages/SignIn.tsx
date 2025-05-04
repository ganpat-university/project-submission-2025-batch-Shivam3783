
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "You have successfully signed in",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="md:w-1/2 flex flex-col p-8 md:p-12 justify-center">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
              <LineChart className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-display font-semibold tracking-tight">StockAI</span>
          </Link>
          
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Welcome back</h1>
              <p className="text-foreground/70">Enter your credentials to access your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="name@example.com" 
                  className="rounded-lg bg-white/5 border border-white/10 focus-visible:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-primary hover:text-primary/90">Forgot password?</a>
                </div>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  className="rounded-lg bg-white/5 border border-white/10 focus-visible:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-foreground/70">
                  Don't have an account? <a href="#" className="text-primary hover:text-primary/90">Sign up</a>
                </p>
              </div>
            </form>
            
            <div className="mt-8">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-background text-sm text-foreground/50">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-lg border-white/10 bg-white/5 hover:bg-white/10">
                  Google
                </Button>
                <Button variant="outline" className="rounded-lg border-white/10 bg-white/5 hover:bg-white/10">
                  Apple
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Image and features */}
        <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-primary/5 to-secondary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/10%)_0%,transparent_60%)]"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
            <div className="glass-card p-6 rounded-xl max-w-md w-full mb-8 backdrop-blur-md border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Why join StockAI?</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 size-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">93% accurate AI stock predictions for global markets</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mt-1 mr-3 size-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">30-day forecasting to help plan your investment strategy</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mt-1 mr-3 size-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">Personalized alerts for critical price movements</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mt-1 mr-3 size-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">Multiple chart types for comprehensive analysis</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative w-full max-w-md aspect-video glass-card rounded-xl overflow-hidden border border-white/20">
              <img 
                src="https://cdn.pixabay.com/photo/2021/05/05/13/45/stock-chart-6230863_1280.jpg" 
                alt="Trading platform"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/90 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center p-6">
                <div>
                  <div className="text-xl font-bold mb-2">Start Making Smarter Investments Today</div>
                  <p className="text-sm text-foreground/70 mb-4">Join thousands of investors already using our AI-powered platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
