import { formatDate } from "../../utils/formatDate.js";
import DataTable from "../common/DataTable.jsx";

export default function OrderTable({ orders, deliveries = [] }) {
  return (
    <DataTable
      columns={["Order ID", "Sản phẩm", "Số lượng", "Ngày tạo", "Trạng thái"]}
      rows={orders.map((order) => {
        const delivery = deliveries.find((item) => item.orderId === order.id);
        return [`#${order.id}`, order.productId, order.quantity, formatDate(order.createdAt), delivery?.status ?? order.status];
      })}
    />
  );
}
