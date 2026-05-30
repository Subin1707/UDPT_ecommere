import { Activity, Boxes, ShieldCheck, ShoppingBag, Truck, UserPlus } from "lucide-react";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function PublicLandingPage({ products = [], categories = [], onLogin, onRegister, onRequireLogin }) {
  const previewProducts = products.slice(0, 4);

  return (
    <section className="public-home">
      <div className="public-hero">
        <div>
          <p className="eyebrow">Ecommerce Distributed System</p>
          <h1>Hệ thống thương mại điện tử với Order, Kafka, Shipping và Monitoring.</h1>
          <p className="public-hero-copy">
            Khách hàng có thể xem sản phẩm trước. Để xem chi tiết, đặt hàng hoặc theo dõi đơn, hệ thống sẽ yêu cầu đăng nhập.
          </p>
          <div className="button-row">
            <button className="primary-button" onClick={onLogin}>
              <ShieldCheck size={18} />
              Đăng nhập
            </button>
            <button className="secondary-button" onClick={onRegister}>
              <UserPlus size={18} />
              Đăng ký khách hàng
            </button>
          </div>
        </div>
      </div>

      <div className="public-grid">
        <article className="panel public-card">
          <ShoppingBag size={24} />
          <h3>Khách hàng</h3>
          <p>Xem sản phẩm, đặt hàng và theo dõi trạng thái đơn hàng.</p>
        </article>
        <article className="panel public-card">
          <Truck size={24} />
          <h3>Shipper</h3>
          <p>Đăng nhập bằng tài khoản do Admin tạo để nhận và cập nhật giao hàng.</p>
        </article>
        <article className="panel public-card">
          <Activity size={24} />
          <h3>Admin</h3>
          <p>Quản lý sản phẩm, danh mục, user, shipper, notification và monitoring.</p>
        </article>
      </div>

      <section className="panel public-catalog">
        <div className="section-header">
          <div>
            <p className="eyebrow">Sản phẩm</p>
            <h2>Sản phẩm đang có trong hệ thống</h2>
          </div>
          <span>Đăng nhập để xem chi tiết</span>
        </div>

        <div className="public-category-strip">
          {categories.slice(0, 6).map((category) => (
            <button className="category-chip" key={category.id} type="button" onClick={onRequireLogin}>
              <Boxes size={16} />
              {category.name}
            </button>
          ))}
        </div>

        {previewProducts.length > 0 ? (
          <div className="product-grid">
            {previewProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProduct={onRequireLogin}
                actionLabel="Đăng nhập để xem"
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">Chưa tải được sản phẩm từ Product Service.</div>
        )}
      </section>
    </section>
  );
}
