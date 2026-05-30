import CreateOrderPage from "../pages/customer/CreateOrderPage.jsx";
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
      />
    );
  }

  if (screen === "productDetail") {
    return <ProductDetailPage product={data.selectedProduct} onOrder={() => actions.setScreen("createOrder")} />;
  }

  if (screen === "createOrder") {
    return <CreateOrderPage products={data.products} selectedProduct={data.selectedProduct} onSubmit={actions.createOrder} />;
  }

  if (screen === "trackOrder") {
    return <MyOrdersPage orders={data.orders} deliveries={data.deliveries} />;
  }

  return (
    <HomePage
      products={data.products}
      categories={data.categories}
      onProduct={actions.openProduct}
      onCatalog={() => actions.setScreen("catalog")}
    />
  );
}
