import { Boxes, FolderTree, Search, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryForm from "../../components/category/CategoryForm.jsx";
import CategoryTable from "../../components/category/CategoryTable.jsx";

export default function CategoryManagementPage({ categories, products = [], editingCategory, onCreate, onEdit, onDelete, onCancelEdit }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => categories.filter((category) => {
    const text = `${category.name} ${category.description ?? ""}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [categories, query]);

  const assignedProducts = products.filter((product) => product.category?.id).length;

  return (
    <section className="category-management">
      <div className="category-hero">
        <div>
          <p className="eyebrow">Catalog Taxonomy</p>
          <h2>Quản lý danh mục sản phẩm</h2>
          <span>Tổ chức catalog rõ ràng để Admin thêm sản phẩm, khách hàng lọc sản phẩm và báo cáo dễ theo dõi.</span>
        </div>
        <div className="category-hero-stats">
          <article>
            <Boxes size={20} />
            <strong>{categories.length}</strong>
            <span>Danh mục</span>
          </article>
          <article>
            <Tag size={20} />
            <strong>{assignedProducts}</strong>
            <span>Sản phẩm đã gắn</span>
          </article>
          <article>
            <FolderTree size={20} />
            <strong>{filtered.length}</strong>
            <span>Kết quả lọc</span>
          </article>
        </div>
      </div>

      <div className="management-grid category-management-grid">
        <CategoryForm editingCategory={editingCategory} onCreate={onCreate} onCancel={onCancelEdit} />
        <div className="list-stack">
          <div className="toolbar category-toolbar">
            <div className="input-icon grow">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm danh mục theo tên hoặc mô tả" />
            </div>
          </div>
          <CategoryTable categories={filtered} products={products} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </section>
  );
}
