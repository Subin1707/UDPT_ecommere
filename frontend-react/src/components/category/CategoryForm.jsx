import { FolderPlus, Plus, Save, Sparkles, X } from "lucide-react";

export default function CategoryForm({ editingCategory, onCreate, onCancel }) {
  return (
    <form className="panel compact-form category-form-card" onSubmit={onCreate} key={editingCategory?.id ?? "new-category"}>
      <div className="form-card-head">
        <div className="form-icon">
          <FolderPlus size={22} />
        </div>
        <div>
          <p className="eyebrow">{editingCategory ? "Category Editor" : "New Category"}</p>
          <h3>{editingCategory ? "Sửa danh mục" : "Thêm danh mục"}</h3>
        </div>
      </div>

      <label>
        Tên danh mục
        <input name="name" placeholder="Ví dụ: Điện thoại" defaultValue={editingCategory?.name ?? ""} required />
      </label>
      <label>
        Mô tả
        <input name="description" placeholder="Mô tả ngắn về nhóm sản phẩm" defaultValue={editingCategory?.description ?? ""} required />
      </label>

      <div className="category-form-note">
        <Sparkles size={16} />
        <span>Danh mục sẽ xuất hiện trong form tạo sản phẩm và bộ lọc sản phẩm của khách hàng.</span>
      </div>

      {editingCategory && <input name="id" type="hidden" value={editingCategory.id} />}
      <button className="primary-button" type="submit">
        {editingCategory ? <Save size={18} /> : <Plus size={18} />}
        {editingCategory ? "Lưu thay đổi" : "Thêm danh mục"}
      </button>
      {editingCategory && (
        <button className="secondary-button" type="button" onClick={onCancel}>
          <X size={18} />
          Hủy chỉnh sửa
        </button>
      )}
    </form>
  );
}
