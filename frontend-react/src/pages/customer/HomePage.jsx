import { ArrowRight, Boxes, PackageCheck, Search, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import ProductCard from "../../components/product/ProductCard.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function HomePage({ products, categories, onProduct, onAddToCart, onCatalog, onCategory }) {
  const featured = products.slice(0, 4);
  const newest = [...products].slice(-4).reverse();
  const totalStock = products.reduce((sum, product) => sum + Number(product.stock ?? 0), 0);
  const bestPrice = products.length ? Math.min(...products.map((product) => Number(product.price ?? 0))) : 0;

  return (
    <section className="home-stack customer-home">
      <div className="customer-hero">
        <div className="customer-hero-copy">
          <span className="auth-badge"><Sparkles size={15} /> Featured Products</span>
          <h2>Thiết bị và sản phẩm mới, sẵn sàng giao đến bạn.</h2>
          <p>Mua hàng trực tiếp từ Product Service, tạo đơn qua Order Service và theo dõi trạng thái giao hàng theo thời gian thực.</p>
          <div className="customer-hero-actions">
            <button className="primary-button" onClick={onCatalog}>
              <Search size={18} />
              Tìm sản phẩm
            </button>
            <button className="secondary-button customer-ghost-button" onClick={onCatalog}>
              Xem catalog
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="customer-hero-panel">
          <div className="customer-hero-product">
            <img src={featured[0]?.image} alt={featured[0]?.name ?? "Featured product"} />
            <div>
              <span>Sản phẩm nổi bật</span>
              <strong>{featured[0]?.name ?? "Đang cập nhật"}</strong>
              <p>{featured[0] ? formatCurrency(featured[0].price) : "Chưa có giá"}</p>
            </div>
          </div>
          <div className="customer-hero-metrics">
            <article><ShoppingBag size={18} /><strong>{products.length}</strong><span>Sản phẩm</span></article>
            <article><Boxes size={18} /><strong>{categories.length}</strong><span>Danh mục</span></article>
            <article><PackageCheck size={18} /><strong>{totalStock}</strong><span>Tồn kho</span></article>
          </div>
        </div>
      </div>

      <div className="customer-service-strip">
        <article><Truck size={20} /><strong>Giao hàng</strong><span>Shipping Service xử lý đơn sau Kafka event.</span></article>
        <article><ShieldCheck size={20} /><strong>Đúng vai trò</strong><span>Customer chỉ thao tác mua hàng và theo dõi đơn.</span></article>
        <article><Sparkles size={20} /><strong>Giá từ {formatCurrency(bestPrice)}</strong><span>Danh sách sản phẩm đồng bộ từ database.</span></article>
      </div>

      <div className="customer-category-strip">
        {categories.map((category) => {
          const productCount = products.filter((product) => String(product.category?.id) === String(category.id)).length;
          return (
            <button
              type="button"
              className="customer-category-item"
              key={category.id}
              onClick={() => onCategory(category.id)}
            >
              <Boxes size={18} />
              <span>{category.name}</span>
              <small>{productCount} sản phẩm</small>
            </button>
          );
        })}
      </div>

      <div className="section-header customer-section-header">
        <div>
          <p className="eyebrow">Featured</p>
          <h2>Sản phẩm nổi bật</h2>
        </div>
        <button className="link-button" type="button" onClick={onCatalog}>Xem tất cả <ArrowRight size={16} /></button>
      </div>
      <div className="product-grid customer-product-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} onProduct={onProduct} onAddToCart={onAddToCart} />
        ))}
      </div>

      <div className="section-header customer-section-header">
        <div>
          <p className="eyebrow">New Arrivals</p>
          <h2>Sản phẩm mới</h2>
        </div>
      </div>
      <div className="product-grid customer-product-grid">
        {newest.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProduct={onProduct}
            onAddToCart={onAddToCart}
            actionLabel="Xem chi tiết"
          />
        ))}
      </div>
    </section>
  );
}
