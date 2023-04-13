/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.MealBox;
import java.util.Date;
import java.util.List;
import javafx.util.Pair;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;

/**
 *
 * @author kylie
 */
public class UpdateOrderResponse {

    private Long orderId;
    private Date deliveryDate;
    private AddressEnum address;
    private OrderStatus orderStatus;

    public UpdateOrderResponse() {
    }

    public UpdateOrderResponse(Long orderId, Date deliveryDate, AddressEnum address, OrderStatus orderStatus) {
        this.orderId = orderId;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.orderStatus = orderStatus;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public AddressEnum getAddress() {
        return address;
    }

    public void setAddress(AddressEnum address) {
        this.address = address;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

  
}
