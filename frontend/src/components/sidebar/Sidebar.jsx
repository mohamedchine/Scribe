import { Link } from "react-router-dom";
import "./sidebar.css";
import { useEffect } from "react";
import { useCategory } from "../../contexts&apicalls/contexts/categoryContext";
import { useFetchCategories } from "../../contexts&apicalls/apiCalls/categoryApiCall";


const Sidebar = () => {
  const { categories } = useCategory();
  const fetchCategories = useFetchCategories();

  useEffect(() => {
    fetchCategories();

  }, []);

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((category) => (
          <Link
            className="sidebar-link"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
