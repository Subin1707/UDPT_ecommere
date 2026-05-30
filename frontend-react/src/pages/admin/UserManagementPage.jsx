import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ROLES, USER_STATUSES } from "../../utils/constants.js";

export default function UserManagementPage({ users, onCreate, onToggleStatus, onDelete }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const filtered = useMemo(() => users.filter((user) => {
    const text = `${user.username} ${user.fullName ?? ""} ${user.email ?? ""} ${user.phone ?? ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (role === "all" || user.role === role);
  }), [query, role, users]);

  return (
    <section className="management-grid">
      <form className="panel compact-form" onSubmit={onCreate}>
        <h3>Thêm user</h3>
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
        <button className="primary-button"><Plus size={18} />Thêm</button>
      </form>
      <div className="list-stack">
        <div className="toolbar">
          <div className="input-icon grow">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm user" />
          </div>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="all">Tất cả role</option>
            <option value={ROLES.ADMIN}>ADMIN</option>
            <option value={ROLES.CUSTOMER}>CUSTOMER</option>
            <option value={ROLES.SHIPPER}>SHIPPER</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <div className="button-row table-actions">
                      <button className="secondary-button" type="button" onClick={() => onToggleStatus(user)}>
                        {user.status === USER_STATUSES.ACTIVE ? "Khóa" : "Kích hoạt"}
                      </button>
                      <button className="secondary-button danger-button" type="button" onClick={() => onDelete(user.id)} disabled={user.role === ROLES.ADMIN}>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
