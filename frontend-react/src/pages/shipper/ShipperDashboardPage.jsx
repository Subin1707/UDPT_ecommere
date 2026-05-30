import { Activity, CheckCircle2, Truck } from "lucide-react";

function StatCard({ icon: Icon, label, value }) {
  return (
    <article className="stat-card">
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default function ShipperDashboardPage({ stats }) {
  return (
    <section className="stat-grid">
      <StatCard icon={Truck} label="Tổng đơn giao" value={stats.total} />
      <StatCard icon={Activity} label="Đang giao" value={stats.delivering} />
      <StatCard icon={CheckCircle2} label="Đã giao" value={stats.delivered} />
    </section>
  );
}
