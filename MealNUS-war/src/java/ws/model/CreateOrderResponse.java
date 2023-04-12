/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.MealBox;
import java.util.Date;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;

/**
 *
 * @author Jester
 */
public class CreateOrderResponse {

    private Date orderDate;
    private MealBox[] mealboxes;
    private Integer[] quantities;
    private Date deliveryDate;
    private AddressEnum address;
    private OrderStatus orderStatus;
    private Long userId;

    public CreateOrderResponse() {
    }

    public CreateOrderResponse(Date orderDate, MealBox[] mealboxes, Integer[] quantities, Date deliveryDate, AddressEnum address, OrderStatus orderStatus, Long userId) {
        this.orderDate = orderDate;
        this.mealboxes = mealboxes;
        this.quantities = quantities;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.orderStatus = orderStatus;
        this.userId = userId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public MealBox[] getMealboxes() {
        return mealboxes;
    }

    public void setMealboxes(MealBox[] mealboxes) {
        this.mealboxes = mealboxes;
    }

    public Integer[] getQuantities() {
        return quantities;
    }

    public void setQuantities(Integer[] quantities) {
        this.quantities = quantities;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    

}
