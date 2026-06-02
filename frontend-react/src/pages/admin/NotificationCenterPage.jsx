import { Bell, BellRing, CheckCircle2, Clock3, Filter, RadioTower, Search, Send, Truck, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { formatDate } from "../../utils/formatDate.js";

const eventTypes = ["ORDER_CREATED", "SHIPPING_ASSIGNED", "ORDER_DELIVERED"];

const eventMeta = {
  ORDER_CREATED: { label: "Đơn hàng mới", icon: Send },
  SHIPPING_ASSIGNED: { label: "Đã điều phối giao hàng", icon: Truck },
  ORDER_DELIVERED: { label: "Giao hàng thành công", icon: CheckCircle2 }
};

function EventBadge({ type }) {
  const Icon = eventMeta[type]?.icon ?? BellRing;

  return (
    <span className={`notification-event-badge event-${String(type).toLowerCase()}`}>
      <Icon size={15} />
      {type}
    </span>
  );
}

export default function NotificationCenterPage({ events }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const normalizedEvents = useMemo(() => events.map((event, index) => ({
    id: `${event.type}-${event.time ?? index}`,
    type: event.type ?? "ORDER_CREATED",
    message: event.message ?? "Sự kiện hệ thống",
    time: event.time ?? new Date().toISOString()
  })), [events]);

  const filtered = useMemo(() => normalizedEvents.filter((event) => {
    const matchesType = type === "all" || event.type === type;
    const text = `${event.type} ${event.message}`.toLowerCase();
    return matchesType && text.includes(query.toLowerCase());
  }), [normalizedEvents, query, type]);

  const counts = eventTypes.reduce((next, item) => ({
    ...next,
    [item]: normalizedEvents.filter((event) => event.type === item).length
  }), {});

  const lastEvent = normalizedEvents[0];

  return (
    <section className="notification-center">
      <div className="notification-hero">
        <div>
          <p className="eyebrow">Kafka Event Center</p>
          <h2>Trung tâm thông báo và luồng sự kiện</h2>
          <span>Quan sát các event quan trọng đi qua hệ thống: tạo đơn, điều phối giao hàng và hoàn tất giao hàng.</span>
        </div>
        <div className="notification-hero-stats">
          <article><BellRing size={20} /><strong>{normalizedEvents.length}</strong><span>Tổng event</span></article>
          <article><RadioTower size={20} /><strong>{eventTypes.length}</strong><span>Topic signal</span></article>
          <article><Clock3 size={20} /><strong>{lastEvent ? formatDate(lastEvent.time) : "Chưa có"}</strong><span>Event gần nhất</span></article>
        </div>
      </div>

      <div className="notification-flow">
        {eventTypes.map((item, index) => {
          const Icon = eventMeta[item]?.icon ?? Bell;

          return (
            <article className="notification-flow-card" key={item}>
              <div className="notification-flow-index">{index + 1}</div>
              <Icon size={22} />
              <div>
                <strong>{item}</strong>
                <span>{eventMeta[item]?.label}</span>
              </div>
              <em>{counts[item] ?? 0}</em>
            </article>
          );
        })}
      </div>

      <div className="toolbar notification-toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo loại event hoặc nội dung thông báo" />
        </div>
        <Filter size={18} />
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="all">Tất cả event</option>
          {eventTypes.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="notification-grid">
        <div className="notification-stream">
          <div className="section-header">
            <div>
              <p className="eyebrow">Live Stream</p>
              <h2>Event timeline</h2>
            </div>
            <span>{filtered.length} bản ghi</span>
          </div>

          {filtered.length ? filtered.map((event) => (
            <article className="notification-event-card" key={event.id}>
              <div className="notification-event-icon">
                <Zap size={20} />
              </div>
              <div>
                <EventBadge type={event.type} />
                <h3>{eventMeta[event.type]?.label ?? event.type}</h3>
                <p>{event.message}</p>
              </div>
              <time>{formatDate(event.time)}</time>
            </article>
          )) : (
            <div className="notification-empty-state">
              <div>
                <BellRing size={34} />
                <h3>Chưa có event nào được ghi nhận</h3>
                <p>Tạo đơn hàng mới để Order Service phát Kafka event, sau đó Notification Service sẽ lưu và hiển thị tại đây.</p>
              </div>
            </div>
          )}
        </div>

        <aside className="notification-side-panel">
          <div>
            <p className="eyebrow">Pipeline</p>
            <h3>Luồng thông báo</h3>
          </div>
          <ol>
            <li><span>Order Service</span><strong>Publish ORDER_CREATED</strong></li>
            <li><span>Kafka Broker</span><strong>Broadcast message</strong></li>
            <li><span>Notification Service</span><strong>Consume và lưu database</strong></li>
            <li><span>Admin UI</span><strong>Hiển thị timeline</strong></li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
