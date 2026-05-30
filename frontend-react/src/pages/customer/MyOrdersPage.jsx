import OrderTable from "../../components/order/OrderTable.jsx";

export default function MyOrdersPage({ orders, deliveries }) {
  return <OrderTable orders={orders} deliveries={deliveries} />;
}
