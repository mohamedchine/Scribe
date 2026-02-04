import { toast } from "react-toastify";
import api from "../../utils/api";
import { useCategory } from "../contexts/categoryContext";


// Fetch All Categories
export const useFetchCategories = () => {
  const { setCategories } = useCategory();

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/api/categories");
      setCategories(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch categories");
    }
  };

  return fetchCategories;
};

// Create Category
export const useCreateCategory = () => {
  const { addCategory } = useCategory();
  

  const createCategory = async (newCategory) => {
    try {
      const { data } = await api.post("/api/categories", newCategory);
      addCategory(data);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create category");
    }
  };

  return createCategory;
};

// Delete Category
export const useDeleteCategory = () => {
  const { deleteCategory } = useCategory();
 

  const deleteCategoryFn = async (categoryId) => {
    try {
      const { data } = await api.delete(`/api/categories/${categoryId}`);
      deleteCategory(categoryId);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    }
  };

  return deleteCategoryFn;
};

