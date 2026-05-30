export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="dialog-backdrop">
      <div className="panel dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="button-row">
          <button className="secondary-button" onClick={onCancel}>Huy</button>
          <button className="primary-button" onClick={onConfirm}>Xac nhan</button>
        </div>
      </div>
    </div>
  );
}
