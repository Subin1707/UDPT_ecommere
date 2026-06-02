import { Ban, CheckCircle2, LockKeyhole, Mail, MapPin, Phone, Plus, Search, ShieldCheck, Trash2, Truck, UserRound, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { ROLES, USER_STATUSES } from "../../utils/constants.js";

const roleOptions = [ROLES.ADMIN, ROLES.CUSTOMER, ROLES.SHIPPER];

const roleMeta = {
  [ROLES.ADMIN]: { label: "Quản trị viên", icon: ShieldCheck },
  [ROLES.CUSTOMER]: { label: "Khách hàng", icon: UserRound },
  [ROLES.SHIPPER]: { label: "Shipper", icon: Truck }
};

function RoleBadge({ role }) {
  const Icon = roleMeta[role]?.icon ?? UserRound;

  return (
    <span className={`user-role-badge role-${String(role).toLowerCase()}`}>
      <Icon size={15} />
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const active = status === USER_STATUSES.ACTIVE;

  return (
    <span className={`user-status-badge ${active ? "active" : "locked"}`}>
      {active ? <CheckCircle2 size={15} /> : <Ban size={15} />}
      {status}
    </span>
  );
}

export default function UserManagementPage({ users, onCreate, onToggleStatus, onDelete }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const filtered = useMemo(() => users.filter((user) => {
    const text = `${user.username} ${user.fullName ?? ""} ${user.email ?? ""} ${user.phone ?? ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (role === "all" || user.role === role);
  }), [query, role, users]);

  const counts = roleOptions.reduce((next, item) => ({
    ...next,
    [item]: users.filter((user) => user.role === item).length
  }), {});

  const activeCount = users.filter((user) => user.status === USER_STATUSES.ACTIVE).length;

  return (
    <section className="user-management">
      <div className="user-hero">
        <div>
          <p className="eyebrow">Access Control</p>
          <h2>Quản lý người dùng và phân quyền hệ thống</h2>
          <span>Tạo tài khoản customer, cấp tài khoản shipper, khóa hoặc kích hoạt người dùng theo trạng thái vận hành.</span>
        </div>
        <div className="user-hero-stats">
          <article><Users size={20} /><strong>{users.length}</strong><span>Tổng user</span></article>
          <article><CheckCircle2 size={20} /><strong>{activeCount}</strong><span>Đang hoạt động</span></article>
          <article><Truck size={20} /><strong>{counts[ROLES.SHIPPER] ?? 0}</strong><span>Shipper</span></article>
        </div>
      </div>

      <div className="user-role-strip">
        <button className={role === "all" ? "active" : ""} type="button" onClick={() => setRole("all")}>
          <Users size={18} />
          <span>Tất cả</span>
          <strong>{users.length}</strong>
        </button>
        {roleOptions.map((item) => {
          const Icon = roleMeta[item]?.icon ?? UserRound;

          return (
            <button className={role === item ? "active" : ""} type="button" key={item} onClick={() => setRole(item)}>
              <Icon size={18} />
              <span>{roleMeta[item]?.label ?? item}</span>
              <strong>{counts[item] ?? 0}</strong>
            </button>
          );
        })}
      </div>

      <div className="management-grid user-management-grid">
        <form className="panel compact-form user-form-card" onSubmit={onCreate}>
          <div className="form-card-head">
            <div className="form-icon user-form-icon">
              <UserRound size={22} />
            </div>
            <div>
              <p className="eyebrow">New Account</p>
              <h3>Thêm người dùng</h3>
            </div>
          </div>
          <input name="fullName" placeholder="Họ tên" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="phone" placeholder="Số điện thoại" required />
          <input name="address" placeholder="Địa chỉ" />
          <input name="username" placeholder="Username" required />
          <input name="password" type="password" placeholder="Password" required />
          <select name="role" defaultValue={ROLES.CUSTOMER}>
            <option value={ROLES.CUSTOMER}>CUSTOMER</option>
            <option value={ROLES.SHIPPER}>SHIPPER</option>
          </select>
          <button className="primary-button"><Plus size={18} />Thêm người dùng</button>
        </form>

        <div className="list-stack">
          <div className="toolbar user-toolbar">
            <div className="input-icon grow">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo username, họ tên, email, số điện thoại" />
            </div>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="all">Tất cả role</option>
              <option value={ROLES.ADMIN}>ADMIN</option>
              <option value={ROLES.CUSTOMER}>CUSTOMER</option>
              <option value={ROLES.SHIPPER}>SHIPPER</option>
            </select>
          </div>

          <div className="user-card-grid">
            {filtered.length ? filtered.map((user) => (
              <article className="user-admin-card" key={user.id}>
                <div className="user-card-top">
                  <div className="user-avatar">{String(user.fullName || user.username || "U").slice(0, 2).toUpperCase()}</div>
                  <div>
                    <span>ID {user.id}</span>
                    <h3>{user.fullName || user.username}</h3>
                    <small>@{user.username}</small>
                  </div>
                </div>

                <div className="user-card-badges">
                  <RoleBadge role={user.role} />
                  <StatusBadge status={user.status} />
                </div>

                <div className="user-contact-list">
                  <span><Mail size={15} />{user.email || "Chưa có email"}</span>
                  <span><Phone size={15} />{user.phone || "Chưa có số điện thoại"}</span>
                  <span><MapPin size={15} />{user.address || "Chưa có địa chỉ"}</span>
                </div>

                <div className="button-row user-actions">
                  <button className="secondary-button" type="button" onClick={() => onToggleStatus(user)}>
                    <LockKeyhole size={16} />
                    {user.status === USER_STATUSES.ACTIVE ? "Khóa" : "Kích hoạt"}
                  </button>
                  <button className="secondary-button danger-button" type="button" onClick={() => onDelete(user.id)} disabled={user.role === ROLES.ADMIN}>
                    <Trash2 size={16} />
                    Xóa
                  </button>
                </div>
              </article>
            )) : <div className="empty-state">Không tìm thấy người dùng phù hợp.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
