import CreateOrderPage from "../pages/customer/CreateOrderPage.jsx";
import CartPage from "../pages/customer/CartPage.jsx";
import HomePage from "../pages/customer/HomePage.jsx";
import MyOrdersPage from "../pages/customer/MyOrdersPage.jsx";
import ProductDetailPage from "../pages/customer/ProductDetailPage.jsx";
import ProductListPage from "../pages/customer/ProductListPage.jsx";

export default function CustomerRoutes({ screen, data, actions }) {
  if (screen === "catalog") {
    return (
      <ProductListPage
        products={data.filteredProducts}
        categories={data.categories}
        query={data.query}
        categoryFilter={data.categoryFilter}
        sort={data.sort}
        onQuery={actions.setQuery}
        onCategory={actions.setCategoryFilter}
        onSort={actions.setSort}
        onProduct={actions.openProduct}
        onAddToCart={actions.addToCart}
      />
    );
  }

  if (screen === "productDetail") {
    return (
      <ProductDetailPage
        product={data.selectedProduct}
        onOrder={() => actions.startOrder(data.selectedProduct?.id, 1)}
        onAddToCart={actions.addToCart}
      />
    );
  }

  if (screen === "cart") {
    return (
      <CartPage
        items={data.cartProducts}
        onIncrease={actions.increaseCartItem}
        onDecrease={actions.decreaseCartItem}
        onRemove={actions.removeCartItem}
        onCheckout={actions.checkoutCartItem}
        onCatalog={actions.openCatalogAll}
      />
    );
  }

  if (screen === "createOrder") {
    return (
      <CreateOrderPage
        products={data.products}
        selectedProduct={data.selectedProduct}
        selectedQuantity={data.selectedOrderQuantity}
        onSubmit={actions.createOrder}
      />
    );
  }

  if (screen === "trackOrder") {
    return <MyOrdersPage orders={data.orders} deliveries={data.deliveries} products={data.products} />;
  }

  return (
    <HomePage
      products={data.products}
      categories={data.categories}
      onProduct={actions.openProduct}
      onAddToCart={actions.addToCart}
      onCatalog={actions.openCatalogAll}
      onCategory={actions.openCatalogByCategory}
    />
  );
}
