import { Activity, LogOut } from "lucide-react";

export default function Header({ title, user, notice, onRefresh, onLogout }) {
  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Microservice Commerce</p>
          <h1>{title}</h1>
        </div>
        <div className="top-actions">
          {onRefresh && (
            <button className="icon-button" onClick={onRefresh} title="Làm mới dữ liệu">
              <Activity size={18} />
            </button>
          )}
          {user && <span className="status-pill">{user.role}: {user.displayName}</span>}
          {user && (
            <button className="icon-button" onClick={onLogout} title="Đăng xuất">
              <LogOut size={18} />
            </button>
          )}
          <span className="status-pill">Kafka online</span>
        </div>
      </header>
      {notice && <div className="notice">{notice}</div>}
    </>
  );
}
