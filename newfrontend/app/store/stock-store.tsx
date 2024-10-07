import { create } from 'zustand';

interface StockStore {
  companyStoreDict: { [key: string]: string };
  setCompanyStoreDict: (dict: { [key: string]: string }) => void;
}

const useStockStore = create((set) => ({
  companyStoreDict: {},
  setCompanyStoreDict: (dict: string) => set({ companyStoreDict: dict }),
}))

export default useStockStore;