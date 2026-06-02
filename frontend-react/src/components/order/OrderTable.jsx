import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  LocateFixed,
  MapPin,
  PackageCheck,
  Search,
  Truck
} from "lucide-react";
import { useMemo, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { formatDate } from "../../utils/formatDate.js";
import MiniMap from "../shipping/MiniMap.jsx";

const statuses = ["CREATED", "ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"];

const statusLabels = {
  CREATED: "Đã tạo đơn",
  ASSIGNED: "Đã phân công",
  PICKED_UP: "Đã lấy hàng",
  DELIVERING: "Đang giao",
  DELIVERED: "Đã giao"
};

const statusDescriptions = {
  CREATED: "Đơn đã được ghi nhận trong Order Service.",
  ASSIGNED: "Shipping Service đã tạo phiếu giao.",
  PICKED_UP: "Shipper đã nhận hàng từ kho.",
  DELIVERING: "Đơn đang trên đường giao tới khách.",
  DELIVERED: "Đơn đã giao thành công."
};

function findDelivery(order, deliveries) {
  return deliveries.find((item) => Number(item.orderId) === Number(order.id));
}

function currentStatus(order, deliveries) {
  const delivery = findDelivery(order, deliveries);
  return delivery?.status ?? order.status;
}

function TrackingBadge({ status }) {
  return <span className={`tracking-status-badge status-${String(status).toLowerCase()}`}>{statusLabels[status] ?? status}</span>;
}

export default function OrderTable({ orders, deliveries = [], products = [] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const enrichedOrders = useMemo(() => orders.map((order) => {
    const product = products.find((item) => Number(item.id) === Number(order.productId));

    return {
      ...order,
      product,
      delivery: findDelivery(order, deliveries),
      trackingStatus: currentStatus(order, deliveries)
    };
  }), [deliveries, orders, products]);

  const filtered = useMemo(() => enrichedOrders.filter((order) => {
    const matchesStatus = status === "all" || order.trackingStatus === status;
    const searchableText = [
      `#${order.id}`,
      order.productId,
      order.product?.name,
      order.product?.category?.name,
      order.quantity,
      order.trackingStatus,
      statusLabels[order.trackingStatus]
    ].filter(Boolean).join(" ").toLowerCase();

    return matchesStatus && searchableText.includes(query.toLowerCase());
  }), [enrichedOrders, query, status]);

  const selectedOrder = enrichedOrders.find((order) => Number(order.id) === Number(selectedOrderId)) ?? filtered[0] ?? enrichedOrders[0];
  const selectedDelivery = selectedOrder?.delivery;
  const delivered = enrichedOrders.filter((order) => order.trackingStatus === "DELIVERED").length;
  const inTransit = enrichedOrders.filter((order) => ["PICKED_UP", "DELIVERING"].includes(order.trackingStatus)).length;

  return (
    <section className="tracking-page">
      <div className="tracking-hero">
        <div>
          <p className="eyebrow">Order Tracking</p>
          <h2>Theo dõi hành trình đơn hàng</h2>
          <span>Kiểm tra món hàng, số lượng, trạng thái giao và vị trí shipper theo từng đơn.</span>
        </div>
        <div className="tracking-hero-stats">
          <article><ClipboardList size={20} /><strong>{orders.length}</strong><span>Tổng đơn</span></article>
          <article><Truck size={20} /><strong>{inTransit}</strong><span>Đang vận chuyển</span></article>
          <article><CheckCircle2 size={20} /><strong>{delivered}</strong><span>Đã giao</span></article>
        </div>
      </div>

      <div className="tracking-toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo mã đơn, tên sản phẩm, danh mục, trạng thái" />
        </div>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          {statuses.map((item) => <option key={item} value={item}>{statusLabels[item]}</option>)}
        </select>
      </div>

      <div className="tracking-map-layout">
        <div className="tracking-card-list">
          {filtered.length ? filtered.map((order) => {
            const currentIndex = Math.max(0, statuses.indexOf(order.trackingStatus));
            const isSelected = Number(order.id) === Number(selectedOrder?.id);
            const productName = order.product?.name ?? `Product #${order.productId}`;
            const productImage = order.product?.image;
            const productPrice = Number(order.product?.price ?? 0);
            const quantity = Number(order.quantity ?? 0);
            const orderTotal = productPrice * quantity;
            const progress = ((currentIndex + 1) / statuses.length) * 100;

            return (
              <article className={`tracking-card ${isSelected ? "selected" : ""}`} key={order.id}>
                <div className="tracking-card-main">
                  <div className="tracking-order-icon">
                    <ClipboardList size={22} />
                  </div>
                  <div>
                    <span>Order ID</span>
                    <h3>#{order.id}</h3>
                    <small>{formatDate(order.createdAt)}</small>
                  </div>
                </div>

                <div className="tracking-product-card">
                  {productImage ? (
                    <img src={productImage} alt={productName} />
                  ) : (
                    <div className="tracking-product-placeholder">
                      <PackageCheck size={22} />
                    </div>
                  )}
                  <div>
                    <span>{order.product?.category?.name ?? "Sản phẩm"}</span>
                    <strong>{productName}</strong>
                    <small>{productPrice ? `${formatCurrency(productPrice)} x ${quantity}` : `Mã sản phẩm #${order.productId}`}</small>
                  </div>
                  {productPrice ? <b>{formatCurrency(orderTotal)}</b> : null}
                </div>

                <div className="tracking-status-panel">
                  <TrackingBadge status={order.trackingStatus} />
                  <strong>{statusDescriptions[order.trackingStatus] ?? "Đang cập nhật trạng thái."}</strong>
                  <span>Tiến độ {Math.round(progress)}%</span>
                  <i><b style={{ width: `${progress}%` }} /></i>
                </div>

                <div className="tracking-info-grid">
                  <span><PackageCheck size={16} />{productName}</span>
                  <span><ClipboardList size={16} />Số lượng {quantity}</span>
                  <span><Clock3 size={16} />{formatDate(order.createdAt)}</span>
                </div>

                <div className="tracking-timeline">
                  {statuses.map((item, index) => (
                    <div className={currentIndex >= index ? "done" : ""} key={item}>
                      <i />
                      <span>{statusLabels[item]}</span>
                    </div>
                  ))}
                </div>

                <button className="secondary-button tracking-map-button" type="button" onClick={() => setSelectedOrderId(order.id)}>
                  <MapPin size={16} />
                  Xem bản đồ giao hàng
                </button>
              </article>
            );
          }) : <div className="empty-state">Không tìm thấy đơn hàng phù hợp.</div>}
        </div>

        <aside className="panel tracking-map-panel">
          <div className="tracking-map-head">
            <div>
              <p className="eyebrow">Live Map</p>
              <h3>{selectedOrder ? `Order #${selectedOrder.id}` : "Chưa chọn đơn"}</h3>
              {selectedOrder?.product && (
                <strong className="tracking-map-product-name">
                  {selectedOrder.product.name} - SL {selectedOrder.quantity}
                </strong>
              )}
              <span>
                {selectedDelivery
                  ? `Shipper: ${selectedDelivery.shipperLat ?? 21.0285}, ${selectedDelivery.shipperLng ?? 105.8542}`
                  : "Đơn này chưa có delivery, hệ thống sẽ hiển thị vị trí mặc định."}
              </span>
            </div>
            <TrackingBadge status={selectedOrder?.trackingStatus ?? "CREATED"} />
          </div>

          <MiniMap delivery={selectedDelivery} />

          <div className="tracking-map-summary">
            <span><LocateFixed size={16} />Shipper đang di chuyển</span>
            <span><MapPin size={16} />Điểm giao của khách hàng</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
