import { Boxes, Search } from "lucide-react";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function HomePage({ products, categories, onProduct, onCatalog }) {
  return (
    <section className="home-stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Featured Products</p>
          <h2>Thiết bị công nghệ sẵn sàng giao đến khách hàng.</h2>
          <button className="primary-button" onClick={onCatalog}>
            <Search size={18} />
            Tìm sản phẩm
          </button>
        </div>
      </div>
      <div className="category-strip">
        {categories.map((category) => (
          <div className="category-item" key={category.id}>
            <Boxes size={18} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      <div className="section-header"><h2>Sản phẩm nổi bật</h2><span>Xem chi tiết</span></div>
      <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onProduct={onProduct} />)}</div>
      <div className="section-header"><h2>Sản phẩm mới</h2></div>
      <div className="product-grid">{[...products].slice(-4).reverse().map((product) => <ProductCard key={product.id} product={product} onProduct={onProduct} />)}</div>
    </section>
  );
}
