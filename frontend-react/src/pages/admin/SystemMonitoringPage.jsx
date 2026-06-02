import { Activity, Bell, CheckCircle2, ClipboardList, Database, Gauge, RadioTower, Server, ShieldCheck, Truck, Wifi, Zap } from "lucide-react";

const services = [
  ["Product Service", "product", "Catalog, inventory, category"],
  ["Order Service", "order", "Order API, Kafka publisher"],
  ["Notification Service", "notification", "Kafka consumer, event store"],
  ["Shipping Service", "shipping", "Delivery workflow"]
];

const infrastructure = [
  ["Kafka Broker", "kafka", "Event streaming"],
  ["Redis Cache", "redis", "Cache layer"],
  ["PostgreSQL", "postgres", "Primary database"],
  ["Eureka Discovery", "eureka", "Service registry"]
];

function isHealthy(status) {
  return ["UP", "RUNNING", "ACTIVE"].includes(status) || String(status).endsWith(" UP");
}

function StatusBadge({ status }) {
  const ok = isHealthy(status);

  return (
    <span className={`monitoring-status ${ok ? "ok" : "bad"}`}>
      {ok ? <CheckCircle2 size={15} /> : <Activity size={15} />}
      {status}
    </span>
  );
}

function HealthCard({ item, health, type }) {
  const [name, key, description] = item;
  const status = health[key] ?? (type === "infra" ? "RUNNING" : "DOWN");
  const ok = isHealthy(status);

  return (
    <article className={`monitoring-health-card ${ok ? "is-up" : "is-down"}`}>
      <div className="monitoring-health-icon">
        {type === "infra" ? <Database size={22} /> : <Server size={22} />}
      </div>
      <div>
        <h3>{name}</h3>
        <span>{description}</span>
      </div>
      <StatusBadge status={status} />
      <div className="monitoring-signal">
        <span style={{ width: ok ? "100%" : "24%" }} />
      </div>
    </article>
  );
}

function MetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="monitoring-metric-card">
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export default function SystemMonitoringPage({ health, orders, deliveries, events }) {
  const allNodes = [...services, ...infrastructure];
  const healthyCount = allNodes.filter(([, key]) => isHealthy(health[key] ?? (infrastructure.some((item) => item[1] === key) ? "RUNNING" : "DOWN"))).length;
  const healthPercent = Math.round((healthyCount / allNodes.length) * 100);

  return (
    <section className="system-monitoring">
      <div className="monitoring-hero">
        <div>
          <p className="eyebrow">Distributed System Control Room</p>
          <h2>Giám sát sức khỏe toàn bộ hệ thống microservices</h2>
          <span>Theo dõi service, hạ tầng, Kafka event và dữ liệu vận hành trong cùng một màn hình.</span>
        </div>
        <div className="monitoring-score">
          <strong>{healthPercent}%</strong>
          <span>System Health</span>
        </div>
      </div>

      <div className="monitoring-metric-grid">
        <MetricCard icon={Bell} label="Sự kiện đã phát" value={events.length} detail="Notification events" />
        <MetricCard icon={Activity} label="Sự kiện đã nhận" value={deliveries.length} detail="Shipping consumed" />
        <MetricCard icon={ClipboardList} label="Đơn hàng đã tạo" value={orders.length} detail="Order Service records" />
        <MetricCard icon={Truck} label="Giao hàng đã tạo" value={deliveries.length} detail="Shipping Service records" />
      </div>

      <div className="monitoring-layout">
        <section className="monitoring-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Service Status</p>
              <h2>Microservices</h2>
            </div>
            <StatusBadge status={`${services.filter(([, key]) => isHealthy(health[key] ?? "DOWN")).length}/${services.length} UP`} />
          </div>
          <div className="monitoring-health-grid">
            {services.map((item) => <HealthCard key={item[1]} item={item} health={health} type="service" />)}
          </div>
        </section>

        <section className="monitoring-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Infrastructure</p>
              <h2>Nền tảng hệ thống</h2>
            </div>
            <StatusBadge status="ACTIVE" />
          </div>
          <div className="monitoring-health-grid">
            {infrastructure.map((item) => <HealthCard key={item[1]} item={item} health={health} type="infra" />)}
          </div>
        </section>
      </div>

      <div className="monitoring-bottom-grid">
        <article className="monitoring-pipeline-card">
          <div>
            <p className="eyebrow">Kafka Statistics</p>
            <h3>Luồng sự kiện hiện tại</h3>
          </div>
          <div className="monitoring-pipeline">
            <span><ClipboardList size={18} /> Order</span>
            <i />
            <span><RadioTower size={18} /> Kafka</span>
            <i />
            <span><Bell size={18} /> Notification</span>
            <i />
            <span><Truck size={18} /> Shipping</span>
          </div>
        </article>

        <article className="monitoring-runtime-card">
          <div>
            <p className="eyebrow">Runtime Signal</p>
            <h3>Trạng thái vận hành</h3>
          </div>
          <div className="monitoring-runtime-list">
            <span><Wifi size={17} /> API gateway routes ready</span>
            <span><ShieldCheck size={17} /> Role-based UI active</span>
            <span><Zap size={17} /> Kafka online indicator enabled</span>
            <span><Gauge size={17} /> Health polling available</span>
          </div>
        </article>
      </div>
    </section>
  );
}
