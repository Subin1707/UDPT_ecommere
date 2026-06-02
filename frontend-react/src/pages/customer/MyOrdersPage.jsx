import OrderTable from "../../components/order/OrderTable.jsx";

export default function MyOrdersPage({ orders, deliveries, products }) {
  return <OrderTable orders={orders} deliveries={deliveries} products={products} />;
}
