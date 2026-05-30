import { Search } from "lucide-react";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function ProductListPage({ products, categories, query, categoryFilter, sort, onQuery, onCategory, onSort, onProduct }) {
  return (
    <section>
      <div className="toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Tìm kiếm sản phẩm" />
        </div>
        <select value={categoryFilter} onChange={(event) => onCategory(event.target.value)}>
          <option value="all">Tất cả danh mục</option>
          {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
        </select>
        <select value={sort} onChange={(event) => onSort(event.target.value)}>
          <option value="featured">Mặc định</option>
          <option value="priceAsc">Giá tăng dần</option>
          <option value="priceDesc">Giá giảm dần</option>
          <option value="stock">Tồn kho nhiều</option>
        </select>
      </div>
      <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onProduct={onProduct} />)}</div>
    </section>
  );
}
