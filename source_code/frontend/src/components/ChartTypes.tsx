import React, { useEffect, useRef } from 'react';
import { 
  LineChart, 
  BarChart3, 
  CandlestickChart,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ChartTypes = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observedElements = document.querySelectorAll('.chart-reveal');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        } else {
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

  return (
    <section id="charts" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Tabs defaultValue="line" className="w-full chart-reveal">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                <TabsTrigger 
                  value="line" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <LineChart className="h-4 w-4 mr-2" /> Line
                </TabsTrigger>
                <TabsTrigger 
                  value="bar" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BarChart3 className="h-4 w-4 mr-2" /> Bar
                </TabsTrigger>
                <TabsTrigger 
                  value="candle" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CandlestickChart className="h-4 w-4 mr-2" /> Candle
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="line" className="mt-6">
                <div className="glass-card p-4 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-foreground/70">Apple Inc.</div>
                      <div className="text-xl font-semibold">AAPL</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-foreground/70">30-Day Forecast</div>
                      <div className="text-lg font-medium text-success">+5.99%</div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.pixabay.com/photo/2021/05/05/13/45/stock-chart-6230863_1280.jpg" 
                      alt="Line chart"
                      className="w-full h-full object-cover rounded-lg opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full p-4" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path
                          d="M0,20 Q5,18 10,22 T20,19 T30,21 T40,18 T50,23"
                          fill="none" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="0.5"
                          strokeLinejoin="round"
                        />
                        
                        <path
                          d="M50,23 Q60,20 70,18 T80,15 T90,13 T100,10"
                          fill="none" 
                          stroke="hsl(var(--success))" 
                          strokeWidth="0.5"
                          strokeDasharray="1,1"
                          strokeLinejoin="round"
                        />
                        
                        <path
                          d="M0,20 Q5,18 10,22 T20,19 T30,21 T40,18 T50,23 V40 H0 Z"
                          fill="url(#lineGradient)" 
                          opacity="0.2"
                        />
                        
                        <path
                          d="M50,23 Q60,20 70,18 T80,15 T90,13 T100,10 V40 H50 Z"
                          fill="url(#predictionGradient)" 
                          opacity="0.1"
                        />
                        
                        <line
                          x1="50" y1="0" x2="50" y2="40"
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.2"
                          strokeDasharray="0.5,0.5"
                        />
                        
                        <text x="50" y="5" fill="hsl(var(--primary))" fontSize="2" textAnchor="middle">Today</text>
                        
                        <defs>
                          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                          <linearGradient id="predictionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--success))" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bar" className="mt-6">
                <div className="glass-card p-4 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-foreground/70">Tesla, Inc.</div>
                      <div className="text-xl font-semibold">TSLA</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-foreground/70">30-Day Forecast</div>
                      <div className="text-lg font-medium text-success">+10.79%</div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.pixabay.com/photo/2016/04/19/04/37/chart-1338002_1280.png" 
                      alt="Bar chart"
                      className="w-full h-full object-cover rounded-lg opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full p-4" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <rect x="5" y="20" width="4" height="10" fill="hsl(var(--primary))" opacity="0.7" />
                        <rect x="15" y="22" width="4" height="8" fill="hsl(var(--primary))" opacity="0.7" />
                        <rect x="25" y="18" width="4" height="12" fill="hsl(var(--primary))" opacity="0.7" />
                        <rect x="35" y="16" width="4" height="14" fill="hsl(var(--primary))" opacity="0.7" />
                        <rect x="45" y="19" width="4" height="11" fill="hsl(var(--primary))" opacity="0.7" />
                        
                        <rect x="55" y="17" width="4" height="13" fill="hsl(var(--success))" opacity="0.5" />
                        <rect x="65" y="15" width="4" height="15" fill="hsl(var(--success))" opacity="0.5" />
                        <rect x="75" y="12" width="4" height="18" fill="hsl(var(--success))" opacity="0.5" />
                        <rect x="85" y="10" width="4" height="20" fill="hsl(var(--success))" opacity="0.5" />
                        <rect x="95" y="8" width="4" height="22" fill="hsl(var(--success))" opacity="0.5" />
                        
                        <line
                          x1="50" y1="0" x2="50" y2="40"
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.2"
                          strokeDasharray="0.5,0.5"
                        />
                        
                        <text x="50" y="5" fill="hsl(var(--primary))" fontSize="2" textAnchor="middle">Today</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="candle" className="mt-6">
                <div className="glass-card p-4 rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-foreground/70">NVIDIA Corporation</div>
                      <div className="text-xl font-semibold">NVDA</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-foreground/70">30-Day Forecast</div>
                      <div className="text-lg font-medium text-success">+8.27%</div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <img 
                      src="https://cdn.pixabay.com/photo/2018/06/18/11/52/candles-3481846_1280.jpg" 
                      alt="Candlestick chart"
                      className="w-full h-full object-cover rounded-lg opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full p-4" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <line x1="5" y1="15" x2="5" y2="25" stroke="hsl(var(--success))" strokeWidth="0.5" />
                        <rect x="3" y="18" width="4" height="5" fill="hsl(var(--success))" opacity="0.7" />
                        
                        <line x1="15" y1="16" x2="15" y2="26" stroke="hsl(var(--destructive))" strokeWidth="0.5" />
                        <rect x="13" y="16" width="4" height="7" fill="hsl(var(--destructive))" opacity="0.7" />
                        
                        <line x1="25" y1="14" x2="25" y2="24" stroke="hsl(var(--success))" strokeWidth="0.5" />
                        <rect x="23" y="17" width="4" height="4" fill="hsl(var(--success))" opacity="0.7" />
                        
                        <line x1="35" y1="13" x2="35" y2="23" stroke="hsl(var(--success))" strokeWidth="0.5" />
                        <rect x="33" y="16" width="4" height="5" fill="hsl(var(--success))" opacity="0.7" />
                        
                        <line x1="45" y1="15" x2="45" y2="25" stroke="hsl(var(--destructive))" strokeWidth="0.5" />
                        <rect x="43" y="15" width="4" height="6" fill="hsl(var(--destructive))" opacity="0.7" />
                        
                        <line x1="55" y1="14" x2="55" y2="24" stroke="hsl(var(--success))" strokeWidth="0.5" opacity="0.6" strokeDasharray="0.5,0.5" />
                        <rect x="53" y="15" width="4" height="5" fill="hsl(var(--success))" opacity="0.4" />
                        
                        <line x1="65" y1="12" x2="65" y2="22" stroke="hsl(var(--success))" strokeWidth="0.5" opacity="0.6" strokeDasharray="0.5,0.5" />
                        <rect x="63" y="14" width="4" height="4" fill="hsl(var(--success))" opacity="0.4" />
                        
                        <line x1="75" y1="11" x2="75" y2="21" stroke="hsl(var(--destructive))" strokeWidth="0.5" opacity="0.6" strokeDasharray="0.5,0.5" />
                        <rect x="73" y="11" width="4" height="5" fill="hsl(var(--destructive))" opacity="0.4" />
                        
                        <line x1="85" y1="9" x2="85" y2="19" stroke="hsl(var(--success))" strokeWidth="0.5" opacity="0.6" strokeDasharray="0.5,0.5" />
                        <rect x="83" y="12" width="4" height="4" fill="hsl(var(--success))" opacity="0.4" />
                        
                        <line x1="95" y1="7" x2="95" y2="17" stroke="hsl(var(--success))" strokeWidth="0.5" opacity="0.6" strokeDasharray="0.5,0.5" />
                        <rect x="93" y="10" width="4" height="5" fill="hsl(var(--success))" opacity="0.4" />
                        
                        <line
                          x1="50" y1="0" x2="50" y2="40"
                          stroke="hsl(var(--primary))"
                          strokeWidth="0.2"
                          strokeDasharray="0.5,0.5"
                        />
                        
                        <text x="50" y="5" fill="hsl(var(--primary))" fontSize="2" textAnchor="middle">Today</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-foreground/80 font-medium chart-reveal">
                Advanced Visualization
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold chart-reveal">
                Visualize Market Trends with <span className="text-primary">Multiple Chart Types</span>
              </h2>
              
              <p className="text-foreground/70 chart-reveal">
                Our platform offers various chart types to help you analyze market trends from different angles. Choose between line charts for smooth trends, bar charts for volume comparison, and candlestick charts for detailed price movements.
              </p>
              
              <ul className="space-y-3 chart-reveal">
                <li className="flex items-start">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                    <LineChart className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Line Charts</span>
                    <p className="text-sm text-foreground/70">Perfect for visualizing trends and changes over time with smooth, continuous lines.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                    <BarChart3 className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Bar Charts</span>
                    <p className="text-sm text-foreground/70">Ideal for comparing volumes, frequencies, or discrete values across different categories.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                    <CandlestickChart className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Candlestick Charts</span>
                    <p className="text-sm text-foreground/70">Shows open, high, low, and close prices, essential for detailed technical analysis.</p>
                  </div>
                </li>
              </ul>
              
              <div className="chart-reveal">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartTypes;
