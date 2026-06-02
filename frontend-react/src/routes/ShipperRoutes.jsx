import DeliveryDetailPage from "../pages/shipper/DeliveryDetailPage.jsx";
import DeliveryListPage from "../pages/shipper/DeliveryListPage.jsx";
import ShipperDashboardPage from "../pages/shipper/ShipperDashboardPage.jsx";

export default function ShipperRoutes({ screen, data, actions }) {
  if (screen === "deliveryList") {
    return (
      <DeliveryListPage
        deliveries={data.deliveries}
        onSelect={actions.openDelivery}
        onReceive={(id) => actions.updateDelivery(id, "PICKED_UP")}
      />
    );
  }

  if (screen === "deliveryDetail") {
    return (
      <DeliveryDetailPage
        delivery={data.selectedDelivery}
        onStatus={actions.updateDelivery}
        onLocation={actions.updateDeliveryLocation}
      />
    );
  }

  return <ShipperDashboardPage stats={data.deliveryStats} deliveries={data.deliveries} />;
}
