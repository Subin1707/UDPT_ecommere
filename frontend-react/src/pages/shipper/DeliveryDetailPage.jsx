import { CheckCircle2, ClipboardList, LocateFixed, MapPin, PackageCheck, Phone, Route, Truck, UserRound } from "lucide-react";
import MiniMap from "../../components/shipping/MiniMap.jsx";
import DeliveryStatusForm from "../../components/shipping/DeliveryStatusForm.jsx";

const statuses = ["ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"];

function DeliveryBadge({ status }) {
  return <span className={`delivery-detail-badge status-${String(status).toLowerCase()}`}>{status}</span>;
}

export default function DeliveryDetailPage({ delivery, onStatus, onLocation }) {
  if (!delivery) return <div className="empty-state">Chưa có đơn giao.</div>;

  const currentIndex = statuses.indexOf(delivery.status);

  function simulateLocationUpdate() {
    const currentLat = Number(delivery.shipperLat ?? 21.0285);
    const currentLng = Number(delivery.shipperLng ?? 105.8542);
    onLocation(delivery.id, {
      shipperLat: Number((currentLat + 0.0011).toFixed(6)),
      shipperLng: Number((currentLng - 0.0010).toFixed(6))
    });
  }

  return (
    <section className="delivery-detail-page">
      <div className="delivery-detail-hero">
        <div>
          <p className="eyebrow">Delivery Detail</p>
          <h2>Delivery #{delivery.id}</h2>
          <span>Xử lý đơn giao, cập nhật trạng thái, vị trí shipper và theo dõi tuyến đường đến khách hàng.</span>
        </div>
        <DeliveryBadge status={delivery.status} />
      </div>

      <div className="delivery-detail-grid">
        <section className="delivery-detail-main panel">
          <div className="delivery-detail-head">
            <div className="delivery-detail-icon">
              <Truck size={24} />
            </div>
            <div>
              <p className="eyebrow">Order #{delivery.orderId}</p>
              <h3>{delivery.customerName}</h3>
            </div>
          </div>

          <div className="delivery-detail-info-grid">
            <article><ClipboardList size={19} /><span>Mã đơn</span><strong>#{delivery.orderId}</strong></article>
            <article><UserRound size={19} /><span>Tên khách</span><strong>{delivery.customerName}</strong></article>
            <article><PackageCheck size={19} /><span>Sản phẩm</span><strong>#{delivery.productId}</strong></article>
            <article><Route size={19} /><span>Số lượng</span><strong>{delivery.quantity}</strong></article>
          </div>

          <div className="delivery-detail-contact">
            <span><MapPin size={17} />Tọa độ khách hàng: {delivery.customerLat ?? 21.0350}, {delivery.customerLng ?? 105.8340}</span>
            <span><Phone size={17} />Liên hệ khách hàng trước khi giao nếu cần xác nhận.</span>
          </div>

          <DeliveryStatusForm delivery={delivery} onStatus={onStatus} />
        </section>

        <aside className="delivery-progress-panel">
          <div>
            <p className="eyebrow">Progress</p>
            <h3>Tiến độ giao hàng</h3>
          </div>
          <div className="delivery-detail-timeline">
            {statuses.map((status, index) => (
              <div className={currentIndex >= index ? "done" : ""} key={status}>
                <i>{currentIndex >= index ? <CheckCircle2 size={16} /> : index + 1}</i>
                <span>{status}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="panel delivery-map-panel">
        <div className="delivery-map-head">
          <div>
            <p className="eyebrow">Live Route</p>
            <h3>Mini map tuyến giao hàng</h3>
            <span>Shipper: {delivery.shipperLat ?? 21.0285}, {delivery.shipperLng ?? 105.8542}</span>
          </div>
          <button className="secondary-button" type="button" onClick={simulateLocationUpdate}>
            <LocateFixed size={17} />
            Giả lập cập nhật vị trí
          </button>
        </div>
        <MiniMap delivery={delivery} />
      </section>
    </section>
  );
}
