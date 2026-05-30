import { Plus, Save, X } from "lucide-react";

export default function CategoryForm({ editingCategory, onCreate, onCancel }) {
  return (
    <form className="panel compact-form" onSubmit={onCreate} key={editingCategory?.id ?? "new-category"}>
      <h3>{editingCategory ? "Sửa danh mục" : "Thêm danh mục"}</h3>
      <input name="name" placeholder="Tên danh mục" defaultValue={editingCategory?.name ?? ""} required />
      <input name="description" placeholder="Mô tả" defaultValue={editingCategory?.description ?? ""} required />
      {editingCategory && <input name="id" type="hidden" value={editingCategory.id} />}
      <button className="primary-button" type="submit">
        {editingCategory ? <Save size={18} /> : <Plus size={18} />}
        {editingCategory ? "Lưu" : "Thêm"}
      </button>
      {editingCategory && (
        <button className="secondary-button" type="button" onClick={onCancel}>
          <X size={18} />
          Hủy
        </button>
      )}
    </form>
  );
}
