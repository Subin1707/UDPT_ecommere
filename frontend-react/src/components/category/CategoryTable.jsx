import { Edit3, Folder, Package, Trash2 } from "lucide-react";

export default function CategoryTable({ categories, products = [], onEdit, onDelete }) {
  if (!categories.length) {
    return <div className="empty-state">Không tìm thấy danh mục phù hợp.</div>;
  }

  return (
    <div className="category-card-grid">
      {categories.map((item) => {
        const productCount = products.filter((product) => product.category?.id === item.id).length;
        return (
          <article className="category-admin-card" key={item.id}>
            <div className="category-admin-icon">
              <Folder size={22} />
            </div>
            <div className="category-admin-copy">
              <span>ID #{item.id}</span>
              <h3>{item.name}</h3>
              <p>{item.description || "Chưa có mô tả"}</p>
            </div>
            <div className="category-admin-meta">
              <span><Package size={15} /> {productCount} sản phẩm</span>
            </div>
            <div className="button-row table-actions">
              <button className="secondary-button" type="button" onClick={() => onEdit(item)}>
                <Edit3 size={16} />
                Sửa
              </button>
              <button className="secondary-button danger-button" type="button" onClick={() => onDelete(item.id)}>
                <Trash2 size={16} />
                Xóa
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
