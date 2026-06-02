import { ClipboardList, Clock3, Filter, MapPin, PackageCheck, Search, Truck, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";

const statuses = ["ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"];

function DeliveryBadge({ status }) {
  return <span className={`delivery-list-badge status-${String(status).toLowerCase()}`}>{status}</span>;
}

export default function DeliveryListPage({ deliveries, onSelect, onReceive }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => deliveries.filter((delivery) => {
    const matchesStatus = status === "all" || delivery.status === status;
    const text = `#${delivery.orderId} ${delivery.customerName} ${delivery.productId} ${delivery.status}`.toLowerCase();
    return matchesStatus && text.includes(query.toLowerCase());
  }), [deliveries, query, status]);

  const assigned = deliveries.filter((delivery) => delivery.status === "ASSIGNED").length;
  const delivering = deliveries.filter((delivery) => ["PICKED_UP", "DELIVERING"].includes(delivery.status)).length;
  const delivered = deliveries.filter((delivery) => delivery.status === "DELIVERED").length;

  return (
    <section className="delivery-list-page">
      <div className="delivery-list-hero">
        <div>
          <p className="eyebrow">Dispatch Queue</p>
          <h2>Danh sách đơn giao cần xử lý</h2>
          <span>Nhận đơn, xem chi tiết giao hàng và theo dõi các trạng thái vận chuyển trong ngày.</span>
        </div>
        <div className="delivery-list-stats">
          <article><ClipboardList size={20} /><strong>{assigned}</strong><span>Chờ nhận</span></article>
          <article><Truck size={20} /><strong>{delivering}</strong><span>Đang giao</span></article>
          <article><PackageCheck size={20} /><strong>{delivered}</strong><span>Đã giao</span></article>
        </div>
      </div>

      <div className="delivery-list-toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo order, khách hàng, sản phẩm" />
        </div>
        <Filter size={18} />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="delivery-list-grid">
        {filtered.length ? filtered.map((delivery) => (
          <article className="delivery-list-card" key={delivery.id}>
            <div className="delivery-card-head">
              <div className="delivery-card-icon">
                <Truck size={22} />
              </div>
              <div>
                <span>Order #{delivery.orderId}</span>
                <h3>{delivery.customerName}</h3>
              </div>
              <DeliveryBadge status={delivery.status} />
            </div>

            <div className="delivery-card-info">
              <span><PackageCheck size={16} />Product #{delivery.productId}</span>
              <span><ClipboardList size={16} />Số lượng {delivery.quantity}</span>
              <span><MapPin size={16} />Shipper: {delivery.shipperName || "UNASSIGNED"}</span>
              <span><Clock3 size={16} />Delivery #{delivery.id}</span>
            </div>

            <div className="delivery-card-actions">
              <button className="secondary-button" onClick={() => onReceive(delivery.id)} disabled={delivery.status === "DELIVERED"}>
                <UserRoundCheck size={18} />
                {delivery.status === "ASSIGNED" ? "Nhận đơn" : "Cập nhật nhận"}
              </button>
              <button className="primary-button" onClick={() => onSelect(delivery.id)}>
                Chi tiết
              </button>
            </div>
          </article>
        )) : <div className="empty-state">Không tìm thấy đơn giao phù hợp.</div>}
      </div>
    </section>
  );
}
