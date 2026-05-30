import { Edit3, Trash2 } from "lucide-react";
import DataTable from "../common/DataTable.jsx";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <DataTable
      columns={["ID", "Tên danh mục", "Mô tả", "Thao tác"]}
      rows={categories.map((item) => [
        item.id,
        item.name,
        item.description,
        <div className="button-row table-actions">
          <button className="secondary-button" type="button" onClick={() => onEdit(item)}>
            <Edit3 size={16} />
            Sửa
          </button>
          <button className="secondary-button danger-button" type="button" onClick={() => onDelete(item.id)}>
            <Trash2 size={16} />
            Xóa
          </button>
        </div>
      ])}
    />
  );
}
