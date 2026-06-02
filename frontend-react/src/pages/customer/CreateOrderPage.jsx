import CreateOrderForm from "../../components/order/CreateOrderForm.jsx";

export default function CreateOrderPage({ products, selectedProduct, selectedQuantity, onSubmit }) {
  return (
    <CreateOrderForm
      products={products}
      selectedProduct={selectedProduct}
      selectedQuantity={selectedQuantity}
      onSubmit={onSubmit}
    />
  );
}
