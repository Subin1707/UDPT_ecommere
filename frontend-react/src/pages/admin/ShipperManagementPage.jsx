import { CheckCircle2, Clock3, Mail, Phone, Plus, Route, Search, ShieldCheck, Truck, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { ROLES, USER_STATUSES } from "../../utils/constants.js";

function ShipperStatus({ status }) {
  const active = status === USER_STATUSES.ACTIVE;

  return (
    <span className={`shipper-status ${active ? "active" : "locked"}`}>
      {active ? <CheckCircle2 size={15} /> : <Clock3 size={15} />}
      {status}
    </span>
  );
}

export default function ShipperManagementPage({ users, deliveries, onCreate }) {
  const [query, setQuery] = useState("");
  const shippers = useMemo(() => users
    .filter((user) => user.role === ROLES.SHIPPER)
    .filter((user) => `${user.fullName ?? ""} ${user.username} ${user.email ?? ""} ${user.phone ?? ""}`.toLowerCase().includes(query.toLowerCase())),
    [query, users]);

  const activeShippers = shippers.filter((shipper) => shipper.status === USER_STATUSES.ACTIVE).length;
  const assignedDeliveries = deliveries.filter((delivery) => delivery.shipperName && delivery.shipperName !== "UNASSIGNED").length;
  const unassignedDeliveries = deliveries.filter((delivery) => !delivery.shipperName || delivery.shipperName === "UNASSIGNED").length;

  function countAssigned(shipperName) {
    return deliveries.filter((delivery) => delivery.shipperName === shipperName).length;
  }

  function countInProgress(shipperName) {
    return deliveries.filter((delivery) => delivery.shipperName === shipperName && delivery.status !== "DELIVERED").length;
  }

  return (
    <section className="shipper-management">
      <div className="shipper-hero">
        <div>
          <p className="eyebrow">Delivery Workforce</p>
          <h2>Quản lý đội shipper và năng lực giao hàng</h2>
          <span>Admin tạo tài khoản shipper, theo dõi trạng thái hoạt động và số đơn đang được phân công cho từng nhân sự.</span>
        </div>
        <div className="shipper-hero-stats">
          <article><UserRoundCheck size={20} /><strong>{shippers.length}</strong><span>Tổng shipper</span></article>
          <article><ShieldCheck size={20} /><strong>{activeShippers}</strong><span>Đang hoạt động</span></article>
          <article><Route size={20} /><strong>{assignedDeliveries}</strong><span>Đã phân công</span></article>
          <article><Clock3 size={20} /><strong>{unassignedDeliveries}</strong><span>Chờ nhận đơn</span></article>
        </div>
      </div>

      <div className="shipper-insight-strip">
        <article>
          <span>Đội vận hành</span>
          <strong>{shippers.length ? Math.round((activeShippers / shippers.length) * 100) : 0}%</strong>
          <small>Tỷ lệ shipper active</small>
        </article>
        <article>
          <span>Luồng đơn hàng</span>
          <strong>{deliveries.length}</strong>
          <small>Tổng delivery trong hệ thống</small>
        </article>
        <article>
          <span>Cần điều phối</span>
          <strong>{unassignedDeliveries}</strong>
          <small>Đơn chưa có shipper phụ trách</small>
        </article>
      </div>

      <div className="management-grid shipper-management-grid">
        <form className="panel compact-form shipper-form-card" onSubmit={onCreate}>
          <div className="form-card-head">
            <div className="form-icon shipper-form-icon">
              <Truck size={22} />
            </div>
            <div>
              <p className="eyebrow">New Shipper</p>
              <h3>Thêm shipper</h3>
            </div>
          </div>
          <input name="fullName" placeholder="Họ tên shipper" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="phone" placeholder="Số điện thoại" required />
          <input name="username" placeholder="Username" required />
          <input name="password" type="password" placeholder="Password" required />
          <input name="role" type="hidden" value={ROLES.SHIPPER} />
          <div className="shipper-form-note">
            <ShieldCheck size={17} />
            <span>Tài khoản được tạo bởi Admin và đăng nhập trực tiếp vào khu vực Shipper.</span>
          </div>
          <button className="primary-button"><Plus size={18} />Thêm shipper</button>
        </form>

        <div className="list-stack">
          <div className="toolbar shipper-toolbar">
            <div className="input-icon grow">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên, username, email, số điện thoại" />
            </div>
          </div>

          <div className="shipper-card-grid">
            {shippers.length ? shippers.map((shipper) => {
              const assigned = countAssigned(shipper.fullName);
              const inProgress = countInProgress(shipper.fullName);

              return (
                <article className="shipper-admin-card" key={shipper.id}>
                  <div className="shipper-card-top">
                    <div className="shipper-avatar">{String(shipper.fullName || shipper.username || "S").slice(0, 2).toUpperCase()}</div>
                    <div>
                      <span>ID {shipper.id}</span>
                      <h3>{shipper.fullName || shipper.username}</h3>
                      <small>@{shipper.username}</small>
                    </div>
                    <ShipperStatus status={shipper.status} />
                  </div>

                  <div className="shipper-contact-list">
                    <span><Mail size={15} />{shipper.email || "Chưa có email"}</span>
                    <span><Phone size={15} />{shipper.phone || "Chưa có số điện thoại"}</span>
                  </div>

                  <div className="shipper-load-grid">
                    <article>
                      <strong>{assigned}</strong>
                      <span>Assigned Orders</span>
                    </article>
                    <article>
                      <strong>{inProgress}</strong>
                      <span>Đang xử lý</span>
                    </article>
                    <article>
                      <strong>{assigned - inProgress}</strong>
                      <span>Đã giao</span>
                    </article>
                  </div>

                  <div className="shipper-capacity">
                    <span style={{ width: `${Math.min(100, assigned * 20)}%` }} />
                  </div>
                </article>
              );
            }) : <div className="empty-state">Không tìm thấy shipper phù hợp.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
