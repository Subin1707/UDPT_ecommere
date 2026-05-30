import { UserRoundCheck } from "lucide-react";

export default function DeliveryListPage({ deliveries, onSelect, onReceive }) {
  return (
    <section className="list-stack">
      {deliveries.map((delivery) => (
        <article className="row-card" key={delivery.id}>
          <div>
            <strong>Order #{delivery.orderId}</strong>
            <span>{delivery.customerName}</span>
          </div>
          <span className="status-pill">{delivery.status}</span>
          <button className="icon-button" onClick={() => onReceive(delivery.id)} title="Nhận đơn">
            <UserRoundCheck size={18} />
          </button>
          <button className="secondary-button" onClick={() => onSelect(delivery.id)}>Chi tiết</button>
        </article>
      ))}
    </section>
  );
}
