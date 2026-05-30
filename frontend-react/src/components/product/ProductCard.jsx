import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductCard({ product, onProduct, actionLabel = "Chi tiết" }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div>
        <span>{product.category?.name ?? "General"}</span>
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price)}</p>
        <small>Tồn kho: {product.stock}</small>
      </div>
      <button className="secondary-button" onClick={() => onProduct(product.id)}>
        {actionLabel}
      </button>
    </article>
  );
}
