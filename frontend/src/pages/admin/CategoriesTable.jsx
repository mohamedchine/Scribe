import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useEffect } from "react";
import { useCategoryStore } from "../../stores&apicalls/categoryStore";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

const CategoriesTable = () => {
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        deleteCategory(categoryId)
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th className="action-column category-action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td className="action-column category-action-column">
                  <div className="table-button-group " >
                  <button>
                      <Link to={`/posts/categories/${item.title}`}>
                                 View Category
                       </Link>
                    </button>
                    <button onClick={() => deleteCategoryHandler(item._id)}>
                      Delete Category
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoriesTable;
