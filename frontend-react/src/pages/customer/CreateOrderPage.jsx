import CreateOrderForm from "../../components/order/CreateOrderForm.jsx";

export default function CreateOrderPage({ products, selectedProduct, onSubmit }) {
  return <CreateOrderForm products={products} selectedProduct={selectedProduct} onSubmit={onSubmit} />;
}
