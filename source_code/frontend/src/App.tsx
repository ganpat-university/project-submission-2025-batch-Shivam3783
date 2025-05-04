
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// // import SignIn from "./pages/SignIn";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           {/* <Route path="/sign-in" element={<SignIn />} /> */}
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import StockPredictApp from "@/components/inside/StockPredictApp";
import StockPredictApp from "@/components/inside/StockPredictApp"
import SignUpPage from "@/components/inside/SignUpPage";
import SignInPage from "@/components/inside/SignInPage";
import UserProfilePage from "@/components/inside/UserProfilePage";

import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

import AdminDashboard from "@/components/inside/AdminDashboard";
import AdminLayout from "@/components/ui/AdminLayout";
import AdminUsers from "@/components/inside/AdminUsers";
import AdminSettings from "@/components/inside/AdminSettings";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useUser();
  
  // if (user?.id !== "user_2vKuVuCtr64QbBIJnmVa71SwaVh") {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};




const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      {/* Routes for signed out users */}
      <Route path="/" element={<Index />} />
      {/* <Route path="/"
        element={
          <SignedOut>
            <Index />
          </SignedOut>
        }
      /> */}
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/user/profile" element={<UserProfilePage />} />
      <Route path="/stocks/:companySymbol" element={<StockPredictApp />} />

      {/* Routes for signed-in users */}
      <Route
        path="/home"
        element={
          <SignedIn>
            <StockPredictApp />
          </SignedIn>
        }
      />

       {/* Admin panel routes */}
       <Route
        path="/admin/dashboard"
        element={
          <SignedIn>
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          </SignedIn>
        }
      />
      <Route
        path="/admin/users"
        element={
          <SignedIn>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </SignedIn>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <SignedIn>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </SignedIn>
        }
      />


      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
