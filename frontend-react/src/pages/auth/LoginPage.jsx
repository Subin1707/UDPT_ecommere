import { useRef } from "react";
import { ArrowRight, Lock, LogIn, ShieldCheck, Sparkles, Truck, User, UserRoundCheck } from "lucide-react";

const accounts = [
  { role: "Admin", username: "admin", password: "admin123", icon: ShieldCheck },
  { role: "Customer", username: "customer", password: "customer123", icon: UserRoundCheck },
  { role: "Shipper", username: "shipper", password: "shipper123", icon: Truck }
];

export default function LoginPage({ onLogin, onRegister }) {
  const formRef = useRef(null);

  function fillAccount(account) {
    const form = formRef.current;
    if (!form) return;
    form.elements.username.value = account.username;
    form.elements.password.value = account.password;
  }

  return (
    <section className="auth-layout auth-wow">
      <div className="auth-visual">
        <div className="auth-orbit">
          <span />
          <span />
          <span />
        </div>
        <div className="auth-hero-content">
          <p className="eyebrow">Ecommerce Portal</p>
          <h2>Đăng nhập một lần, vào đúng không gian làm việc theo vai trò.</h2>
          <p>
            Customer mua hàng, Shipper xử lý giao vận, Admin điều phối toàn bộ hệ thống phân tán trên cùng một luồng dữ liệu.
          </p>
          <div className="auth-role-grid">
            <div><ShieldCheck size={20} /><span>Admin quản trị hệ thống</span></div>
            <div><Truck size={20} /><span>Shipper nhận đơn giao</span></div>
            <div><UserRoundCheck size={20} /><span>Customer đặt hàng</span></div>
          </div>
        </div>
      </div>

      <div className="auth-card panel auth-glass-card">
        <div className="auth-card-head">
          <span className="auth-badge"><Sparkles size={15} /> Secure Access</span>
          <p className="eyebrow">Đăng nhập</p>
          <h2>Chào mừng trở lại</h2>
          <span>Tài khoản được xác thực từ database và điều hướng theo đúng quyền.</span>
        </div>

        <form ref={formRef} className="form-panel" onSubmit={onLogin}>
          <label>
            Username
            <div className="input-icon auth-input">
              <User size={18} />
              <input name="username" placeholder="admin" autoComplete="username" required />
            </div>
          </label>
          <label>
            Password
            <div className="input-icon auth-input">
              <Lock size={18} />
              <input name="password" type="password" placeholder="admin123" autoComplete="current-password" required />
            </div>
          </label>
          <div className="auth-options">
            <label className="inline-check">
              <input name="remember" type="checkbox" />
              Ghi nhớ đăng nhập
            </label>
            <button className="link-button" type="button" onClick={() => alert("Chức năng quên mật khẩu đang được mô phỏng ở frontend.")}>
              Quên mật khẩu
            </button>
          </div>
          <button className="primary-button auth-submit auth-cta" type="submit">
            <LogIn size={18} />
            Đăng nhập
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="sample-accounts sample-account-grid">
          <p>Tài khoản test nhanh</p>
          {accounts.map((account) => {
            const Icon = account.icon;
            return (
              <button key={account.role} type="button" onClick={() => fillAccount(account)}>
                <Icon size={18} />
                <span>{account.role}</span>
                <code>{account.username} / {account.password}</code>
              </button>
            );
          })}
        </div>

        <button className="secondary-button auth-wide" type="button" onClick={onRegister}>
          Đăng ký tài khoản khách hàng
        </button>
      </div>
    </section>
  );
}
