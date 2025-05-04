import React from 'react';
import {
  Building2,
  Globe,
  Users,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  BarChart3,
  Award,
  Info,
} from 'lucide-react';

interface CompanyProfileProps {
  profile: {
    companyName: string;
    symbol: string;
    price: number;
    currency: string;
    exchange: string;
    industry: string;
    sector: string;
    website: string;
    description: string;
    ceo: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    ipoDate: string;
    volAvg: number;
    mktCap: number;
    range: string;
    beta: number;
    lastDiv: number;
  };
}

const isIndianExchange = (symbol: string) => {
  return symbol.endsWith('.BSE') || symbol.endsWith('.BO') || symbol.endsWith('.NSE') || symbol.endsWith('.NS');
};

function CompanyProfile({ profile }: CompanyProfileProps) {
  // const formatMarketCap = (value: number) => {
  //   if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  //   if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  //   if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  //   return `$${value.toLocaleString()}`;
  // };

  const formatMarketCap = (value: number, symbol: string) => {
    const currencySymbol = isIndianExchange(symbol) ? "₹" : "$";  // Check if Indian exchange, use ₹

    if (value >= 1e12) return `${currencySymbol}${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${currencySymbol}${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${currencySymbol}${(value / 1e6).toFixed(2)}M`;
    return `${currencySymbol}${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
      {/* Company Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-700">
          <Building2 className="h-6 w-6 text-indigo-600" />
          Company Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{profile.description}</p>
            <div className="flex items-center gap-2 text-indigo-600">
              <Globe className="h-5 w-5" />
              <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                 className="hover:underline">{profile.website}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-900">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Industry</div>
              <div className="font-semibold">{profile.industry}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Sector</div>
              <div className="font-semibold">{profile.sector}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">CEO</div>
              <div className="font-semibold">{profile.ceo}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Employees</div>
              <div className="font-semibold">{formatNumber(parseInt(profile.fullTimeEmployees))}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-700">
          <BarChart3 className="h-6 w-6 text-indigo-600" />
          Key Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-900">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Market Cap</div>
            <div className="font-semibold">{formatMarketCap(profile.mktCap, profile.symbol)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Beta</div>
            <div className="font-semibold">{profile.beta.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Avg. Volume</div>
            <div className="font-semibold">{formatNumber(profile.volAvg)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Last Dividend</div>
            <div className="font-semibold">
              {isIndianExchange(profile.symbol) ? "₹" : "$"}
              {profile.lastDiv.toFixed(2)}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">52-Week Range</div>
            <div className="font-semibold">{profile.range}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Exchange</div>
            <div className="font-semibold">{profile.exchange}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Currency</div>
            <div className="font-semibold">{profile.currency}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">IPO Date</div>
            <div className="font-semibold">{new Date(profile.ipoDate).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-700">
          <Info className="h-6 w-6 text-indigo-600" />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-black">
              <Phone className="h-5 w-5 text-gray-400" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-black">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>{`${profile.address}, ${profile.city}, ${profile.state} ${profile.zip}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;


// import React from 'react';
// import {
//   Briefcase,
//   Globe,
//   Users,
//   PhoneCall,
//   MapPin,
//   CalendarClock,
//   TrendingUp,
//   DollarSign,
//   LineChart,
//   Award,
//   Mail,
//   Building,
//   ChevronRight,
//   Percent,
//   Activity,
//   CircleDollarSign,
//   BarChart4,
//   Network
// } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { cn } from '@/lib/utils';
// import './css/marketoverviewloading.css';

// interface CompanyProfileProps {
//   profile: {
//     companyName: string;
//     symbol: string;
//     price: number;
//     currency: string;
//     exchange: string;
//     industry: string;
//     sector: string;
//     website: string;
//     description: string;
//     ceo: string;
//     fullTimeEmployees: string;
//     phone: string;
//     address: string;
//     city: string;
//     state: string;
//     zip: string;
//     country: string;
//     ipoDate: string;
//     volAvg: number;
//     mktCap: number;
//     range: string;
//     beta: number;
//     lastDiv: number;
//   };
// }

// function CompanyProfile({ profile }: CompanyProfileProps) {
//   const formatMarketCap = (value: number) => {
//     if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
//     if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
//     if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
//     return `$${value.toLocaleString()}`;
//   };

//   const formatNumber = (value: number) => {
//     return value.toLocaleString();
//   };

//   // Calculate dividend yield (simplified)
//   const dividendYield = (profile.lastDiv / profile.price) * 100;

//   const StatItem = ({ icon: Icon, label, value, className }: { 
//     icon: React.ElementType; 
//     label: string; 
//     value: string | number; 
//     className?: string 
//   }) => (
//     <div className={cn("flex flex-col gap-1.5 p-4 rounded-xl bg-white shadow-sm transition-all hover:shadow-md", className)}>
//       <div className="flex items-center gap-2 text-gray-500 text-sm">
//         <Icon className="h-4 w-4" />
//         <span>{label}</span>
//       </div>
//       <div className="font-semibold text-gray-900">{value}</div>
//     </div>
//   );

//   return (
//     <div className="space-y-8 bg-gray-50 p-8 rounded-xl">
//       {/* Company Header */}
//       <Card className="overflow-hidden border-none shadow-md bg-white">
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="space-y-1">
//               <div className="flex items-center gap-2">
//                 <h1 className="text-3xl font-bold tracking-tight text-gray-900">{profile.companyName}</h1>
//                 <Badge variant="outline" className="bg-white border-gray-200">
//                   {profile.symbol}
//                 </Badge>
//               </div>
//               <p className="text-gray-500">{profile.sector} · {profile.industry}</p>
//             </div>
//             <div className="flex flex-col items-end">
//               <div className="text-3xl font-bold text-gray-900">${profile.price.toFixed(2)}</div>
//               <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">
//                 <TrendingUp className="mr-1 h-3 w-3" />
//                 +2.45%
//               </Badge>
//             </div>
//           </div>
//         </div>
        
//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-100">
//           <StatItem 
//             icon={Building} 
//             label="Exchange" 
//             value={profile.exchange}
//             className="border-r border-b border-gray-100 md:border-b-0" 
//           />
//           <StatItem 
//             icon={CircleDollarSign} 
//             label="Market Cap" 
//             value={formatMarketCap(profile.mktCap)}
//             className="border-b border-gray-100 md:border-r md:border-b-0" 
//           />
//           <StatItem 
//             icon={BarChart4} 
//             label="Beta" 
//             value={profile.beta.toFixed(2)}
//             className="border-r border-gray-100" 
//           />
//           <StatItem 
//             icon={Percent} 
//             label="Dividend Yield" 
//             value={`${dividendYield.toFixed(2)}%`} 
//           />
//         </div>
//       </Card>

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Left Column - About */}
//         <div className="md:col-span-2 space-y-8">
//           <Card className="bg-white border border-gray-100">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center gap-2 text-gray-900">
//                   <Briefcase className="h-5 w-5 text-blue-600" />
//                   About {profile.companyName}
//                 </CardTitle>
//                 <a 
//                   href={profile.website} 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="text-sm flex items-center text-blue-600 hover:text-blue-700 transition-colors"
//                 >
//                   <Globe className="h-4 w-4 mr-1" />
//                   Website
//                   <ChevronRight className="h-4 w-4" />
//                 </a>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <p className="text-gray-700 leading-relaxed">{profile.description}</p>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="text-sm text-gray-500">CEO</div>
//                   <div className="font-medium mt-1 text-gray-900">{profile.ceo}</div>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="text-sm text-gray-500">Employees</div>
//                   <div className="font-medium mt-1 flex items-center gap-1.5 text-gray-900">
//                     <Users className="h-3.5 w-3.5 text-gray-400" />
//                     {formatNumber(parseInt(profile.fullTimeEmployees))}
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="text-sm text-gray-500">Founded</div>
//                   <div className="font-medium mt-1 flex items-center gap-1.5 text-gray-900">
//                     <CalendarClock className="h-3.5 w-3.5 text-gray-400" />
//                     {new Date(profile.ipoDate).toLocaleDateString()}
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <div className="text-sm text-gray-500">Currency</div>
//                   <div className="font-medium mt-1 flex items-center gap-1.5 text-gray-900">
//                     <DollarSign className="h-3.5 w-3.5 text-gray-400" />
//                     {profile.currency}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Financial Metrics */}
//           <Card className="bg-white border border-gray-100">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-gray-900">
//                 <Activity className="h-5 w-5 text-blue-600" />
//                 Financial Metrics
//               </CardTitle>
//               <CardDescription className="text-gray-500">Key financial indicators and market performance</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100">
//                   <div className="text-sm text-gray-500">52-Week Range</div>
//                   <div className="font-semibold mt-1.5 text-gray-900">{profile.range}</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100">
//                   <div className="text-sm text-gray-500">Avg. Volume</div>
//                   <div className="font-semibold mt-1.5 text-gray-900">{formatNumber(profile.volAvg)}</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100">
//                   <div className="text-sm text-gray-500">Dividend</div>
//                   <div className="font-semibold mt-1.5 text-gray-900">${profile.lastDiv.toFixed(2)}</div>
//                 </div>
//               </div>
              
//               {/* Placeholder for Chart */}
//               <div className="mt-6 bg-gray-50 rounded-xl h-64 flex items-center justify-center border border-gray-200">
//                 <div className="text-gray-400 flex flex-col items-center">
//                   <LineChart className="h-8 w-8 mb-2 opacity-50" />
//                   <span>Stock Price Chart</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Contact & Additional Info */}
//         <div className="space-y-8">
//           {/* Contact Card */}
//           <Card className="bg-white border border-gray-100">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-gray-900">
//                 <Mail className="h-5 w-5 text-blue-600" />
//                 Contact Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <PhoneCall className="h-5 w-5 text-gray-400 mt-0.5" />
//                 <div>
//                   <div className="text-sm text-gray-500">Phone</div>
//                   <div className="font-medium text-gray-900">{profile.phone}</div>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
//                 <div>
//                   <div className="text-sm text-gray-500">Address</div>
//                   <div className="font-medium text-gray-900">
//                     {profile.address}
//                     <br />
//                     {profile.city}, {profile.state} {profile.zip}
//                     <br />
//                     {profile.country}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Industry Sector Card */}
//           <Card className="bg-white border border-gray-100">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-gray-900">
//                 <Network className="h-5 w-5 text-blue-600" />
//                 Industry Analysis
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
//                   <div className="text-sm text-gray-500">Sector</div>
//                   <div className="font-medium mt-1 text-gray-900">{profile.sector}</div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
//                   <div className="text-sm text-gray-500">Industry</div>
//                   <div className="font-medium mt-1 text-gray-900">{profile.industry}</div>
//                 </div>
//                 <Separator className="my-2 bg-gray-200" />
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Sector Performance</span>
//                   <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
//                     +3.2%
//                   </Badge>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyProfile;

