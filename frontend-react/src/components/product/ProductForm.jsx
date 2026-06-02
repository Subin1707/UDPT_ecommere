import { ImagePlus, PackagePlus, Plus, Save, Sparkles, X } from "lucide-react";

export default function ProductForm({ categories, editingProduct, onCreate, onCancel }) {
  const currentImage = editingProduct?.images?.[0]?.imageUrl ?? editingProduct?.image ?? "";

  return (
    <form className="panel compact-form product-form-card" onSubmit={onCreate} key={editingProduct?.id ?? "new-product"}>
      <div className="form-card-head">
        <div className="form-icon product-form-icon">
          <PackagePlus size={22} />
        </div>
        <div>
          <p className="eyebrow">{editingProduct ? "Product Editor" : "New Product"}</p>
          <h3>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
        </div>
      </div>

      {currentImage ? (
        <img className="product-form-preview" src={currentImage} alt="Ảnh sản phẩm" />
      ) : (
        <div className="product-form-placeholder">
          <ImagePlus size={24} />
          <span>Ảnh sẽ hiển thị sau khi nhập URL</span>
        </div>
      )}

      <label>
        Tên sản phẩm
        <input name="name" placeholder="Ví dụ: Laptop Dell XPS" defaultValue={editingProduct?.name ?? ""} required />
      </label>
      <label>
        Mô tả
        <input name="description" placeholder="Mô tả ngắn cho sản phẩm" defaultValue={editingProduct?.description ?? ""} required />
      </label>
      <label>
        Giá
        <input name="price" type="number" placeholder="15000000" defaultValue={editingProduct?.price ?? ""} required />
      </label>
      <label>
        Kho
        <input name="quantity" type="number" placeholder="10" defaultValue={editingProduct?.stock ?? ""} disabled={Boolean(editingProduct)} required={!editingProduct} />
      </label>
      <label>
        URL ảnh sản phẩm
        <div className="input-icon">
          <ImagePlus size={18} />
          <input name="imageUrl" type="url" placeholder="https://..." defaultValue={currentImage} required />
        </div>
      </label>
      <label>
        Danh mục
        <select name="categoryId" defaultValue={editingProduct?.category?.id ?? categories[0]?.id ?? ""} required>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>

      <div className="category-form-note">
        <Sparkles size={16} />
        <span>Ảnh sản phẩm sẽ được lưu cùng sản phẩm và hiển thị cho khách hàng khi xem catalog.</span>
      </div>

      {editingProduct && <input name="id" type="hidden" value={editingProduct.id} />}
      <button className="primary-button" type="submit">
        {editingProduct ? <Save size={18} /> : <Plus size={18} />}
        {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
      </button>
      {editingProduct && (
        <button className="secondary-button" type="button" onClick={onCancel}>
          <X size={18} />
          Hủy chỉnh sửa
        </button>
      )}
    </form>
  );
}
