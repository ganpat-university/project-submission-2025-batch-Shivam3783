// import { create } from 'zustand';

// // Define the type for the company profile
// interface CompanyProfile {
//   companyName: string;
//   symbol: string;
//   price: number;
//   currency: string;
//   exchange: string;
//   industry: string;
//   sector: string;
//   website: string;
//   description: string;
//   ceo: string;
//   fullTimeEmployees: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zip: string;
//   country: string;
//   ipoDate: string;
//   volAvg: number;
//   mktCap: number;
//   range: string;
//   beta: number;
//   lastDiv: number;
// }

// // Define the type for the store state and actions
// interface CompanyProfileStore {
//   companyProfiles: { [symbol: string]: CompanyProfile | null }; // Store profiles by symbol
//   isFetched: { [symbol: string]: boolean }; // Keep track of whether data is fetched for each symbol
//   setCompanyProfile: (symbol: string, profile: CompanyProfile) => void;
//   getCompanyProfile: (symbol: string) => CompanyProfile | null;
//   clearCompanyProfile: (symbol: string) => void;
//   clearAllCompanyProfiles: () => void; // Optional: To clear all stored profiles
// }

// // Create the Zustand store with TypeScript types
// const useCompanyProfileStore = create<CompanyProfileStore>((set) => ({
//   companyProfiles: {},
//   isFetched: {},
//   setCompanyProfile: (symbol, profile) =>
//     set((state) => ({
//       companyProfiles: { ...state.companyProfiles, [symbol]: profile },
//       isFetched: { ...state.isFetched, [symbol]: true },
//     })),
//   getCompanyProfile: (symbol) => {
//     return (state) => state.companyProfiles[symbol] || null;
//   },
//   clearCompanyProfile: (symbol) =>
//     set((state) => ({
//       companyProfiles: { ...state.companyProfiles, [symbol]: null },
//       isFetched: { ...state.isFetched, [symbol]: false },
//     })),
//   clearAllCompanyProfiles: () => set({ companyProfiles: {}, isFetched: {} }), // Optional: To clear all profiles
// }));

// export default useCompanyProfileStore;


import { create } from 'zustand';

// Define the type for the company profile
interface CompanyProfile {
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
}

// Define the type for the store state and actions
interface CompanyProfileStore {
  companyProfile: CompanyProfile | null;
  isFetched: boolean;
  setCompanyProfile: (profile: CompanyProfile) => void;
  clearCompanyProfile: () => void;
}

// Create the Zustand store with TypeScript types
const useCompanyProfileStore = create<CompanyProfileStore>((set) => ({
  companyProfile: null,
  isFetched: false,
  setCompanyProfile: (profile) => set({ companyProfile: profile, isFetched: true }),
  clearCompanyProfile: () => set({ companyProfile: null, isFetched: false }),
}));

export default useCompanyProfileStore;