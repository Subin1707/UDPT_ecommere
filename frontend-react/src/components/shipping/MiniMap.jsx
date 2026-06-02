import { divIcon } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

const shipperIcon = divIcon({
  className: "mini-map-marker shipper-marker",
  html: "<span>🚚</span>",
  iconSize: [38, 38],
  iconAnchor: [19, 19]
});

const customerIcon = divIcon({
  className: "mini-map-marker customer-marker",
  html: "<span>⌂</span>",
  iconSize: [38, 38],
  iconAnchor: [19, 19]
});

function safeNumber(value, fallback) {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
}

export default function MiniMap({ delivery }) {
  const shipperPos = [
    safeNumber(delivery?.shipperLat, 21.0285),
    safeNumber(delivery?.shipperLng, 105.8542)
  ];
  const customerPos = [
    safeNumber(delivery?.customerLat, 21.0350),
    safeNumber(delivery?.customerLng, 105.8340)
  ];
  const mapKey = `${shipperPos.join(",")}-${customerPos.join(",")}`;

  return (
    <div className="mini-map-shell">
      <MapContainer key={mapKey} center={shipperPos} zoom={14} scrollWheelZoom={false} className="mini-map">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={shipperPos} icon={shipperIcon}>
          <Popup>Shipper đang giao hàng</Popup>
        </Marker>

        <Marker position={customerPos} icon={customerIcon}>
          <Popup>Địa chỉ khách hàng</Popup>
        </Marker>

        <Polyline positions={[shipperPos, customerPos]} pathOptions={{ color: "#0f9676", weight: 5, opacity: 0.78 }} />
      </MapContainer>
    </div>
  );
}
