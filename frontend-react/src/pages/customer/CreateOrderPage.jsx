import CreateOrderForm from "../../components/order/CreateOrderForm.jsx";

export default function CreateOrderPage({ products, selectedProduct, selectedQuantity, customerName, onSubmit }) {
  return (
    <CreateOrderForm
      products={products}
      selectedProduct={selectedProduct}
      selectedQuantity={selectedQuantity}
      customerName={customerName}
      onSubmit={onSubmit}
    />
  );
}
