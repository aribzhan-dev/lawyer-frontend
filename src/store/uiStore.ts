import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UIState {
  isLoading: boolean;
  toasts: Toast[];
  theme: 'light' | 'dark';
  setLoading: (loading: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Check local storage or default to light mode (the new design)
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to light mode as requested
    return 'light';
  }
  return 'light';
};

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  toasts: [],
  theme: getInitialTheme(),

  setLoading: (isLoading) => set({ isLoading }),

  toggleTheme: () => set((state) => {
    const next = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    return { theme: next };
  }),

  setTheme: (theme) => set(() => {
    localStorage.setItem('theme', theme);
    return { theme };
  }),

  addToast: (toast) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
