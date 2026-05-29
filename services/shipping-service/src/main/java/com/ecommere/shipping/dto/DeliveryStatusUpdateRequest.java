package com.ecommere.shipping.dto;

public class DeliveryStatusUpdateRequest {

    private String status;

    private String shipperName;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShipperName() {
        return shipperName;
    }

    public void setShipperName(String shipperName) {
        this.shipperName = shipperName;
    }
}
