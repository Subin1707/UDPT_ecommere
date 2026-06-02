import { Activity, CheckCircle2, ClipboardList, Clock3, MapPin, PackageCheck, Route, Truck, UserRoundCheck } from "lucide-react";

const activeStatuses = ["ASSIGNED", "PICKED_UP", "DELIVERING"];

function DeliveryStatus({ status }) {
  return <span className={`shipper-dash-status status-${String(status).toLowerCase()}`}>{status}</span>;
}

function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="shipper-dash-stat">
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export default function ShipperDashboardPage({ stats, deliveries = [] }) {
  const activeDeliveries = deliveries.filter((delivery) => activeStatuses.includes(delivery.status));
  const nextDeliveries = activeDeliveries.slice(0, 4);
  const completionRate = stats.total ? Math.round((stats.delivered / stats.total) * 100) : 0;

  return (
    <section className="shipper-dashboard">
      <div className="shipper-dashboard-hero">
        <div>
          <p className="eyebrow">Shipper Workspace</p>
          <h2>Điều phối ca giao hàng trong ngày</h2>
          <span>Theo dõi đơn đang giao, tiến độ hoàn tất và các đơn cần ưu tiên xử lý.</span>
        </div>
        <div className="shipper-shift-card">
          <Truck size={28} />
          <strong>{completionRate}%</strong>
          <span>Tỷ lệ hoàn tất</span>
        </div>
      </div>

      <div className="shipper-dash-stat-grid">
        <StatCard icon={Truck} label="Tổng đơn giao" value={stats.total} detail="Delivery records" />
        <StatCard icon={Activity} label="Đang giao" value={stats.delivering} detail="PICKED_UP / DELIVERING" />
        <StatCard icon={CheckCircle2} label="Đã giao" value={stats.delivered} detail="Hoàn tất giao hàng" />
        <StatCard icon={Clock3} label="Cần xử lý" value={activeDeliveries.length} detail="Đơn còn trong luồng giao" />
      </div>

      <div className="shipper-dashboard-grid">
        <section className="shipper-route-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Priority Queue</p>
              <h2>Đơn cần xử lý</h2>
            </div>
            <span>{nextDeliveries.length} đơn</span>
          </div>

          <div className="shipper-priority-list">
            {nextDeliveries.length ? nextDeliveries.map((delivery) => (
              <article className="shipper-priority-card" key={delivery.id}>
                <div className="shipper-priority-icon">
                  <PackageCheck size={20} />
                </div>
                <div>
                  <span>Order #{delivery.orderId}</span>
                  <h3>{delivery.customerName}</h3>
                  <p><MapPin size={15} />Product #{delivery.productId} - Số lượng {delivery.quantity}</p>
                </div>
                <DeliveryStatus status={delivery.status} />
              </article>
            )) : <div className="empty-state">Hiện không có đơn giao cần xử lý.</div>}
          </div>
        </section>

        <aside className="shipper-route-summary">
          <div>
            <p className="eyebrow">Route Signal</p>
            <h3>Tổng quan tuyến giao</h3>
          </div>
          <div className="shipper-route-steps">
            <span className="done"><ClipboardList size={17} />ASSIGNED</span>
            <span className={stats.delivering ? "done" : ""}><UserRoundCheck size={17} />PICKED_UP</span>
            <span className={stats.delivering ? "done" : ""}><Route size={17} />DELIVERING</span>
            <span className={stats.delivered ? "done" : ""}><CheckCircle2 size={17} />DELIVERED</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
