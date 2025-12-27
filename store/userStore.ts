import { create } from 'zustand';
import { User } from '@/types/user';

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));