// import React, { useEffect } from 'react';
// import { SignIn,useClerk } from '@clerk/clerk-react';
// import { TrendingUp } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; 

// // const SignInPage = () => {
// const SignInPage = () => {

//   const { user } = useClerk();  
//   const navigate = useNavigate();

//   // Redirect to /home if the user is already signed in
//   useEffect(() => {
//     if (user) {
//       navigate("/home", { replace: true });
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
//           <h1 className="text-3xl font-bold text-gray-900">StockPredict</h1>
//           {/* <p className="mt-2 text-gray-600">Sign in to access stock predictions</p> */}
//         </div>
//         <SignIn
//           appearance={{
//             elements: {
//               rootBox: "mx-auto",
//               card: "bg-white shadow-lg rounded-lg p-8",
//               headerTitle: "text-2xl font-bold text-center text-gray-900",
//               headerSubtitle: "text-center text-gray-600",
//               socialButtonsBlockButton: "w-full",
//               formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
//             }
//           }}
//         //   path="/signinn"
//           routing="path"
//           path="/sign-in"   
//           signUpUrl="/sign-up"
//         //   signUpUrl="/signnnupp"
//           // redirectUrl="/signinn"
//           // signInUrl="/signinn"
//           afterSignInUrl="/home"
//           afterSignUpUrl="/home"
//         />
//       </div>
//     </div>
//   );
// };

// // export default SignInPage;
// export default SignInPage;  


import React, { useEffect } from 'react';
import { SignIn, useClerk } from '@clerk/clerk-react';
import { TrendingUp, Sparkle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { user } = useClerk();
  const navigate = useNavigate();

  // Redirect to /home if the user is already signed in
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 overflow-hidden relative">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/30 backdrop-blur-sm animate-float`}
            style={{
              width: `${Math.random() * 5 + 2}rem`,
              height: `${Math.random() * 5 + 2}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/30 rounded-full filter blur-[6rem]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full filter blur-[6rem]" />
      <div className="absolute top-[20%] left-[30%] w-[30%] h-[30%] bg-indigo-500/20 rounded-full filter blur-[5rem]" />

      {/* Content container */}
      <div className="grid lg:grid-cols-2 w-full max-w-5xl relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-600/90 to-purple-600/90 text-white rounded-l-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
          <div className="mb-8 flex items-center gap-2">
            <TrendingUp className="h-10 w-10" />
            <h1 className="text-3xl font-bold">StockPredict</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4">Intelligent Stock Prediction Platform</h2>
          <p className="text-lg mb-6 text-indigo-100">Leverage AI-powered insights to make smarter investment decisions.</p>
          
          {/* Feature points */}
          <div className="space-y-4 mt-8">
            {[
              "Real-time market analysis",
              "AI-driven stock recommendations",
              "Portfolio optimization tools",
              "Historical performance tracking"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Sparkle className="h-5 w-5 text-indigo-200" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Sign In Form */}
        <div className="p-8 lg:p-12 bg-white/80 backdrop-blur-md rounded-3xl lg:rounded-l-none rounded-r-3xl shadow-xl border border-white/50 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">StockPredict</h1>
            </div>
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
              <Lock className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-1 text-gray-600">Sign in to access your dashboard</p>
          </div>
          
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-transparent shadow-none p-0 border-0",
                headerTitle: "sr-only",
                headerSubtitle: "sr-only",
                socialButtonsBlockButton: "w-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors",
                socialButtonsBlockButtonText: "text-gray-600 font-medium",
                socialButtonsProviderIcon: "h-5 w-5",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 text-sm",
                formFieldLabel: "text-gray-700 font-medium",
                formFieldInput: "rounded-lg bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 transition-all",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors",
                footerActionText: "text-gray-600",
                footerActionLink: "text-indigo-600 hover:text-indigo-700 font-medium",
                formFieldAction: "text-indigo-600 hover:text-indigo-700",
                alert: "rounded-lg bg-red-50 border border-red-200 text-red-700",
              }
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/home"
            afterSignUpUrl="/home"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;