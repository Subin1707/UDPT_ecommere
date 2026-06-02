import { Edit3, Package, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) {
    return <div className="empty-state">Không tìm thấy sản phẩm phù hợp.</div>;
  }

  return (
    <div className="product-admin-grid">
      {products.map((product) => (
        <article className="product-admin-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="product-admin-body">
            <span className="status-pill">{product.category?.name ?? "Chưa phân loại"}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-admin-meta">
              <strong>{formatCurrency(product.price)}</strong>
              <span><Package size={15} /> Kho: {product.stock}</span>
            </div>
          </div>
          <div className="button-row table-actions product-admin-actions">
            <button className="secondary-button" type="button" onClick={() => onEdit(product)}>
              <Edit3 size={16} />
              Sửa
            </button>
            <button className="secondary-button danger-button" type="button" onClick={() => onDelete(product.id)}>
              <Trash2 size={16} />
              Xóa
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
