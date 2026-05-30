import CategoryManagementPage from "../pages/admin/CategoryManagementPage.jsx";
import DashboardPage from "../pages/admin/DashboardPage.jsx";
import NotificationCenterPage from "../pages/admin/NotificationCenterPage.jsx";
import OrderManagementPage from "../pages/admin/OrderManagementPage.jsx";
import ProductManagementPage from "../pages/admin/ProductManagementPage.jsx";
import ShipperManagementPage from "../pages/admin/ShipperManagementPage.jsx";
import SystemMonitoringPage from "../pages/admin/SystemMonitoringPage.jsx";
import UserManagementPage from "../pages/admin/UserManagementPage.jsx";

export default function AdminRoutes({ screen, data, actions }) {
  if (screen === "categories") {
    return (
      <CategoryManagementPage
        categories={data.categories}
        editingCategory={data.editingCategory}
        onCreate={actions.createCategory}
        onEdit={actions.editCategory}
        onDelete={actions.deleteCategory}
        onCancelEdit={actions.cancelCategoryEdit}
      />
    );
  }

  if (screen === "productsAdmin") {
    return (
      <ProductManagementPage
        products={data.products}
        categories={data.categories}
        editingProduct={data.editingProduct}
        onCreate={actions.createProduct}
        onEdit={actions.editProduct}
        onDelete={actions.deleteProduct}
        onCancelEdit={actions.cancelProductEdit}
      />
    );
  }

  if (screen === "ordersAdmin") {
    return (
      <OrderManagementPage
        orders={data.orders}
        status={data.orderStatus}
        editingOrder={data.editingOrder}
        onStatus={actions.setOrderStatus}
        onEdit={actions.editOrder}
        onUpdate={actions.updateOrder}
        onDelete={actions.deleteOrder}
        onCancelEdit={actions.cancelOrderEdit}
      />
    );
  }

  if (screen === "usersAdmin") {
    return (
      <UserManagementPage
        users={data.users}
        onCreate={actions.createUser}
        onToggleStatus={actions.toggleUserStatus}
        onDelete={actions.deleteUser}
      />
    );
  }

  if (screen === "shippersAdmin") {
    return <ShipperManagementPage users={data.users} deliveries={data.deliveries} onCreate={actions.createUser} />;
  }

  if (screen === "notifications") {
    return <NotificationCenterPage events={data.events} />;
  }

  if (screen === "monitoring") {
    return <SystemMonitoringPage health={data.health} orders={data.orders} deliveries={data.deliveries} events={data.events} />;
  }

  return (
    <DashboardPage
      products={data.products}
      orders={data.orders}
      deliveries={data.deliveries}
      events={data.events}
      health={data.health}
    />
  );
}
