import { create } from "zustand";

const useCategoryStore = create((set, get) => ({
  categories: [],
  addCategory: (category) => {
    set((state) => ({ categories: [...state.categories, category] }));
  },
  deleteCategory: (_id) => {
    set((state) => ({ categories: state.categories.filter((c) => c._id !== _id) }));
  },
  setCategories: (categories) => {
    set({ categories });
  },
}));

export { useCategoryStore };
