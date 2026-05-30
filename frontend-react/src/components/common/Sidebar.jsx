import {
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
      <div className="brand">
        <div className="brand-mark">ED</div>
        <div>
          <strong>Ecommerce</strong>
          <span>Distributed UI</span>
        </div>
      </div>
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
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
