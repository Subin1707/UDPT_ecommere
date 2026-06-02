package com.ecommere.shipping.dto;

public class DeliveryLocationUpdateRequest {

    private Double shipperLat;

    private Double shipperLng;

    public Double getShipperLat() {
        return shipperLat;
    }

    public void setShipperLat(Double shipperLat) {
        this.shipperLat = shipperLat;
    }

    public Double getShipperLng() {
        return shipperLng;
    }

    public void setShipperLng(Double shipperLng) {
        this.shipperLng = shipperLng;
    }
}
