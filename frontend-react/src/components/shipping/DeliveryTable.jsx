import DataTable from "../common/DataTable.jsx";

export default function DeliveryTable({ deliveries }) {
  return (
    <DataTable
      columns={["Delivery ID", "Order ID", "Khách hàng", "Số lượng", "Shipper", "Trạng thái"]}
      rows={deliveries.map((delivery) => [
        `#${delivery.id}`,
        `#${delivery.orderId}`,
        delivery.customerName,
        delivery.quantity,
        delivery.shipperName,
        delivery.status
      ])}
    />
  );
}
