import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ROLES } from "../../utils/constants.js";

export default function ShipperManagementPage({ users, deliveries, onCreate }) {
  const [query, setQuery] = useState("");
  const shippers = useMemo(() => users
    .filter((user) => user.role === ROLES.SHIPPER)
    .filter((user) => `${user.fullName ?? ""} ${user.username} ${user.phone ?? ""}`.toLowerCase().includes(query.toLowerCase())),
    [query, users]);

  return (
    <section className="management-grid">
      <form className="panel compact-form" onSubmit={onCreate}>
        <h3>Thêm shipper</h3>
        <input name="fullName" placeholder="Họ tên" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" placeholder="Số điện thoại" required />
        <input name="username" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <input name="role" type="hidden" value={ROLES.SHIPPER} />
        <button className="primary-button"><Plus size={18} />Thêm shipper</button>
      </form>
      <div className="list-stack">
        <div className="toolbar">
          <div className="input-icon grow">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm shipper" />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Assigned Orders</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {shippers.map((shipper) => (
                <tr key={shipper.id}>
                  <td>{shipper.id}</td>
                  <td>{shipper.fullName}</td>
                  <td>{shipper.phone}</td>
                  <td>{deliveries.filter((delivery) => delivery.shipperName === shipper.fullName).length}</td>
                  <td>{shipper.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
