import { Boxes, Image, Package, Search, Tags } from "lucide-react";
import { useMemo, useState } from "react";
import ProductForm from "../../components/product/ProductForm.jsx";
import ProductTable from "../../components/product/ProductTable.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";

export default function ProductManagementPage({ products, categories, editingProduct, onCreate, onEdit, onDelete, onCancelEdit }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => products.filter((product) => {
    const text = `${product.name} ${product.description ?? ""} ${product.category?.name ?? ""}`.toLowerCase();
    const matchesText = text.includes(query.toLowerCase());
    const matchesCategory = category === "all" || product.category?.name === category;
    return matchesText && matchesCategory;
  }), [category, products, query]);

  const totalStock = products.reduce((sum, product) => sum + Number(product.stock ?? 0), 0);
  const totalValue = products.reduce((sum, product) => sum + Number(product.price ?? 0) * Number(product.stock ?? 0), 0);
  const withImages = products.filter((product) => Boolean(product.image)).length;

  return (
    <section className="product-management">
      <div className="product-hero">
        <div>
          <p className="eyebrow">Product Operations</p>
          <h2>Quản lý sản phẩm và hình ảnh catalog</h2>
          <span>Tạo sản phẩm có ảnh, gắn danh mục, theo dõi tồn kho và cập nhật dữ liệu hiển thị cho khách hàng.</span>
        </div>
        <div className="product-hero-stats">
          <article><Package size={20} /><strong>{products.length}</strong><span>Sản phẩm</span></article>
          <article><Boxes size={20} /><strong>{totalStock}</strong><span>Tồn kho</span></article>
          <article><Image size={20} /><strong>{withImages}</strong><span>Có ảnh</span></article>
          <article><Tags size={20} /><strong>{formatCurrency(totalValue)}</strong><span>Giá trị kho</span></article>
        </div>
      </div>

      <div className="management-grid product-management-grid">
        <ProductForm categories={categories} editingProduct={editingProduct} onCreate={onCreate} onCancel={onCancelEdit} />
        <div className="list-stack">
          <div className="toolbar product-toolbar">
            <div className="input-icon grow">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm sản phẩm theo tên, mô tả hoặc danh mục" />
            </div>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Tất cả danh mục</option>
              {categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>
          </div>
          <ProductTable products={filtered} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
    </section>
  );
}
