'use client';

import { create } from 'zustand';

type FilterState = {
  query: string;
  category: string;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
};

export const useFilters = create<FilterState>((set) => ({
  query: '',
  category: 'all',
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category })
}));
