import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (_id) => {
    setCategories((prev) => prev.filter((c) => c._id !== _id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

