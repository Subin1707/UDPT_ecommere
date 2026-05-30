export const ROLES = {
  CUSTOMER: "CUSTOMER",
  SHIPPER: "SHIPPER",
  ADMIN: "ADMIN"
};

export const ORDER_STATUSES = ["CREATED", "ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"];

export const USER_STATUSES = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  LOCKED: "LOCKED"
};

export const defaultUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    fullName: "System Administrator",
    email: "admin@ecommerce.local",
    phone: "0900000001",
    address: "Head Office",
    role: ROLES.ADMIN,
    status: USER_STATUSES.ACTIVE,
    createdAt: "2026-05-30T00:00:00"
  }
];

export const defaultProducts = [
  {
    id: 1,
    name: "Laptop Dell",
    description: "Laptop cho sinh viên và văn phòng",
    price: 15000000,
    stock: 10,
    quantity: 10,
    category: { id: 1, name: "Laptop" },
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Headphone Studio",
    description: "Tai nghe không dây chống ồn",
    price: 1890000,
    stock: 24,
    quantity: 24,
    category: { id: 2, name: "Audio" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Ban phim co",
    description: "Switch tactile, LED trắng",
    price: 1290000,
    stock: 18,
    quantity: 18,
    category: { id: 3, name: "Accessory" },
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Smart Watch",
    description: "Theo dõi sức khỏe và thông báo",
    price: 2490000,
    stock: 12,
    quantity: 12,
    category: { id: 4, name: "Wearable" },
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
  }
];

export const defaultCategories = [
  { id: 1, name: "Laptop", description: "Máy tính xách tay" },
  { id: 2, name: "Audio", description: "Thiết bị âm thanh" },
  { id: 3, name: "Accessory", description: "Phụ kiện công nghệ" },
  { id: 4, name: "Wearable", description: "Thiết bị đeo thông minh" }
];

export const routeGroups = {
  CUSTOMER: [
    ["home", "Trang chủ", "Home"],
    ["catalog", "Sản phẩm", "ShoppingBag"],
    ["productDetail", "Chi tiết", "Package"],
    ["createOrder", "Đặt hàng", "ClipboardList"],
    ["trackOrder", "Theo dõi đơn", "CheckCircle2"]
  ],
  SHIPPER: [
    ["shipperDashboard", "Dashboard", "Gauge"],
    ["deliveryList", "Đơn giao", "Truck"],
    ["deliveryDetail", "Chi tiết giao", "UserRoundCheck"]
  ],
  ADMIN: [
    ["adminDashboard", "Admin", "LayoutDashboard"],
    ["categories", "Danh mục", "Boxes"],
    ["productsAdmin", "Sản phẩm", "Package"],
    ["ordersAdmin", "Đơn hàng", "ClipboardList"],
    ["usersAdmin", "Users", "Users"],
    ["shippersAdmin", "Shippers", "UserRoundCheck"],
    ["notifications", "Thông báo", "Bell"],
    ["monitoring", "System Monitoring", "Activity"]
  ]
};

export function landingScreenForRole(role) {
  if (role === ROLES.ADMIN) return "adminDashboard";
  if (role === ROLES.SHIPPER) return "shipperDashboard";
  return "home";
}

export function normalizeProduct(product) {
  return {
    ...product,
    stock: product.stock ?? product.quantity ?? product.inventoryQuantity ?? 0,
    image: product.image ?? product.images?.[0]?.imageUrl ?? product.images?.[0]?.url ?? defaultProducts[(product.id - 1) % defaultProducts.length]?.image
  };
}
