import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProductForm from "../../components/product/ProductForm.jsx";
import ProductTable from "../../components/product/ProductTable.jsx";

export default function ProductManagementPage({ products, categories, editingProduct, onCreate, onEdit, onDelete, onCancelEdit }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => products.filter((product) => {
    const text = `${product.name} ${product.description ?? ""} ${product.category?.name ?? ""}`.toLowerCase();
    const matchesText = text.includes(query.toLowerCase());
    const matchesCategory = category === "all" || product.category?.name === category;
    return matchesText && matchesCategory;
  }), [category, products, query]);

  return (
    <section className="management-grid">
      <ProductForm categories={categories} editingProduct={editingProduct} onCreate={onCreate} onCancel={onCancelEdit} />
      <div className="list-stack">
        <div className="toolbar">
          <div className="input-icon grow">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm sản phẩm" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">Tất cả danh mục</option>
            {categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
          </select>
        </div>
        <ProductTable products={filtered} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </section>
  );
}
