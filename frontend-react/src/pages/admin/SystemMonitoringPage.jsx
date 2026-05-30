import { Activity, Bell, ClipboardList, Truck } from "lucide-react";

function StatCard({ icon: Icon, label, value }) {
  return (
    <article className="stat-card">
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ServiceStatus({ name, status }) {
  const ok = ["UP", "RUNNING", "ACTIVE"].includes(status);
  return (
    <div className="service-row">
      <span>{name}</span>
      <strong className={ok ? "ok" : "bad"}>{status}</strong>
    </div>
  );
}

export default function SystemMonitoringPage({ health, orders, deliveries, events }) {
  return (
    <section className="monitoring-grid">
      <div className="panel">
        <h3>Service Status</h3>
        <ServiceStatus name="Product Service" status={health.product ?? "DOWN"} />
        <ServiceStatus name="Order Service" status={health.order ?? "DOWN"} />
        <ServiceStatus name="Notification Service" status={health.notification ?? "DOWN"} />
        <ServiceStatus name="Shipping Service" status={health.shipping ?? "DOWN"} />
      </div>
      <div className="panel">
        <h3>Infrastructure</h3>
        <ServiceStatus name="Kafka Broker" status={health.kafka ?? "RUNNING"} />
        <ServiceStatus name="Redis Cache" status={health.redis ?? "RUNNING"} />
        <ServiceStatus name="PostgreSQL" status={health.postgres ?? "RUNNING"} />
        <ServiceStatus name="Eureka Discovery" status={health.eureka ?? "DOWN"} />
      </div>
      <div className="stat-grid wide">
        <StatCard icon={Bell} label="Sự kiện đã phát" value={events.length} />
        <StatCard icon={Activity} label="Sự kiện đã nhận" value={deliveries.length} />
        <StatCard icon={ClipboardList} label="Đơn hàng đã tạo" value={orders.length} />
        <StatCard icon={Truck} label="Giao hàng đã tạo" value={deliveries.length} />
      </div>
    </section>
  );
}
