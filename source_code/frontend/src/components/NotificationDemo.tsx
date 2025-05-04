import React, { useEffect, useRef, useState } from 'react';
import { Bell, ArrowUp, ArrowDown, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";

const NotificationDemo = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [symbol, setSymbol] = useState("AAPL");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  const showToast = () => {
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to send you notifications",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Notification Set!",
      description: `You'll be notified about ${symbol} price movements`,
    });
  };
  
  useEffect(() => {
    const observedElements = document.querySelectorAll('.notification-reveal');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Special animation for the phone mockup
          if (entry.target === phoneRef.current) {
            setTimeout(() => {
              showNotification();
            }, 1000);
          }
        } else {
          // Remove animation when element is out of view
          entry.target.classList.remove('animate-fade-in');
          entry.target.classList.add('opacity-0');
        }
      });
    }, { threshold: 0.1 });
    
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
  
  const showNotification = () => {
    const notificationEl = document.getElementById('phone-notification');
    if (notificationEl) {
      notificationEl.classList.add('animate-slide-in-right');
      notificationEl.classList.remove('translate-x-full', 'opacity-0');
      
      setTimeout(() => {
        notificationEl.classList.remove('animate-slide-in-right');
        notificationEl.classList.add('animate-fade-in', 'opacity-100');
      }, 600);
    }
  };

  return (
    <section id="notifications" className="py-20 px-6 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-medium notification-reveal">
                Smart Notifications
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold notification-reveal">
                Get <span className="text-primary">Alerts</span> for Critical Price Movements
              </h2>
              
              <p className="text-foreground/70 notification-reveal">
                Never miss an investment opportunity again. Set up personalized notifications for your favorite stocks and receive timely alerts about price changes, trends, and AI-recommended actions.
              </p>
              
              <div className="space-y-4 notification-reveal">
                <div className="flex items-center space-x-4">
                  <Input 
                    type="email" 
                    placeholder="Your email" 
                    className="rounded-lg bg-white/5 border border-white/10 focus-visible:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    type="text" 
                    placeholder="Stock symbol" 
                    className="rounded-lg bg-white/5 border border-white/10 focus-visible:ring-primary max-w-[120px]"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  />
                </div>
                
                <Button 
                  className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={showToast}
                >
                  <Bell className="mr-2 h-4 w-4" /> Notify Me
                </Button>
              </div>
              
              <div className="space-y-3 notification-reveal">
                <div className="flex items-start">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Daily price predictions and analysis delivered to your inbox</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Instant alerts for significant price movements and trend changes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Personalized buy, sell, or hold recommendations based on AI analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={phoneRef} className="notification-reveal">
            <div className="relative mx-auto w-[270px] h-[550px]">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[42px] border-8 border-[#1a1a1a] bg-[#0a0a0a] shadow-xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-[#0a0a0a] rounded-b-xl z-10"></div>
                
                {/* Screen content */}
                <div className="absolute inset-0 p-1 rounded-[34px] overflow-hidden bg-gradient-to-b from-[#131313] to-[#0d0d0d]">
                  {/* Stock app home screen */}
                  <div className="absolute inset-0 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-semibold">StockAI</h3>
                      <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    
                    <div className="glass-morph rounded-xl p-3 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs text-foreground/70">Apple Inc.</div>
                          <div className="text-sm font-semibold">AAPL</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">$178.72</div>
                          <div className="text-xs text-success flex items-center justify-end">+2.4% <ArrowUp className="h-2 w-2 ml-1" /></div>
                        </div>
                      </div>
                      <div className="h-12 w-full">
                        <svg viewBox="0 0 100 20" className="w-full h-full">
                          <path
                            d="M0,10 Q10,9 20,15 T40,12 T60,8 T80,10 T100,5"
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="glass-morph rounded-xl p-3 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs text-foreground/70">Tesla, Inc.</div>
                          <div className="text-sm font-semibold">TSLA</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">$173.80</div>
                          <div className="text-xs text-success flex items-center justify-end">+5.2% <ArrowUp className="h-2 w-2 ml-1" /></div>
                        </div>
                      </div>
                      <div className="h-12 w-full">
                        <svg viewBox="0 0 100 20" className="w-full h-full">
                          <path
                            d="M0,15 Q10,12 20,10 T40,8 T60,10 T80,6 T100,3"
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="glass-morph rounded-xl p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs text-foreground/70">META Platforms</div>
                          <div className="text-sm font-semibold">META</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">$474.99</div>
                          <div className="text-xs text-destructive flex items-center justify-end">-1.2% <ArrowDown className="h-2 w-2 ml-1" /></div>
                        </div>
                      </div>
                      <div className="h-12 w-full">
                        <svg viewBox="0 0 100 20" className="w-full h-full">
                          <path
                            d="M0,5 Q10,7 20,8 T40,10 T60,12 T80,10 T100,15"
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Notification overlay */}
                    <div 
                      id="phone-notification" 
                      className="absolute top-4 left-4 right-4 p-3 glass-card bg-card/90 backdrop-blur-md rounded-xl translate-x-full opacity-0"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                          <Bell className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold mb-0.5">StockAI Prediction</div>
                          <div className="text-xs text-foreground/80 mb-1">AAPL: Buy opportunity tomorrow</div>
                          <div className="text-xs font-medium text-success flex items-center">
                            Predicted +5.99% <ArrowUp className="h-2 w-2 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationDemo;
