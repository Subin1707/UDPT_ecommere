import { ImagePlus, Plus, Save, X } from "lucide-react";

export default function ProductForm({ categories, editingProduct, onCreate, onCancel }) {
  const currentImage = editingProduct?.images?.[0]?.imageUrl ?? editingProduct?.image ?? "";

  return (
    <form className="panel compact-form" onSubmit={onCreate} key={editingProduct?.id ?? "new-product"}>
      <h3>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
      <input name="name" placeholder="Tên" defaultValue={editingProduct?.name ?? ""} required />
      <input name="description" placeholder="Mô tả" defaultValue={editingProduct?.description ?? ""} required />
      <input name="price" type="number" placeholder="Giá" defaultValue={editingProduct?.price ?? ""} required />
      <input name="quantity" type="number" placeholder="Kho" defaultValue={editingProduct?.stock ?? ""} disabled={Boolean(editingProduct)} required={!editingProduct} />
      <div className="input-icon">
        <ImagePlus size={18} />
        <input name="imageUrl" type="url" placeholder="URL ảnh sản phẩm" defaultValue={currentImage} required />
      </div>
      <select name="categoryId" defaultValue={editingProduct?.category?.id ?? categories[0]?.id ?? ""} required>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      {editingProduct && <input name="id" type="hidden" value={editingProduct.id} />}
      <button className="primary-button" type="submit">
        {editingProduct ? <Save size={18} /> : <Plus size={18} />}
        {editingProduct ? "Lưu" : "Thêm"}
      </button>
      {editingProduct && (
        <button className="secondary-button" type="button" onClick={onCancel}>
          <X size={18} />
          Hủy
        </button>
      )}
    </form>
  );
}
