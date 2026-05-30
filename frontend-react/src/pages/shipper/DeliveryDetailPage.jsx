import DataTable from "../../components/common/DataTable.jsx";
import DeliveryStatusForm from "../../components/shipping/DeliveryStatusForm.jsx";

export default function DeliveryDetailPage({ delivery, onStatus }) {
  if (!delivery) return <div className="empty-state">Chưa có đơn giao.</div>;

  return (
    <section className="panel detail-copy">
      <h2>Delivery #{delivery.id}</h2>
      <DataTable
        columns={["Mã đơn", "Tên khách", "Sản phẩm", "Số lượng", "Trạng thái"]}
        rows={[[`#${delivery.orderId}`, delivery.customerName, delivery.productId, delivery.quantity, delivery.status]]}
      />
      <DeliveryStatusForm delivery={delivery} onStatus={onStatus} />
    </section>
  );
}
