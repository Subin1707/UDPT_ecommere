export const money = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0
});

export function formatCurrency(value) {
  return money.format(Number(value ?? 0));
}
