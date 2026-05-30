import { Activity, Bell, ClipboardList, Database, Package, RadioTower, Truck, UsersRound, Zap } from "lucide-react";

const serviceLabels = {
  product: "Product Service",
  order: "Order Service",
  notification: "Notification Service",
  shipping: "Shipping Service"
};

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <article className="stat-card admin-stat-card">
      <div className="stat-icon"><Icon size={22} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}

function ServiceStatus({ name, status }) {
  const ok = ["UP", "RUNNING", "ACTIVE"].includes(status);
  return (
    <div className={`service-row admin-service-row ${ok ? "is-up" : "is-down"}`}>
      <span className="status-dot" />
      <div>
        <strong>{name}</strong>
        <small>{ok ? "Đang hoạt động" : "Cần kiểm tra"}</small>
      </div>
      <em>{status}</em>
    </div>
  );
}

export default function DashboardPage({ products, orders, deliveries, events, health }) {
  const activeServices = ["product", "order", "notification", "shipping"]
    .filter((key) => ["UP", "RUNNING", "ACTIVE"].includes(health[key])).length;
  const latestOrders = orders.slice(-4).reverse();
  const latestProducts = products.slice(-3).reverse();

  return (
    <section className="dashboard-stack admin-dashboard">
      <div className="admin-hero-panel">
        <div>
          <p className="eyebrow">Admin Command Center</p>
          <h2>Điều phối sản phẩm, đơn hàng, giao vận và sự kiện Kafka trong một màn hình.</h2>
          <div className="admin-hero-metrics">
            <span><RadioTower size={16} /> {activeServices}/4 service online</span>
            <span><Database size={16} /> PostgreSQL đồng bộ</span>
            <span><Zap size={16} /> Kafka event tracking</span>
          </div>
        </div>
        <div className="admin-hero-score">
          <Activity size={28} />
          <strong>{Math.round((activeServices / 4) * 100)}%</strong>
          <span>System Health</span>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={Package} label="Tổng sản phẩm" value={products.length} hint="Product Service" />
        <StatCard icon={ClipboardList} label="Tổng đơn hàng" value={orders.length} hint="Order Service" />
        <StatCard icon={Truck} label="Tổng giao hàng" value={deliveries.length} hint="Shipping Service" />
        <StatCard icon={Bell} label="Tổng thông báo" value={events.length} hint="Notification Service" />
      </div>

      <div className="admin-dashboard-grid">
        <section className="panel admin-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Service Status</p>
              <h2>Trạng thái microservices</h2>
            </div>
            <span>Live</span>
          </div>
          <div className="admin-service-list">
            {Object.entries(serviceLabels).map(([key, label]) => (
              <ServiceStatus key={key} name={label} status={health[key] ?? "DOWN"} />
            ))}
          </div>
        </section>

        <section className="panel admin-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Recent Orders</p>
              <h2>Đơn hàng mới</h2>
            </div>
            <span>{orders.length} đơn</span>
          </div>
          <div className="admin-list">
            {latestOrders.length ? latestOrders.map((order) => (
              <article key={order.id} className="admin-list-row">
                <ClipboardList size={18} />
                <div>
                  <strong>Order #{order.id}</strong>
                  <span>{order.customerName} - SL {order.quantity}</span>
                </div>
                <em>{order.status}</em>
              </article>
            )) : <div className="empty-state">Chưa có đơn hàng.</div>}
          </div>
        </section>

        <section className="panel admin-panel admin-wide-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Catalog Snapshot</p>
              <h2>Sản phẩm mới nhất</h2>
            </div>
            <span>{products.length} sản phẩm</span>
          </div>
          <div className="admin-product-strip">
            {latestProducts.length ? latestProducts.map((product) => (
              <article key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.category?.name ?? "Chưa phân loại"}</span>
                </div>
              </article>
            )) : <div className="empty-state">Chưa có sản phẩm.</div>}
          </div>
        </section>

        <section className="panel admin-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Operations</p>
              <h2>Luồng vận hành</h2>
            </div>
            <span>Kafka</span>
          </div>
          <div className="admin-flow">
            <span><UsersRound size={16} /> Customer</span>
            <span>Order</span>
            <span>Kafka</span>
            <span>Shipping</span>
          </div>
        </section>
      </div>
    </section>
  );
}
