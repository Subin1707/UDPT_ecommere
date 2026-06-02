import { CheckCircle2, PackageCheck, Route, UserRoundCheck } from "lucide-react";

export default function DeliveryStatusForm({ delivery, onStatus }) {
  if (!delivery) return <div className="empty-state">Chưa có đơn giao.</div>;

  const actions = [
    { status: "PICKED_UP", label: "Nhận đơn", icon: UserRoundCheck },
    { status: "DELIVERING", label: "Bắt đầu giao", icon: Route },
    { status: "DELIVERED", label: "Đã giao", icon: CheckCircle2 }
  ];

  return (
    <div className="delivery-status-actions">
      {actions.map((action) => {
        const Icon = action.icon;
        const primary = action.status === "DELIVERED";

        return (
          <button
            className={primary ? "primary-button" : "secondary-button"}
            key={action.status}
            onClick={() => onStatus(delivery.id, action.status)}
            disabled={delivery.status === action.status}
          >
            <Icon size={18} />
            {action.label}
          </button>
        );
      })}
      <span><PackageCheck size={16} />Cập nhật trạng thái sẽ lưu vào Shipping Service.</span>
    </div>
  );
}
