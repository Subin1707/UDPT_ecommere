import { Minus, PackageCheck, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function CartPage({ items, onIncrease, onDecrease, onRemove, onCheckout, onCatalog }) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + Number(item.product.price ?? 0) * item.quantity, 0);

  return (
    <section className="cart-page">
      <div className="cart-hero">
        <div>
          <p className="eyebrow">Shopping Cart</p>
          <h2>Giỏ hàng mua sau</h2>
          <span>
            Lưu sản phẩm yêu thích vào giỏ, kiểm tra số lượng và chọn món cần đặt khi sẵn sàng mua.
          </span>
        </div>
        <div className="cart-hero-total">
          <ShoppingCart size={24} />
          <strong>{totalQuantity}</strong>
          <span>sản phẩm trong giỏ</span>
        </div>
      </div>

      {items.length ? (
        <div className="cart-layout">
          <div className="cart-item-list">
            {items.map((item) => (
              <article className="cart-item-card" key={item.product.id}>
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-copy">
                  <span>{item.product.category?.name ?? "General"}</span>
                  <h3>{item.product.name}</h3>
                  <p>{formatCurrency(item.product.price)}</p>
                  <small>
                    <PackageCheck size={14} />
                    Tồn kho: {item.product.stock}
                  </small>
                </div>

                <div className="cart-quantity-control">
                  <button type="button" onClick={() => onDecrease(item.product.id)}>
                    <Minus size={15} />
                  </button>
                  <strong>{item.quantity}</strong>
                  <button type="button" onClick={() => onIncrease(item.product.id)}>
                    <Plus size={15} />
                  </button>
                </div>

                <div className="cart-item-actions">
                  <button className="primary-button" type="button" onClick={() => onCheckout(item.product.id)}>
                    <ShoppingBag size={16} />
                    Đặt món này
                  </button>
                  <button className="secondary-button danger-button" type="button" onClick={() => onRemove(item.product.id)}>
                    <Trash2 size={16} />
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="panel cart-summary-card">
            <p className="eyebrow">Tạm tính</p>
            <h3>{formatCurrency(totalPrice)}</h3>
            <div>
              <span>Tổng số lượng</span>
              <strong>{totalQuantity}</strong>
            </div>
            <div>
              <span>Số dòng sản phẩm</span>
              <strong>{items.length}</strong>
            </div>
            <button className="secondary-button" type="button" onClick={onCatalog}>
              Tiếp tục mua sắm
            </button>
          </aside>
        </div>
      ) : (
        <div className="panel cart-empty-state">
          <ShoppingCart size={42} />
          <h3>Giỏ hàng đang trống</h3>
          <p>Hãy thêm sản phẩm vào giỏ để lưu lại và đặt hàng sau.</p>
          <button className="primary-button" type="button" onClick={onCatalog}>
            Xem sản phẩm
          </button>
        </div>
      )}
    </section>
  );
}
