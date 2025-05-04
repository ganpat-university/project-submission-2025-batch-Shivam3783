import * as zustand from 'zustand';

type StockData = {
  symbol: string;
  name: string;
  open: number;
  close: number;
  change: number;
  volume: string;
};

type CompanyData = {
    open: number;
    close: number;
    change: number;
    volume: string;
  };

interface StockStore {
  stockData: StockData[] | null;
  setStockData: (data: StockData[]) => void;
  cachedStockData: StockData[] | null;
  setCachedStockData: (data: StockData[]) => void;
  companyData: CompanyData | null;
  setCompanyData: (data: CompanyData) => void;
}

export const useStore = zustand.create<StockStore>((set) => ({
    stockData: null,
    setStockData: (data) => set({ stockData: data }),
    cachedStockData: null,
    setCachedStockData: (data) => set({ cachedStockData: data }),
    companyData: null,
  setCompanyData: (data) => set({ companyData: data }),
  }));
  