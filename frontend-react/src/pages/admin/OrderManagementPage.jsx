import { ClipboardList, Edit3, ListFilter, PackageCheck, Save, Search, Trash2, Truck, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";

const statuses = ["CREATED", "ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"];

function StatusBadge({ value }) {
  return <span className={`order-status-badge status-${String(value).toLowerCase()}`}>{value}</span>;
}

export default function OrderManagementPage({ orders, status, editingOrder, onStatus, onEdit, onUpdate, onDelete, onCancelEdit }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => orders.filter((order) => {
    const matchesStatus = status === "all" || order.status === status;
    const text = `#${order.id} ${order.customerName} ${order.productId} ${order.status}`.toLowerCase();
    return matchesStatus && text.includes(query.toLowerCase());
  }), [orders, query, status]);

  const counts = statuses.reduce((next, item) => ({
    ...next,
    [item]: orders.filter((order) => order.status === item).length
  }), {});

  return (
    <section className="order-management">
      <div className="order-hero">
        <div>
          <p className="eyebrow">Order Operations</p>
          <h2>Quản lý đơn hàng và trạng thái xử lý</h2>
          <span>Theo dõi đơn từ lúc tạo đến khi giao hàng, lọc nhanh theo trạng thái và chỉnh sửa thông tin khi cần.</span>
        </div>
        <div className="order-hero-stats">
          <article><ClipboardList size={20} /><strong>{orders.length}</strong><span>Tổng đơn</span></article>
          <article><Truck size={20} /><strong>{counts.DELIVERING ?? 0}</strong><span>Đang giao</span></article>
          <article><PackageCheck size={20} /><strong>{counts.DELIVERED ?? 0}</strong><span>Đã giao</span></article>
        </div>
      </div>

      <div className="order-status-strip">
        <button className={status === "all" ? "active" : ""} type="button" onClick={() => onStatus("all")}>
          Tất cả <strong>{orders.length}</strong>
        </button>
        {statuses.map((item) => (
          <button className={status === item ? "active" : ""} type="button" key={item} onClick={() => onStatus(item)}>
            {item} <strong>{counts[item] ?? 0}</strong>
          </button>
        ))}
      </div>

      {editingOrder && (
        <form className="panel compact-form order-edit-form" onSubmit={onUpdate} key={editingOrder.id}>
          <div className="form-card-head">
            <div className="form-icon">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="eyebrow">Order Editor</p>
              <h3>Sửa đơn #{editingOrder.id}</h3>
            </div>
          </div>
          <input name="id" type="hidden" value={editingOrder.id} />
          <label>
            Khách hàng
            <input name="customerName" placeholder="Khách hàng" defaultValue={editingOrder.customerName} required />
          </label>
          <label>
            Product ID
            <input name="productId" type="number" placeholder="Product ID" defaultValue={editingOrder.productId} required />
          </label>
          <label>
            Số lượng
            <input name="quantity" type="number" placeholder="Số lượng" defaultValue={editingOrder.quantity} required />
          </label>
          <label>
            Trạng thái
            <select name="status" defaultValue={editingOrder.status}>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <button className="primary-button" type="submit"><Save size={18} />Lưu thay đổi</button>
          <button className="secondary-button" type="button" onClick={onCancelEdit}><X size={18} />Hủy</button>
        </form>
      )}

      <div className="toolbar order-toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo mã đơn, khách hàng, sản phẩm" />
        </div>
        <ListFilter size={18} />
        <select value={status} onChange={(event) => onStatus(event.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="order-card-list">
        {filtered.length ? filtered.map((order) => {
          const currentIndex = statuses.indexOf(order.status);

          return (
            <article className="order-admin-card" key={order.id}>
              <div className="order-card-main">
                <div className="order-icon"><ClipboardList size={22} /></div>
                <div>
                  <span>Order #{order.id}</span>
                  <h3>{order.customerName}</h3>
                </div>
              </div>
              <div className="order-card-detail">
                <span><UserRound size={16} /> Product #{order.productId}</span>
                <span><PackageCheck size={16} /> Số lượng {order.quantity}</span>
                <StatusBadge value={order.status} />
              </div>
              <div className="order-progress">
                {statuses.map((item, index) => (
                  <span key={item} className={currentIndex >= index ? "done" : ""} />
                ))}
              </div>
              <div className="button-row table-actions order-actions">
                <button className="secondary-button" type="button" onClick={() => onEdit(order)}>
                  <Edit3 size={16} />
                  Sửa
                </button>
                <button className="secondary-button danger-button" type="button" onClick={() => onDelete(order.id)}>
                  <Trash2 size={16} />
                  Xóa
                </button>
              </div>
            </article>
          );
        }) : <div className="empty-state">Không tìm thấy đơn hàng phù hợp.</div>}
      </div>
    </section>
  );
}
