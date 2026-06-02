import { ChevronRight, ClipboardList, MapPin, PackageCheck, Phone, Plus, RadioTower, ShieldCheck, ShoppingBag, Truck, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function CreateOrderForm({ products, selectedProduct, selectedQuantity = 1, onSubmit }) {
  const [productId, setProductId] = useState(String(selectedProduct?.id ?? products[0]?.id ?? ""));
  const [quantity, setQuantity] = useState(Number(selectedQuantity) || 1);

  const activeProduct = useMemo(
    () => products.find((product) => String(product.id) === String(productId)) ?? selectedProduct ?? products[0],
    [productId, products, selectedProduct]
  );

  const total = Number(activeProduct?.price ?? 0) * Number(quantity || 0);
  const stock = Number(activeProduct?.stock ?? 0);
  const stockLevel = Math.min(100, stock * 10);

  useEffect(() => {
    setProductId(String(selectedProduct?.id ?? products[0]?.id ?? ""));
    setQuantity(Number(selectedQuantity) || 1);
  }, [products, selectedProduct, selectedQuantity]);

  return (
    <section className="checkout-page">
      <div className="checkout-hero">
        <div>
          <p className="eyebrow">Checkout</p>
          <h2>Tạo đơn hàng và kích hoạt luồng Kafka giao hàng</h2>
          <span>Thông tin đơn sẽ được gửi sang Order Service, phát event và đồng bộ sang Notification/Shipping Service.</span>
        </div>
        <div className="checkout-hero-steps">
          <span><ShoppingBag size={17} />Customer</span>
          <ChevronRight size={16} />
          <span><ClipboardList size={17} />Order</span>
          <ChevronRight size={16} />
          <span><RadioTower size={17} />Kafka</span>
          <ChevronRight size={16} />
          <span><Truck size={17} />Shipping</span>
        </div>
      </div>

      <div className="checkout-grid">
        <form className="panel checkout-form" onSubmit={onSubmit}>
          <div className="form-card-head">
            <div className="form-icon">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="eyebrow">Order Form</p>
              <h3>Thông tin đặt hàng</h3>
            </div>
          </div>

          <label>
            Sản phẩm
            <select name="productId" value={productId} onChange={(event) => setProductId(event.target.value)}>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </label>

          <div className="checkout-two-columns">
            <label>
              Tên khách hàng
              <div className="input-icon">
                <UserRound size={17} />
                <input name="customerName" defaultValue="Nguyen Van A" required />
              </div>
            </label>
            <label>
              Số lượng
              <input name="quantity" type="number" min="1" max={stock || undefined} value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
            </label>
          </div>

          <label>
            Địa chỉ nhận hàng
            <div className="input-icon">
              <MapPin size={17} />
              <input name="address" placeholder="12 Nguyễn Trãi, Quận 1" />
            </div>
          </label>

          <label>
            Số điện thoại
            <div className="input-icon">
              <Phone size={17} />
              <input name="phone" placeholder="0901234567" />
            </div>
          </label>

          <div className="checkout-flow-line">
            <span>Customer</span>
            <ChevronRight size={16} />
            <span>Order</span>
            <ChevronRight size={16} />
            <span>Kafka</span>
            <ChevronRight size={16} />
            <span>Shipping</span>
          </div>

          <button className="primary-button checkout-submit" type="submit">
            <Plus size={18} />
            Tạo đơn hàng
          </button>
        </form>

        <aside className="checkout-summary">
          <div className="checkout-product-preview">
            <img src={activeProduct?.image} alt={activeProduct?.name ?? "Sản phẩm"} />
            <span>{activeProduct?.category?.name ?? "General"}</span>
          </div>
          <div className="checkout-summary-body">
            <p className="eyebrow">Order Summary</p>
            <h3>{activeProduct?.name ?? "Chưa chọn sản phẩm"}</h3>
            <p>{activeProduct?.description || "Sản phẩm đang được cập nhật mô tả."}</p>

            <div className="checkout-summary-row">
              <span>Đơn giá</span>
              <strong>{formatCurrency(activeProduct?.price ?? 0)}</strong>
            </div>
            <div className="checkout-summary-row">
              <span>Số lượng</span>
              <strong>{quantity || 0}</strong>
            </div>
            <div className="checkout-summary-row total">
              <span>Tạm tính</span>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <div className="checkout-stock">
              <div>
                <span><PackageCheck size={16} />Tồn kho</span>
                <strong>{stock}</strong>
              </div>
              <i><b style={{ width: `${stockLevel}%` }} /></i>
            </div>

            <div className="checkout-assurance">
              <span><ShieldCheck size={16} />Đơn hàng được ghi vào PostgreSQL</span>
              <span><RadioTower size={16} />Kafka event được phát sau khi tạo đơn</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
