import { create } from 'zustand';

interface CompanyInfo {
  name: string;
  ecoScore: number;
  ranking: number;
}


interface StockStore {
  companyStoreDict: { [key: string]: CompanyInfo };
  setCompanyStoreDict: (dict: { [key: string]: CompanyInfo }) => void;
}

const useStockStore = create<StockStore>((set) => ({
  companyStoreDict: {},
  setCompanyStoreDict: (dict: { [key: string]: CompanyInfo }) => set({ companyStoreDict: dict }),
}));

export default useStockStore;
