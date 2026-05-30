export default function DeliveryStatusForm({ delivery, onStatus }) {
  if (!delivery) return <div className="empty-state">Chưa có đơn giao.</div>;

  return (
    <div className="button-row">
      <button className="secondary-button" onClick={() => onStatus(delivery.id, "PICKED_UP")}>Nhận đơn</button>
      <button className="secondary-button" onClick={() => onStatus(delivery.id, "DELIVERING")}>Bắt đầu giao</button>
      <button className="primary-button" onClick={() => onStatus(delivery.id, "DELIVERED")}>Đã giao</button>
    </div>
  );
}
