package com.ecommere.shipping.event;

public class OrderCreatedEvent {

    private Long orderId;
    private Long productId;
    private Integer quantity;
    private String customerName;
    private String status;

    public OrderCreatedEvent() {
    }

    public OrderCreatedEvent(Long orderId, Long productId, Integer quantity, String customerName, String status) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.customerName = customerName;
        this.status = status;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
