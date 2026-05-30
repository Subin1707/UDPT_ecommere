import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import CustomerLayout from "../layouts/CustomerLayout.jsx";
import ShipperLayout from "../layouts/ShipperLayout.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import PublicLandingPage from "../pages/auth/PublicLandingPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import { authService } from "../services/authService.js";
import { categoryService } from "../services/categoryService.js";
import { notificationService } from "../services/notificationService.js";
import { orderService } from "../services/orderService.js";
import { productService } from "../services/productService.js";
import { shippingService } from "../services/shippingService.js";
import { useAuth } from "../hooks/useAuth.js";
import {
  ROLES,
  USER_STATUSES,
  landingScreenForRole,
  normalizeProduct,
  routeGroups
} from "../utils/constants.js";
import AdminRoutes from "./AdminRoutes.jsx";
import CustomerRoutes from "./CustomerRoutes.jsx";
import ShipperRoutes from "./ShipperRoutes.jsx";

function titleFor(screen, role) {
  const items = role ? routeGroups[role] ?? [] : [["login", "Đăng nhập"]];
  return items.find(([key]) => key === screen)?.[1] ?? "Dashboard";
}

function canAccess(screen, role) {
  if (!role) return screen === "login";
  return (routeGroups[role] ?? []).some(([key]) => key === screen);
}

export default function AppRoutes() {
  const { currentUser, login, registerCustomer, logout } = useAuth();
  const [screen, setScreen] = useState(currentUser ? landingScreenForRole(currentUser.role) : "login");
  const [authScreen, setAuthScreen] = useState("landing");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [orderStatus, setOrderStatus] = useState("all");
  const [health, setHealth] = useState({});
  const [users, setUsers] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [notice, setNotice] = useState("");

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? products[0] ?? null;
  const selectedDelivery = deliveries.find((item) => item.id === selectedDeliveryId) ?? deliveries[0];

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const categoryName = product.category?.name ?? "";
      const matchesCategory = categoryFilter === "all" || categoryName === categoryFilter;
      return matchesQuery && matchesCategory;
    });

    if (sort === "priceAsc") return [...next].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "priceDesc") return [...next].sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "stock") return [...next].sort((a, b) => Number(b.stock) - Number(a.stock));
    return next;
  }, [categoryFilter, products, query, sort]);

  const deliveryStats = useMemo(() => {
    const delivering = deliveries.filter((item) => ["PICKED_UP", "DELIVERING"].includes(item.status)).length;
    const delivered = deliveries.filter((item) => item.status === "DELIVERED").length;
    return { total: deliveries.length, delivering, delivered };
  }, [deliveries]);

  const events = useMemo(() => notifications.map((event) => ({
    type: event.type,
    message: event.message,
    time: event.createdAt
  })), [notifications]);

  async function refreshData() {
    const results = await Promise.allSettled([
      productService.getAll(),
      categoryService.getAll(),
      orderService.getAll(),
      shippingService.getAll(),
      productService.health(),
      orderService.health(),
      notificationService.health(),
      shippingService.health(),
      fetch("/eureka").then((response) => ({ status: response.ok ? "UP" : "DOWN" })),
      authService.getUsers(),
      notificationService.getAll()
    ]);

    if (results[0].status === "fulfilled") setProducts(results[0].value.map(normalizeProduct));
    if (results[1].status === "fulfilled") setCategories(results[1].value);
    if (results[2].status === "fulfilled") setOrders(results[2].value);
    if (results[3].status === "fulfilled") setDeliveries(results[3].value);
    if (results[9].status === "fulfilled") setUsers(results[9].value);
    if (results[10].status === "fulfilled") setNotifications(results[10].value);

    setHealth({
      product: results[4].status === "fulfilled" ? results[4].value.status : "DOWN",
      order: results[5].status === "fulfilled" ? results[5].value.status : "DOWN",
      notification: results[6].status === "fulfilled" ? results[6].value.status : "DOWN",
      shipping: results[7].status === "fulfilled" ? results[7].value.status : "DOWN",
      eureka: results[8].status === "fulfilled" ? "ACTIVE" : "DOWN",
      kafka: "RUNNING",
      redis: "RUNNING",
      postgres: "RUNNING"
    });
  }

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (!canAccess(screen, currentUser?.role)) {
      setScreen(currentUser ? landingScreenForRole(currentUser.role) : "login");
    }
  }, [currentUser, screen]);

  async function handleLogin(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const user = await login({
        username: String(form.get("username") ?? "").trim(),
        password: String(form.get("password") ?? "").trim(),
        remember: form.get("remember") === "on"
      });
      setUsers(await authService.getUsers());
      setNotice(`Đăng nhập thành công với vai trò ${user.role}.`);
      setScreen(landingScreenForRole(user.role));
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function handleRegisterCustomer(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const user = await registerCustomer({
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        address: form.get("address"),
        username: String(form.get("username") ?? "").trim(),
        password: String(form.get("password") ?? "").trim()
      });
      setUsers(await authService.getUsers());
      setNotice(`Đăng ký thành công với vai trò ${user.role}.`);
      setScreen(landingScreenForRole(user.role));
    } catch (error) {
      setNotice(error.message);
    }
  }

  function handleLogout() {
    logout();
    setNotice("Đã đăng xuất.");
    setScreen("login");
  }

  function requireLoginForPublicProduct() {
    setNotice("Vui lòng đăng nhập để xem chi tiết sản phẩm và đặt hàng.");
    setAuthScreen("login");
  }

  async function createOrder(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order = await orderService.create({
      productId: Number(form.get("productId")),
      quantity: Number(form.get("quantity")),
      customerName: form.get("customerName")
    });
    setNotice(`Đã tạo order #${order.id}. Kafka sẽ gửi sang Notification và Shipping.`);
    await refreshData();
    setScreen("trackOrder");
  }

  async function updateDelivery(id, status) {
    const delivery = await shippingService.updateStatus(id, { status, shipperName: "Tran Van Shipper" });
    setSelectedDeliveryId(delivery.id);
    setNotice(`Delivery #${delivery.id} da cap nhat thanh ${delivery.status}.`);
    await refreshData();
  }

  async function createCategory(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { name: form.get("name"), description: form.get("description") };
    if (editingCategory) {
      await categoryService.update(editingCategory.id, payload);
      setEditingCategory(null);
      setNotice("Đã cập nhật danh mục.");
    } else {
      await categoryService.create(payload);
      setNotice("Đã thêm danh mục.");
    }
    await refreshData();
    event.currentTarget.reset();
  }

  async function deleteCategory(id) {
    if (!confirm("Xóa danh mục này? Các sản phẩm đang dùng danh mục có thể bị ảnh hưởng.")) return;
    await categoryService.delete(id);
    setNotice("Đã xóa danh mục.");
    await refreshData();
  }

  async function createProduct(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      description: form.get("description"),
      price: Number(form.get("price")),
      categoryId: Number(form.get("categoryId")),
      quantity: Number(form.get("quantity")),
      imageUrl: String(form.get("imageUrl") ?? "").trim()
    };

    if (editingProduct) {
      await productService.update(editingProduct.id, {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        categoryId: payload.categoryId,
        imageUrl: payload.imageUrl
      });
      setEditingProduct(null);
      setNotice("Đã cập nhật sản phẩm.");
    } else {
      await productService.create(payload);
      setNotice("Đã thêm sản phẩm.");
    }
    await refreshData();
    event.currentTarget.reset();
  }

  async function deleteProduct(id) {
    if (!confirm("Xóa sản phẩm này?")) return;
    await productService.delete(id);
    setNotice("Đã xóa sản phẩm.");
    await refreshData();
  }

  async function updateOrder(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = Number(form.get("id"));
    await orderService.update(id, {
      customerName: form.get("customerName"),
      productId: Number(form.get("productId")),
      quantity: Number(form.get("quantity")),
      status: form.get("status")
    });
    setEditingOrder(null);
    setNotice("Đã cập nhật đơn hàng.");
    await refreshData();
  }

  async function deleteOrder(id) {
    if (!confirm("Xóa đơn hàng này?")) return;
    await orderService.delete(id);
    setNotice("Đã xóa đơn hàng.");
    await refreshData();
  }

  async function createUser(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await authService.createUser({
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        address: form.get("address"),
        username: String(form.get("username") ?? "").trim(),
        password: String(form.get("password") ?? "").trim(),
        role: form.get("role")
      });
      setUsers(await authService.getUsers());
      setNotice("Đã tạo user thành công.");
      event.currentTarget.reset();
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function toggleUserStatus(user) {
    const nextStatus = user.status === USER_STATUSES.ACTIVE ? USER_STATUSES.LOCKED : USER_STATUSES.ACTIVE;
    await authService.updateUser(user.id, { status: nextStatus });
    setUsers(await authService.getUsers());
    setNotice(`Đã cập nhật ${user.username} thành ${nextStatus}.`);
  }

  async function deleteUser(id) {
    await authService.deleteUser(id);
    setUsers(await authService.getUsers());
    setNotice("Đã xóa user.");
  }

  if (!currentUser) {
    return (
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">ED</div>
            <div><strong>Ecommerce</strong><span>Distributed UI</span></div>
          </div>
        </aside>
        <main className="main">
          {notice && <div className="notice">{notice}</div>}
          {authScreen === "landing" && (
            <PublicLandingPage
              products={products}
              categories={categories}
              onLogin={() => setAuthScreen("login")}
              onRegister={() => setAuthScreen("register")}
              onRequireLogin={requireLoginForPublicProduct}
            />
          )}
          {authScreen === "register" ? (
            <RegisterPage onSubmit={handleRegisterCustomer} onBack={() => setAuthScreen("login")} />
          ) : authScreen === "login" ? (
            <LoginPage onLogin={handleLogin} onRegister={() => setAuthScreen("register")} />
          ) : null}
        </main>
      </div>
    );
  }

  const data = {
    products,
    categories,
    orders,
    deliveries,
    selectedProduct,
    selectedDelivery,
    filteredProducts,
    query,
    categoryFilter,
    sort,
    orderStatus,
    deliveryStats,
    events,
    health,
    users,
    editingCategory,
    editingProduct,
    editingOrder
  };

  const actions = {
    setScreen,
    setQuery,
    setCategoryFilter,
    setSort,
    setOrderStatus,
    createOrder,
    updateDelivery,
    createCategory,
    createProduct,
    editCategory: setEditingCategory,
    editProduct: setEditingProduct,
    cancelCategoryEdit: () => setEditingCategory(null),
    cancelProductEdit: () => setEditingProduct(null),
    editOrder: setEditingOrder,
    cancelOrderEdit: () => setEditingOrder(null),
    deleteCategory,
    deleteProduct,
    updateOrder,
    deleteOrder,
    createUser,
    toggleUserStatus,
    deleteUser,
    openProduct(id) {
      setSelectedProductId(id);
      setScreen("productDetail");
    },
    openDelivery(id) {
      setSelectedDeliveryId(id);
      setScreen("deliveryDetail");
    }
  };

  const Layout = currentUser.role === ROLES.ADMIN ? AdminLayout : currentUser.role === ROLES.SHIPPER ? ShipperLayout : CustomerLayout;
  const content = currentUser.role === ROLES.ADMIN
    ? <AdminRoutes screen={screen} data={data} actions={actions} />
    : currentUser.role === ROLES.SHIPPER
      ? <ShipperRoutes screen={screen} data={data} actions={actions} />
      : <CustomerRoutes screen={screen} data={data} actions={actions} />;

  return (
    <Layout
      screen={screen}
      title={titleFor(screen, currentUser.role)}
      notice={notice}
      onNavigate={setScreen}
      onRefresh={refreshData}
      onLogout={handleLogout}
    >
      {content}
    </Layout>
  );
}
