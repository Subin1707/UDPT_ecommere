import {
  Activity,
  Bell,
  Boxes,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Gauge,
  Home,
  LayoutDashboard,
  ListFilter,
  Lock,
  LogIn,
  LogOut,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Truck,
  User,
  UserRoundCheck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const money = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

const defaultProducts = [
  {
    id: 1,
    name: "Laptop Dell",
    description: "Laptop cho sinh vien va van phong",
    price: 15000000,
    stock: 10,
    quantity: 10,
    category: { id: 1, name: "Laptop" },
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Headphone Studio",
    description: "Tai nghe khong day chong on",
    price: 1890000,
    stock: 24,
    quantity: 24,
    category: { id: 2, name: "Audio" },
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Ban phim co",
    description: "Switch tactile, led trang",
    price: 1290000,
    stock: 18,
    quantity: 18,
    category: { id: 3, name: "Accessory" },
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Smart Watch",
    description: "Theo doi suc khoe va thong bao",
    price: 2490000,
    stock: 12,
    quantity: 12,
    category: { id: 4, name: "Wearable" },
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
  }
];

const defaultCategories = [
  { id: 1, name: "Laptop", description: "May tinh xach tay" },
  { id: 2, name: "Audio", description: "Thiet bi am thanh" },
  { id: 3, name: "Accessory", description: "Phu kien cong nghe" },
  { id: 4, name: "Wearable", description: "Thiet bi deo thong minh" }
];

const navGroups = [
  {
    label: "Customer",
    items: [
      ["login", "Dang nhap", LogIn],
      ["home", "Trang chu", Home],
      ["catalog", "San pham", ShoppingBag],
      ["productDetail", "Chi tiet", Package],
      ["createOrder", "Dat hang", ClipboardList],
      ["trackOrder", "Theo doi don", CheckCircle2]
    ]
  },
  {
    label: "Shipper",
    items: [
      ["shipperDashboard", "Dashboard", Gauge],
      ["deliveryList", "Don giao", Truck],
      ["deliveryDetail", "Chi tiet giao", UserRoundCheck]
    ]
  },
  {
    label: "Admin",
    items: [
      ["adminDashboard", "Admin", LayoutDashboard],
      ["categories", "Danh muc", Boxes],
      ["productsAdmin", "San pham", Package],
      ["ordersAdmin", "Don hang", ClipboardList],
      ["notifications", "Thong bao", Bell]
    ]
  },
  {
    label: "Monitoring",
    items: [["monitoring", "System Monitoring", Activity]]
  }
];

async function request(path, options) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function normalizeProduct(product) {
  return {
    ...product,
    stock: product.stock ?? product.quantity ?? product.inventoryQuantity ?? 0,
    image: product.image ?? product.images?.[0]?.url ?? defaultProducts[(product.id - 1) % defaultProducts.length]?.image
  };
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("ecommerce-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [screen, setScreen] = useState(() => {
    const saved = localStorage.getItem("ecommerce-user");
    return saved ? "home" : "login";
  });
  const [products, setProducts] = useState(defaultProducts);
  const [categories, setCategories] = useState(defaultCategories);
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [health, setHealth] = useState({});
  const [notice, setNotice] = useState("");

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? products[0];
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

  const events = useMemo(() => {
    const orderEvents = orders.slice(-4).map((order) => ({
      type: "ORDER_CREATED",
      message: `Order #${order.id} created for ${order.customerName}`,
      time: order.createdAt
    }));
    const deliveryEvents = deliveries.slice(-4).map((delivery) => ({
      type: delivery.status === "DELIVERED" ? "ORDER_DELIVERED" : "SHIPPING_ASSIGNED",
      message: `Delivery #${delivery.id} for order #${delivery.orderId} is ${delivery.status}`,
      time: delivery.updatedAt ?? delivery.createdAt
    }));
    return [...orderEvents, ...deliveryEvents].slice(-8).reverse();
  }, [deliveries, orders]);

  async function refreshData() {
    const results = await Promise.allSettled([
      request("/api/products"),
      request("/api/categories"),
      request("/api/orders"),
      request("/api/deliveries"),
      request("/health/product"),
      request("/health/order"),
      request("/health/notification"),
      request("/health/shipping"),
      fetch("/eureka").then((response) => ({ status: response.ok ? "UP" : "DOWN" }))
    ]);

    if (results[0].status === "fulfilled") {
      setProducts(results[0].value.map(normalizeProduct));
    }
    if (results[1].status === "fulfilled") setCategories(results[1].value);
    if (results[2].status === "fulfilled") setOrders(results[2].value);
    if (results[3].status === "fulfilled") setDeliveries(results[3].value);
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

  async function createOrder(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = {
      productId: Number(form.get("productId")),
      quantity: Number(form.get("quantity")),
      customerName: form.get("customerName")
    };

    const order = await request("/api/orders", {
      method: "POST",
      body: JSON.stringify(body)
    });
    setNotice(`Da tao order #${order.id}. Kafka se gui sang Notification va Shipping.`);
    await refreshData();
    setScreen("trackOrder");
  }

  async function updateDelivery(id, status) {
    const delivery = await request(`/api/deliveries/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, shipperName: "Tran Van Shipper" })
    });
    setSelectedDeliveryId(delivery.id);
    setNotice(`Delivery #${delivery.id} da cap nhat thanh ${delivery.status}.`);
    await refreshData();
  }

  function handleLogin(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "").trim();
    const password = String(form.get("password") ?? "").trim();
    const remember = form.get("remember") === "on";

    if (!username || !password) {
      setNotice("Vui long nhap username va password.");
      return;
    }

    const user = {
      username,
      displayName: username,
      role: username.toLowerCase().includes("admin")
        ? "ADMIN"
        : username.toLowerCase().includes("shipper")
          ? "SHIPPER"
          : "CUSTOMER"
    };

    if (remember) {
      localStorage.setItem("ecommerce-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ecommerce-user");
    }

    setCurrentUser(user);
    setNotice(`Dang nhap thanh cong voi vai tro ${user.role}.`);
    setScreen(user.role === "ADMIN" ? "adminDashboard" : user.role === "SHIPPER" ? "shipperDashboard" : "home");
  }

  function handleLogout() {
    localStorage.removeItem("ecommerce-user");
    setCurrentUser(null);
    setNotice("Da dang xuat.");
    setScreen("login");
  }

  function createCategory(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    request("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        description: form.get("description")
      })
    }).then(refreshData);
    event.currentTarget.reset();
  }

  function createProduct(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    request("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        description: form.get("description"),
        price: Number(form.get("price")),
        categoryId: Number(form.get("categoryId")),
        quantity: Number(form.get("quantity"))
      })
    }).then(refreshData);
    event.currentTarget.reset();
  }

  const screens = {
    login: <LoginScreen onLogin={handleLogin} />,
    home: (
      <HomeScreen
        products={products}
        categories={categories}
        onProduct={(id) => {
          setSelectedProductId(id);
          setScreen("productDetail");
        }}
        onCatalog={() => setScreen("catalog")}
      />
    ),
    catalog: (
      <CatalogScreen
        products={filteredProducts}
        categories={categories}
        query={query}
        categoryFilter={categoryFilter}
        sort={sort}
        onQuery={setQuery}
        onCategory={setCategoryFilter}
        onSort={setSort}
        onProduct={(id) => {
          setSelectedProductId(id);
          setScreen("productDetail");
        }}
      />
    ),
    productDetail: (
      <ProductDetailScreen
        product={selectedProduct}
        onOrder={() => setScreen("createOrder")}
      />
    ),
    createOrder: (
      <CreateOrderScreen
        products={products}
        selectedProduct={selectedProduct}
        onSubmit={createOrder}
      />
    ),
    trackOrder: <TrackOrderScreen orders={orders} deliveries={deliveries} />,
    shipperDashboard: <ShipperDashboard stats={deliveryStats} />,
    deliveryList: (
      <DeliveryListScreen
        deliveries={deliveries}
        onSelect={(id) => {
          setSelectedDeliveryId(id);
          setScreen("deliveryDetail");
        }}
        onReceive={(id) => updateDelivery(id, "PICKED_UP")}
      />
    ),
    deliveryDetail: (
      <DeliveryDetailScreen
        delivery={selectedDelivery}
        onStatus={updateDelivery}
      />
    ),
    adminDashboard: (
      <AdminDashboard
        products={products}
        orders={orders}
        deliveries={deliveries}
        events={events}
        health={health}
      />
    ),
    categories: <CategoryManagement categories={categories} onCreate={createCategory} />,
    productsAdmin: (
      <ProductManagement
        products={products}
        categories={categories}
        onCreate={createProduct}
      />
    ),
    ordersAdmin: <OrderManagement orders={orders} />,
    notifications: <NotificationCenter events={events} />,
    monitoring: (
      <SystemMonitoring
        health={health}
        orders={orders}
        deliveries={deliveries}
        events={events}
      />
    )
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">ED</div>
          <div>
            <strong>Ecommerce</strong>
            <span>Distributed UI</span>
          </div>
        </div>
        <nav>
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map(([key, label, Icon]) => (
                <button
                  className={screen === key ? "active" : ""}
                  key={key}
                  onClick={() => setScreen(key)}
                  title={label}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Microservice Commerce</p>
            <h1>{currentTitle(screen)}</h1>
          </div>
          <div className="top-actions">
            <button className="icon-button" onClick={refreshData} title="Lam moi du lieu">
              <Activity size={18} />
            </button>
            {currentUser && <span className="status-pill">{currentUser.role}: {currentUser.displayName}</span>}
            {currentUser && (
              <button className="icon-button" onClick={handleLogout} title="Dang xuat">
                <LogOut size={18} />
              </button>
            )}
            <span className="status-pill">Kafka online</span>
          </div>
        </header>
        {notice && <div className="notice">{notice}</div>}
        {screens[screen]}
      </main>
    </div>
  );
}

function currentTitle(screen) {
  const all = navGroups.flatMap((group) => group.items);
  return all.find(([key]) => key === screen)?.[1] ?? "Dashboard";
}

function LoginScreen({ onLogin }) {
  return (
    <section className="split-layout">
      <div className="login-visual">
        <div>
          <p className="eyebrow">Customer Portal</p>
          <h2>Dang nhap de dat hang va theo doi giao hang.</h2>
        </div>
      </div>
      <form className="panel form-panel" onSubmit={onLogin}>
        <label>
          Username
          <div className="input-icon">
            <User size={18} />
            <input name="username" placeholder="customer / shipper / admin" autoComplete="username" required />
          </div>
        </label>
        <label>
          Password
          <div className="input-icon">
            <Lock size={18} />
            <input name="password" type="password" placeholder="********" autoComplete="current-password" required />
          </div>
        </label>
        <label className="inline-check">
          <input name="remember" type="checkbox" />
          Ghi nho dang nhap
        </label>
        <button className="primary-button" type="submit">
          <LogIn size={18} />
          Login
        </button>
        <button className="link-button" type="button" onClick={() => alert("Chuc nang quen mat khau dang duoc mo phong o frontend.")}>Quen mat khau</button>
      </form>
    </section>
  );
}

function HomeScreen({ products, categories, onProduct, onCatalog }) {
  return (
    <section className="home-stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Featured Products</p>
          <h2>Thiet bi cong nghe san sang giao den khach hang.</h2>
          <button className="primary-button" onClick={onCatalog}>
            <Search size={18} />
            Tim san pham
          </button>
        </div>
      </div>
      <CategoryStrip categories={categories} />
      <SectionHeader title="San pham noi bat" action="Xem chi tiet" />
      <ProductGrid products={products.slice(0, 4)} onProduct={onProduct} />
      <SectionHeader title="San pham moi" />
      <ProductGrid products={[...products].slice(-4).reverse()} onProduct={onProduct} />
    </section>
  );
}

function CatalogScreen(props) {
  return (
    <section>
      <div className="toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={props.query} onChange={(event) => props.onQuery(event.target.value)} placeholder="Tim kiem san pham" />
        </div>
        <select value={props.categoryFilter} onChange={(event) => props.onCategory(event.target.value)}>
          <option value="all">Tat ca danh muc</option>
          {props.categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <select value={props.sort} onChange={(event) => props.onSort(event.target.value)}>
          <option value="featured">Mac dinh</option>
          <option value="priceAsc">Gia tang dan</option>
          <option value="priceDesc">Gia giam dan</option>
          <option value="stock">Ton kho nhieu</option>
        </select>
      </div>
      <ProductGrid products={props.products} onProduct={props.onProduct} />
    </section>
  );
}

function ProductDetailScreen({ product, onOrder }) {
  if (!product) return <EmptyState text="Chua co san pham." />;
  return (
    <section className="detail-grid">
      <img className="detail-image" src={product.image} alt={product.name} />
      <div className="panel detail-copy">
        <span className="status-pill">{product.category?.name ?? "General"}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="price-large">{money.format(Number(product.price ?? 0))}</div>
        <div className="meta-row">
          <span>Ton kho</span>
          <strong>{product.stock}</strong>
        </div>
        <button className="primary-button" onClick={onOrder}>
          <ShoppingBag size={18} />
          Dat hang
        </button>
      </div>
    </section>
  );
}

function CreateOrderScreen({ products, selectedProduct, onSubmit }) {
  return (
    <form className="panel form-grid" onSubmit={onSubmit}>
      <label>
        San pham
        <select name="productId" defaultValue={selectedProduct?.id}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </label>
      <label>
        Ten khach hang
        <input name="customerName" defaultValue="Nguyen Van A" required />
      </label>
      <label>
        So luong
        <input name="quantity" type="number" min="1" defaultValue="2" required />
      </label>
      <label>
        Dia chi
        <input name="address" placeholder="12 Nguyen Trai, Quan 1" />
      </label>
      <label>
        So dien thoai
        <input name="phone" placeholder="0901234567" />
      </label>
      <div className="flow-line">
        <span>Customer</span>
        <ChevronRight size={16} />
        <span>Order</span>
        <ChevronRight size={16} />
        <span>Kafka</span>
        <ChevronRight size={16} />
        <span>Shipping</span>
      </div>
      <button className="primary-button" type="submit">
        <Plus size={18} />
        Tao don hang
      </button>
    </form>
  );
}

function TrackOrderScreen({ orders, deliveries }) {
  return (
    <DataTable
      columns={["Order ID", "San pham", "So luong", "Ngay tao", "Trang thai"]}
      rows={orders.map((order) => {
        const delivery = deliveries.find((item) => item.orderId === order.id);
        return [
          `#${order.id}`,
          order.productId,
          order.quantity,
          formatDate(order.createdAt),
          delivery?.status ?? order.status
        ];
      })}
    />
  );
}

function ShipperDashboard({ stats }) {
  return (
    <section className="stat-grid">
      <StatCard icon={Truck} label="Tong don giao" value={stats.total} />
      <StatCard icon={Activity} label="Dang giao" value={stats.delivering} />
      <StatCard icon={CheckCircle2} label="Da giao" value={stats.delivered} />
    </section>
  );
}

function DeliveryListScreen({ deliveries, onSelect, onReceive }) {
  return (
    <section className="list-stack">
      {deliveries.map((delivery) => (
        <article className="row-card" key={delivery.id}>
          <div>
            <strong>Order #{delivery.orderId}</strong>
            <span>{delivery.customerName}</span>
          </div>
          <span className="status-pill">{delivery.status}</span>
          <button className="icon-button" onClick={() => onReceive(delivery.id)} title="Nhan don">
            <UserRoundCheck size={18} />
          </button>
          <button className="secondary-button" onClick={() => onSelect(delivery.id)}>Chi tiet</button>
        </article>
      ))}
    </section>
  );
}

function DeliveryDetailScreen({ delivery, onStatus }) {
  if (!delivery) return <EmptyState text="Chua co don giao." />;
  return (
    <section className="panel detail-copy">
      <h2>Delivery #{delivery.id}</h2>
      <DataTable
        columns={["Ma don", "Ten khach", "San pham", "So luong", "Trang thai"]}
        rows={[[`#${delivery.orderId}`, delivery.customerName, delivery.productId, delivery.quantity, delivery.status]]}
      />
      <div className="button-row">
        <button className="secondary-button" onClick={() => onStatus(delivery.id, "PICKED_UP")}>Nhan don</button>
        <button className="secondary-button" onClick={() => onStatus(delivery.id, "DELIVERING")}>Bat dau giao</button>
        <button className="primary-button" onClick={() => onStatus(delivery.id, "DELIVERED")}>Da giao</button>
      </div>
    </section>
  );
}

function AdminDashboard({ products, orders, deliveries, events, health }) {
  return (
    <section className="dashboard-stack">
      <div className="stat-grid">
        <StatCard icon={Package} label="Tong san pham" value={products.length} />
        <StatCard icon={ClipboardList} label="Tong don hang" value={orders.length} />
        <StatCard icon={Truck} label="Tong giao hang" value={deliveries.length} />
        <StatCard icon={Bell} label="Tong thong bao" value={events.length} />
      </div>
      <div className="service-grid">
        {["product", "order", "notification", "shipping"].map((key) => (
          <ServiceStatus key={key} name={`${key} service`} status={health[key] ?? "DOWN"} />
        ))}
      </div>
    </section>
  );
}

function CategoryManagement({ categories, onCreate }) {
  return (
    <section className="management-grid">
      <form className="panel compact-form" onSubmit={onCreate}>
        <h3>Them danh muc</h3>
        <input name="name" placeholder="Ten danh muc" required />
        <input name="description" placeholder="Mo ta" required />
        <button className="primary-button"><Plus size={18} />Them</button>
      </form>
      <DataTable
        columns={["ID", "Ten danh muc", "Mo ta"]}
        rows={categories.map((item) => [item.id, item.name, item.description])}
      />
    </section>
  );
}

function ProductManagement({ products, categories, onCreate }) {
  return (
    <section className="management-grid">
      <form className="panel compact-form" onSubmit={onCreate}>
        <h3>Them san pham</h3>
        <input name="name" placeholder="Ten" required />
        <input name="description" placeholder="Mo ta" required />
        <input name="price" type="number" placeholder="Gia" required />
        <input name="quantity" type="number" placeholder="Kho" required />
        <select name="categoryId">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button className="primary-button"><Plus size={18} />Them</button>
      </form>
      <DataTable
        columns={["Ten", "Gia", "Kho", "Danh muc"]}
        rows={products.map((product) => [
          product.name,
          money.format(Number(product.price ?? 0)),
          product.stock,
          product.category?.name ?? "-"
        ])}
      />
    </section>
  );
}

function OrderManagement({ orders }) {
  const [status, setStatus] = useState("all");
  const filtered = status === "all" ? orders : orders.filter((order) => order.status === status);
  return (
    <section>
      <div className="toolbar">
        <ListFilter size={18} />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">Tat ca trang thai</option>
          <option value="CREATED">CREATED</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="DELIVERING">DELIVERING</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>
      </div>
      <DataTable
        columns={["Order ID", "Customer", "Quantity", "Status"]}
        rows={filtered.map((order) => [`#${order.id}`, order.customerName, order.quantity, order.status])}
      />
    </section>
  );
}

function NotificationCenter({ events }) {
  return (
    <section className="event-feed">
      {events.map((event, index) => (
        <article className="event-row" key={`${event.type}-${index}`}>
          <Bell size={18} />
          <div>
            <strong>{event.type}</strong>
            <span>{event.message}</span>
          </div>
          <time>{formatDate(event.time)}</time>
        </article>
      ))}
    </section>
  );
}

function SystemMonitoring({ health, orders, deliveries, events }) {
  return (
    <section className="monitoring-grid">
      <div className="panel">
        <h3>Service Status</h3>
        <ServiceStatus name="Product Service" status={health.product ?? "DOWN"} />
        <ServiceStatus name="Order Service" status={health.order ?? "DOWN"} />
        <ServiceStatus name="Notification Service" status={health.notification ?? "DOWN"} />
        <ServiceStatus name="Shipping Service" status={health.shipping ?? "DOWN"} />
      </div>
      <div className="panel">
        <h3>Infrastructure</h3>
        <ServiceStatus name="Kafka Broker" status={health.kafka ?? "RUNNING"} />
        <ServiceStatus name="Redis Cache" status={health.redis ?? "RUNNING"} />
        <ServiceStatus name="PostgreSQL" status={health.postgres ?? "RUNNING"} />
        <ServiceStatus name="Eureka Discovery" status={health.eureka ?? "DOWN"} />
      </div>
      <div className="stat-grid wide">
        <StatCard icon={Bell} label="Events Published" value={events.length} />
        <StatCard icon={Activity} label="Events Consumed" value={deliveries.length} />
        <StatCard icon={ClipboardList} label="Orders Created" value={orders.length} />
        <StatCard icon={Truck} label="Deliveries Created" value={deliveries.length} />
      </div>
    </section>
  );
}

function ProductGrid({ products, onProduct }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div>
            <span>{product.category?.name ?? "General"}</span>
            <h3>{product.name}</h3>
            <p>{money.format(Number(product.price ?? 0))}</p>
            <small>Ton kho: {product.stock}</small>
          </div>
          <button className="secondary-button" onClick={() => onProduct(product.id)}>Chi tiet</button>
        </article>
      ))}
    </div>
  );
}

function CategoryStrip({ categories }) {
  return (
    <div className="category-strip">
      {categories.map((category) => (
        <div className="category-item" key={category.id}>
          <Boxes size={18} />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {action && <span>{action}</span>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <article className="stat-card">
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ServiceStatus({ name, status }) {
  const ok = ["UP", "RUNNING", "ACTIVE"].includes(status);
  return (
    <div className="service-row">
      <span>{name}</span>
      <strong className={ok ? "ok" : "bad"}>{status}</strong>
    </div>
  );
}

function DataTable({ columns, rows }) {
  if (!rows.length) return <EmptyState text="Chua co du lieu." />;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell ?? "-"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("vi-VN");
}
