import {
  ArrowLeft,
  AtSign,
  CheckCircle2,
  Database,
  Home,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus
} from "lucide-react";

export default function RegisterPage({ onSubmit, onBack }) {
  return (
    <section className="auth-layout auth-wow register-wow">
      <div className="auth-visual register-visual premium-register-visual">
        <div className="auth-orbit">
          <span />
          <span />
          <span />
        </div>
        <div className="register-visual-card">
          <span><Sparkles size={16} /> Customer Portal</span>
          <strong>Đăng ký tài khoản khách hàng</strong>
          <p>Khách hàng tự đăng ký, hệ thống tự gán role CUSTOMER và trạng thái ACTIVE.</p>
        </div>
        <div className="auth-hero-content">
          <p className="eyebrow">Customer Registration</p>
          <h2>Tạo tài khoản để mua sắm và theo dõi đơn hàng.</h2>
          <p>
            Dữ liệu đăng ký được ghi vào Auth Service. Admin vẫn là tài khoản hệ thống,
            Shipper do Admin tạo để giữ đúng mô hình phân quyền.
          </p>
          <div className="auth-role-grid register-role-grid">
            <div><UserPlus size={20} /><span>Role tự động: CUSTOMER</span></div>
            <div><ShieldCheck size={20} /><span>Status mặc định: ACTIVE</span></div>
            <div><Database size={20} /><span>Lưu trực tiếp vào database</span></div>
          </div>
        </div>
      </div>

      <div className="auth-card panel auth-glass-card register-card">
        <div className="auth-card-head register-card-head">
          <span className="auth-badge"><UserPlus size={15} /> New Customer</span>
          <p className="eyebrow">Tạo tài khoản</p>
          <h2>Đăng ký khách hàng</h2>
          <span>Hoàn tất hồ sơ để bắt đầu đặt hàng trong hệ thống Ecommerce Distributed System.</span>
        </div>

        <div className="register-trust-strip">
          <div><CheckCircle2 size={17} /><span>Không cần Admin duyệt</span></div>
          <div><CheckCircle2 size={17} /><span>Đăng nhập ngay sau đăng ký</span></div>
          <div><CheckCircle2 size={17} /><span>Theo dõi trạng thái đơn hàng</span></div>
        </div>

        <form className="form-panel auth-form-grid register-form-grid" onSubmit={onSubmit}>
          <label>
            Họ tên
            <div className="input-icon auth-input premium-input register-input">
              <User size={18} />
              <input name="fullName" placeholder="Nguyễn Văn A" required />
            </div>
          </label>
          <label>
            Email
            <div className="input-icon auth-input premium-input register-input">
              <AtSign size={18} />
              <input name="email" type="email" placeholder="customer@example.com" required />
            </div>
          </label>
          <label>
            Số điện thoại
            <div className="input-icon auth-input premium-input register-input">
              <Phone size={18} />
              <input name="phone" placeholder="0901234567" required />
            </div>
          </label>
          <label>
            Địa chỉ
            <div className="input-icon auth-input premium-input register-input">
              <Home size={18} />
              <input name="address" placeholder="12 Nguyễn Trãi, Quận 1" required />
            </div>
          </label>
          <label>
            Username
            <div className="input-icon auth-input premium-input register-input">
              <User size={18} />
              <input name="username" placeholder="customer01" required />
            </div>
          </label>
          <label>
            Password
            <div className="input-icon auth-input premium-input register-input">
              <Lock size={18} />
              <input name="password" type="password" placeholder="customer123" required />
            </div>
          </label>

          <div className="register-security-note">
            <ShieldCheck size={18} />
            <span>Mật khẩu sẽ được mã hóa tại Auth Service trước khi lưu database.</span>
          </div>

          <button className="primary-button auth-submit auth-cta register-submit" type="submit">
            <UserPlus size={18} />
            Đăng ký khách hàng
          </button>
        </form>

        <button className="secondary-button auth-wide register-back-button" type="button" onClick={onBack}>
          <ArrowLeft size={17} />
          Quay lại đăng nhập
        </button>
      </div>
    </section>
  );
}
