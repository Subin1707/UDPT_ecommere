import { AtSign, Home, Lock, Phone, ShieldCheck, User, UserPlus } from "lucide-react";

export default function RegisterPage({ onSubmit, onBack }) {
  return (
    <section className="auth-layout auth-wow">
      <div className="auth-visual register-visual">
        <div className="auth-orbit">
          <span />
          <span />
          <span />
        </div>
        <div className="auth-hero-content">
          <p className="eyebrow">Customer Registration</p>
          <h2>Tạo tài khoản khách hàng và bắt đầu đặt hàng trong hệ thống.</h2>
          <p>Khách hàng tự đăng ký. Shipper do Admin tạo để giữ đúng mô hình phân quyền của thương mại điện tử.</p>
          <div className="auth-role-grid">
            <div><UserPlus size={20} /><span>Role tự động: CUSTOMER</span></div>
            <div><ShieldCheck size={20} /><span>Status mặc định: ACTIVE</span></div>
          </div>
        </div>
      </div>

      <div className="auth-card panel auth-glass-card">
        <div className="auth-card-head">
          <span className="auth-badge"><UserPlus size={15} /> New Customer</span>
          <p className="eyebrow">Tạo tài khoản</p>
          <h2>Đăng ký khách hàng</h2>
          <span>Thông tin này sẽ được lưu vào database qua Auth Service.</span>
        </div>
        <form className="form-panel auth-form-grid" onSubmit={onSubmit}>
          <label>
            Họ tên
            <div className="input-icon auth-input">
              <User size={18} />
              <input name="fullName" placeholder="Nguyễn Văn A" required />
            </div>
          </label>
          <label>
            Email
            <div className="input-icon auth-input">
              <AtSign size={18} />
              <input name="email" type="email" placeholder="customer@example.com" required />
            </div>
          </label>
          <label>
            Số điện thoại
            <div className="input-icon auth-input">
              <Phone size={18} />
              <input name="phone" placeholder="0901234567" required />
            </div>
          </label>
          <label>
            Địa chỉ
            <div className="input-icon auth-input">
              <Home size={18} />
              <input name="address" placeholder="12 Nguyễn Trãi, Quận 1" required />
            </div>
          </label>
          <label>
            Username
            <div className="input-icon auth-input">
              <User size={18} />
              <input name="username" placeholder="customer01" required />
            </div>
          </label>
          <label>
            Password
            <div className="input-icon auth-input">
              <Lock size={18} />
              <input name="password" type="password" placeholder="customer123" required />
            </div>
          </label>
          <button className="primary-button auth-submit auth-cta" type="submit">
            <UserPlus size={18} />
            Đăng ký khách hàng
          </button>
        </form>
        <button className="secondary-button auth-wide" type="button" onClick={onBack}>Quay lại đăng nhập</button>
      </div>
    </section>
  );
}
