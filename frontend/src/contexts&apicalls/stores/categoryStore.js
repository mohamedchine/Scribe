import { create } from "zustand";
import { toast } from "react-toastify";
import api from "../../utils/api";

const useCategoryStore = create((set, get) => ({
  // states
  categories: [],
  loading: {
    fetch: false,
    create: false,
    delete: false,
  },

  // get all categories
  fetchCategories: async () => {
    set((state) => ({ loading: { ...state.loading, fetch: true } }));

    try {
      const { data } = await api.get("/api/categories");

      set((state) => ({
        categories: data,
        loading: { ...state.loading, fetch: false },
      }));
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, fetch: false },
      }));

      toast.error(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    }
  },

  // add new category
  createCategory: async (newCategory) => {
    set((state) => ({ loading: { ...state.loading, create: true } }));

    try {
      const { data } = await api.post("/api/categories", newCategory);

      set((state) => ({
        categories: [...state.categories, data],
        loading: { ...state.loading, create: false },
      }));

      toast.success("Category created successfully");
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, create: false },
      }));

      toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    }
  },

  // delete category
  deleteCategory: async (categoryId) => {
    set((state) => ({ loading: { ...state.loading, delete: true } }));

    try {
      const { data } = await api.delete(`/api/categories/${categoryId}`);

      set((state) => ({
        categories: state.categories.filter((c) => c._id !== categoryId),
        loading: { ...state.loading, delete: false },
      }));

      toast.success(data.message);
    } catch (error) {
      set((state) => ({
        loading: { ...state.loading, delete: false },
      }));

      toast.error(
        error?.response?.data?.message || "Failed to delete category"
      );
    }
  },
}));

export { useCategoryStore };