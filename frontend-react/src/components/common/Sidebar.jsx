import {
  Activity,
  Bell,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Database,
  Gauge,
  Home,
  LayoutDashboard,
  LogIn,
  Package,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
  UserRoundCheck
} from "lucide-react";
import { routeGroups } from "../../utils/constants.js";

const iconMap = {
  Activity,
  Bell,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Home,
  LayoutDashboard,
  LogIn,
  Package,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
  UserRoundCheck
};

export default function Sidebar({ user, screen, onNavigate }) {
  const groups = user
    ? [{ label: user.role, items: routeGroups[user.role] ?? [] }]
    : [{ label: "Tài khoản", items: [["login", "Đăng nhập", "LogIn"]] }];

  return (
    <aside className="sidebar">
      <div className="sidebar-glow" />
      <div className="brand sidebar-brand">
        <div className="brand-mark">ED</div>
        <div>
          <strong>Ecommerce</strong>
          <span>Distributed UI</span>
        </div>
      </div>
      {user && (
        <div className="sidebar-user-card">
          <div className="sidebar-user-icon">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span>Đang đăng nhập</span>
            <strong>{user.role}</strong>
            <small>{user.displayName ?? user.username}</small>
          </div>
        </div>
      )}
      <nav>
        {groups.map((group) => (
          <div className="nav-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map(([key, label, iconName]) => {
              const Icon = iconMap[iconName] ?? Home;
              return (
                <button
                  className={screen === key ? "active" : ""}
                  key={key}
                  onClick={() => onNavigate(key)}
                  title={label}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                  {screen === key && <i />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="sidebar-status-card">
        <div>
          <RadioTower size={18} />
          <span>Kafka Online</span>
        </div>
        <div>
          <Database size={18} />
          <span>PostgreSQL Sync</span>
        </div>
      </div>
    </aside>
  );
}
