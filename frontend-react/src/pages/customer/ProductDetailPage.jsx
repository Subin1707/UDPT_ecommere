import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductDetailPage({ product, onOrder }) {
  if (!product) return <div className="empty-state">Chưa có sản phẩm.</div>;

  return (
    <section className="detail-grid">
      <img className="detail-image" src={product.image} alt={product.name} />
      <div className="panel detail-copy">
        <span className="status-pill">{product.category?.name ?? "General"}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="price-large">{formatCurrency(product.price)}</div>
        <div className="meta-row">
          <span>Tồn kho</span>
          <strong>{product.stock}</strong>
        </div>
        <button className="primary-button" onClick={onOrder}>
          <ShoppingBag size={18} />
          Đặt hàng
        </button>
      </div>
    </section>
  );
}
