import DataTable from "../common/DataTable.jsx";

export default function OrderDetail({ order, delivery }) {
  if (!order) return <div className="empty-state">Chưa có đơn hàng.</div>;

  return (
    <DataTable
      columns={["Order ID", "Khách hàng", "Sản phẩm", "Số lượng", "Trạng thái"]}
      rows={[[`#${order.id}`, order.customerName, order.productId, order.quantity, delivery?.status ?? order.status]]}
    />
  );
}
