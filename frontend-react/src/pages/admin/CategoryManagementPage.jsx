import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryForm from "../../components/category/CategoryForm.jsx";
import CategoryTable from "../../components/category/CategoryTable.jsx";

export default function CategoryManagementPage({ categories, editingCategory, onCreate, onEdit, onDelete, onCancelEdit }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => categories.filter((category) => {
    const text = `${category.name} ${category.description ?? ""}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [categories, query]);

  return (
    <section className="management-grid">
      <CategoryForm editingCategory={editingCategory} onCreate={onCreate} onCancel={onCancelEdit} />
      <div className="list-stack">
        <div className="toolbar">
          <div className="input-icon grow">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm danh mục" />
          </div>
        </div>
        <CategoryTable categories={filtered} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </section>
  );
}
