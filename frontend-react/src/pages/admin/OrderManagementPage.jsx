import { Edit3, ListFilter, Save, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "../../components/common/DataTable.jsx";

export default function OrderManagementPage({ orders, status, editingOrder, onStatus, onEdit, onUpdate, onDelete, onCancelEdit }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => orders.filter((order) => {
    const matchesStatus = status === "all" || order.status === status;
    const text = `#${order.id} ${order.customerName} ${order.productId} ${order.status}`.toLowerCase();
    return matchesStatus && text.includes(query.toLowerCase());
  }), [orders, query, status]);

  return (
    <section className="list-stack">
      {editingOrder && (
        <form className="panel compact-form inline-edit-form" onSubmit={onUpdate} key={editingOrder.id}>
          <h3>Sửa đơn #{editingOrder.id}</h3>
          <input name="id" type="hidden" value={editingOrder.id} />
          <input name="customerName" placeholder="Khách hàng" defaultValue={editingOrder.customerName} required />
          <input name="productId" type="number" placeholder="Product ID" defaultValue={editingOrder.productId} required />
          <input name="quantity" type="number" placeholder="Số lượng" defaultValue={editingOrder.quantity} required />
          <select name="status" defaultValue={editingOrder.status}>
            <option value="CREATED">CREATED</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="PICKED_UP">PICKED_UP</option>
            <option value="DELIVERING">DELIVERING</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
          <button className="primary-button" type="submit"><Save size={18} />Lưu</button>
          <button className="secondary-button" type="button" onClick={onCancelEdit}><X size={18} />Hủy</button>
        </form>
      )}

      <div className="toolbar">
        <div className="input-icon grow">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo mã đơn, khách hàng, sản phẩm" />
        </div>
        <ListFilter size={18} />
        <select value={status} onChange={(event) => onStatus(event.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          <option value="CREATED">CREATED</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="PICKED_UP">PICKED_UP</option>
          <option value="DELIVERING">DELIVERING</option>
          <option value="DELIVERED">DELIVERED</option>
        </select>
      </div>
      <DataTable
        columns={["Order ID", "Khách hàng", "Sản phẩm", "Số lượng", "Trạng thái", "Thao tác"]}
        rows={filtered.map((order) => [
          `#${order.id}`,
          order.customerName,
          order.productId,
          order.quantity,
          order.status,
          <div className="button-row table-actions">
            <button className="secondary-button" type="button" onClick={() => onEdit(order)}>
              <Edit3 size={16} />
              Sửa
            </button>
            <button className="secondary-button danger-button" type="button" onClick={() => onDelete(order.id)}>
              <Trash2 size={16} />
              Xóa
            </button>
          </div>
        ])}
      />
    </section>
  );
}
