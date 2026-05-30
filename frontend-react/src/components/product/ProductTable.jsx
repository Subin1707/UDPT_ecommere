import { Edit3, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";
import DataTable from "../common/DataTable.jsx";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <DataTable
      columns={["Ảnh", "Tên", "Giá", "Kho", "Danh mục", "Thao tác"]}
      rows={products.map((product) => [
        <img className="table-image" src={product.image} alt={product.name} />,
        product.name,
        formatCurrency(product.price),
        product.stock,
        product.category?.name ?? "-",
        <div className="button-row table-actions">
          <button className="secondary-button" type="button" onClick={() => onEdit(product)}>
            <Edit3 size={16} />
            Sửa
          </button>
          <button className="secondary-button danger-button" type="button" onClick={() => onDelete(product.id)}>
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      ])}
    />
  );
}
