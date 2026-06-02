import { ArrowRight, Boxes, PackageCheck, ShoppingCart } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductCard({ product, onProduct, onAddToCart, actionLabel = "Chi tiết" }) {
  return (
    <article className="product-card premium-product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.name} />
        <span>
          <Boxes size={14} />
          {product.category?.name ?? "General"}
        </span>
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price)}</p>
        <small>
          <PackageCheck size={14} />
          Tồn kho: {product.stock}
        </small>
      </div>
      <div className="product-card-actions">
        {onAddToCart && (
          <button className="primary-button" type="button" onClick={() => onAddToCart(product.id)}>
            <ShoppingCart size={16} />
            Thêm giỏ
          </button>
        )}
        <button className="secondary-button" type="button" onClick={() => onProduct(product.id)}>
          {actionLabel}
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
