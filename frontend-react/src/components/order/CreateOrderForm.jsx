import { ChevronRight, Plus } from "lucide-react";

export default function CreateOrderForm({ products, selectedProduct, onSubmit }) {
  return (
    <form className="panel form-grid" onSubmit={onSubmit}>
      <label>
        Sản phẩm
        <select name="productId" defaultValue={selectedProduct?.id}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </label>
      <label>
        Tên khách hàng
        <input name="customerName" defaultValue="Nguyen Van A" required />
      </label>
      <label>
        Số lượng
        <input name="quantity" type="number" min="1" defaultValue="2" required />
      </label>
      <label>
        Địa chỉ
        <input name="address" placeholder="12 Nguyễn Trãi, Quận 1" />
      </label>
      <label>
        Số điện thoại
        <input name="phone" placeholder="0901234567" />
      </label>
      <div className="flow-line">
        <span>Customer</span>
        <ChevronRight size={16} />
        <span>Order</span>
        <ChevronRight size={16} />
        <span>Kafka</span>
        <ChevronRight size={16} />
        <span>Shipping</span>
      </div>
      <button className="primary-button" type="submit">
        <Plus size={18} />
        Tạo đơn hàng
      </button>
    </form>
  );
}
