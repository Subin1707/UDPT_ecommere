import {
  ArrowRight,
  Award,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Cpu,
  Layers3,
  PackageCheck,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  Wrench
} from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";

function getProductDetailProfile(product) {
  const category = product.category?.name?.toLowerCase() ?? "";
  const name = product.name?.toLowerCase() ?? "";

  if (category.includes("laptop") || name.includes("laptop")) {
    return {
      material: "Vỏ nhôm phay xước, bản lề thép gia cường, bàn phím chống bám vân tay.",
      configuration: [
        ["CPU", "Intel Core i5 / Ryzen 5"],
        ["RAM", "16GB DDR4"],
        ["Ổ cứng", "512GB SSD NVMe"],
        ["Màn hình", "15.6 inch Full HD"],
        ["Pin", "6-8 giờ sử dụng hỗn hợp"],
        ["Bảo hành", "12 tháng"]
      ],
      rating: 4.8,
      reviews: 128,
      highlights: ["Khởi động nhanh", "Phù hợp học tập và văn phòng", "Thiết kế gọn nhẹ"]
    };
  }

  if (category.includes("âm thanh") || name.includes("tai nghe")) {
    return {
      material: "Đệm tai da protein mềm, khung nhựa ABS, lõi loa phủ màng composite.",
      configuration: [
        ["Kết nối", "Bluetooth 5.3"],
        ["Pin", "30 giờ nghe nhạc"],
        ["Sạc", "USB-C nhanh"],
        ["Driver", "40mm Dynamic"],
        ["Chống ồn", "ENC cuộc gọi"],
        ["Bảo hành", "6 tháng"]
      ],
      rating: 4.7,
      reviews: 96,
      highlights: ["Âm bass rõ", "Đeo lâu không đau tai", "Kết nối ổn định"]
    };
  }

  if (category.includes("thời trang") || category.includes("quần") || name.includes("váy") || name.includes("áo")) {
    return {
      material: "Vải cotton pha polyester, bề mặt mềm, form giữ dáng và dễ giặt.",
      configuration: [
        ["Chất liệu", "Cotton 65% / Polyester 35%"],
        ["Size", "S, M, L, XL"],
        ["Form", "Regular fit"],
        ["Màu sắc", "Theo từng lô hàng"],
        ["Bảo quản", "Giặt nhẹ, tránh sấy nóng"],
        ["Đổi trả", "7 ngày"]
      ],
      rating: 4.6,
      reviews: 74,
      highlights: ["Form dễ mặc", "Chất vải thoáng", "Phù hợp đi học và đi làm"]
    };
  }

  if (category.includes("phụ kiện") || name.includes("chuột") || name.includes("bàn phím") || name.includes("balo")) {
    return {
      material: "Nhựa ABS cao cấp, bề mặt nhám chống trượt, linh kiện chịu va đập tốt.",
      configuration: [
        ["Kết nối", "USB / Wireless tùy mẫu"],
        ["Độ bền", "Trên 5 triệu lần bấm"],
        ["Trọng lượng", "Nhẹ, dễ mang theo"],
        ["Tương thích", "Windows, macOS"],
        ["Đóng gói", "Hộp bảo vệ chống sốc"],
        ["Bảo hành", "6 tháng"]
      ],
      rating: 4.5,
      reviews: 88,
      highlights: ["Dễ sử dụng", "Bền trong môi trường văn phòng", "Giá tốt"]
    };
  }

  return {
    material: "Hoàn thiện chắc chắn, đóng gói tiêu chuẩn thương mại điện tử.",
    configuration: [
      ["Nguồn gốc", "Hàng chính hãng"],
      ["Tình trạng", "Mới 100%"],
      ["Đóng gói", "Hộp tiêu chuẩn"],
      ["Kiểm tra", "Đồng bộ qua Product Service"],
      ["Giao hàng", "Shipping Service xử lý"],
      ["Bảo hành", "Theo chính sách hệ thống"]
    ],
    rating: 4.6,
    reviews: 52,
    highlights: ["Thông tin rõ ràng", "Tồn kho cập nhật", "Đặt hàng nhanh"]
  };
}

export default function ProductDetailPage({ product, onOrder, onAddToCart }) {
  if (!product) return <div className="empty-state">Chưa có sản phẩm.</div>;

  const stock = Number(product.stock ?? 0);
  const stockLevel = Math.min(100, stock * 10);
  const detailProfile = getProductDetailProfile(product);

  return (
    <section className="product-detail-page">
      <div className="product-detail-hero">
        <div className="product-gallery-panel" style={{ "--detail-image-url": `url(${product.image})` }}>
          <img className="detail-image" src={product.image} alt={product.name} />
          <div className="product-gallery-badges">
            <span><Boxes size={15} />{product.category?.name ?? "General"}</span>
            <span><PackageCheck size={15} />Còn {stock} sản phẩm</span>
            <span><Star size={15} />{detailProfile.rating}/5</span>
          </div>
        </div>

        <div className="panel detail-copy premium-detail-copy">
          <span className="status-pill">{product.category?.name ?? "General"}</span>
          <div>
            <p className="eyebrow">Product Detail</p>
            <h2>{product.name}</h2>
          </div>
          <p>{product.description || "Sản phẩm đang được cập nhật mô tả chi tiết."}</p>

          <div className="detail-rating-row">
            <div>
              <strong>{detailProfile.rating}</strong>
              <span>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill={index < Math.round(detailProfile.rating) ? "currentColor" : "none"} />
                ))}
              </span>
            </div>
            <p>{detailProfile.reviews} đánh giá đã đồng bộ</p>
          </div>

          <div className="detail-price-box">
            <span>Giá bán</span>
            <strong>{formatCurrency(product.price)}</strong>
          </div>

          <div className="detail-stock-card">
            <div className="meta-row">
              <span>Tồn kho hiện tại</span>
              <strong>{stock}</strong>
            </div>
            <div className="detail-stock-bar">
              <span style={{ width: `${stockLevel}%` }} />
            </div>
          </div>

          <div className="detail-benefits">
            <span><ShieldCheck size={17} />Xác thực đơn qua Order Service</span>
            <span><Truck size={17} />Giao hàng bởi Shipping Service</span>
            <span><CheckCircle2 size={17} />Theo dõi trạng thái sau khi đặt</span>
          </div>

          <div className="detail-action-row">
            <button className="primary-button detail-order-button" onClick={onOrder}>
              <ShoppingBag size={18} />
              Đặt hàng ngay
              <ArrowRight size={18} />
            </button>
            <button className="secondary-button detail-cart-button" type="button" onClick={() => onAddToCart(product.id)}>
              <ShoppingCart size={18} />
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>

      <div className="detail-rich-grid">
        <article className="panel detail-spec-panel">
          <div className="detail-panel-title">
            <Cpu size={20} />
            <div>
              <p className="eyebrow">Cấu hình</p>
              <h3>Thông số sản phẩm</h3>
            </div>
          </div>
          <div className="detail-spec-list">
            {detailProfile.configuration.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel detail-material-panel">
          <div className="detail-panel-title">
            <Layers3 size={20} />
            <div>
              <p className="eyebrow">Chất liệu</p>
              <h3>Hoàn thiện và đóng gói</h3>
            </div>
          </div>
          <p>{detailProfile.material}</p>
          <div className="detail-highlight-list">
            {detailProfile.highlights.map((item) => (
              <span key={item}><CheckCircle2 size={16} />{item}</span>
            ))}
          </div>
        </article>

        <article className="panel detail-review-panel">
          <div className="detail-panel-title">
            <Award size={20} />
            <div>
              <p className="eyebrow">Đánh giá</p>
              <h3>Phản hồi khách hàng</h3>
            </div>
          </div>
          <div className="detail-review-score">
            <strong>{detailProfile.rating}</strong>
            <span>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={17} fill={index < Math.round(detailProfile.rating) ? "currentColor" : "none"} />
              ))}
            </span>
            <p>{detailProfile.reviews} lượt đánh giá</p>
          </div>
          <blockquote>
            Sản phẩm đúng mô tả, tồn kho rõ ràng, thao tác đặt hàng nhanh và có trạng thái giao hàng để theo dõi.
          </blockquote>
        </article>
      </div>

      <div className="detail-flow-strip">
        <article><ShoppingBag size={20} /><strong>Chọn sản phẩm</strong><span>Khách hàng xem chi tiết, cấu hình, chất liệu và đánh giá.</span></article>
        <article><ClipboardList size={20} /><strong>Tạo đơn</strong><span>Order Service lưu đơn hàng và phát Kafka event.</span></article>
        <article><Truck size={20} /><strong>Giao hàng</strong><span>Shipping Service nhận event và tạo delivery.</span></article>
        <article><Ruler size={20} /><strong>Kiểm tra</strong><span>Thông số giúp khách hàng quyết định trước khi đặt.</span></article>
        <article><Wrench size={20} /><strong>Bảo hành</strong><span>Thông tin bảo hành được trình bày theo từng nhóm sản phẩm.</span></article>
      </div>
    </section>
  );
}
