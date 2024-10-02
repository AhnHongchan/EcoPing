import { create } from 'zustand';

interface AuthStore {
  userId: string;
  setUserId: (id: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userId: '',
  setUserId: (id) => set({ userId: id }),
}));
