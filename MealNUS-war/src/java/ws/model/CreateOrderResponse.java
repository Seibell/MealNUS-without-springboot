/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.CreditCard;
import entity.MealBox;
import java.util.Date;
import java.util.List;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;

/**
 *
 * @author Jester
 */
public class CreateOrderResponse {

    private Date orderDate;
    private List<MealBox> mealBoxes;
    private List<Integer> quantities;
    private Date deliveryDate;
    private AddressEnum address;
    private OrderStatus orderStatus;
    private Long userId;
    private Long creditCardId;

    public CreateOrderResponse() {
    }

    public CreateOrderResponse(Date orderDate, List<MealBox> mealBoxes, List<Integer> quantities, Date deliveryDate, AddressEnum address, OrderStatus orderStatus, Long userId, Long creditCardId) {
        this.orderDate = orderDate;
        this.mealBoxes = mealBoxes;
        this.quantities = quantities;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.orderStatus = orderStatus;
        this.userId = userId;
        this.creditCardId = creditCardId;
    }

    public Long getCreditCardId() {
        return creditCardId;
    }

    public void setCreditCardId(Long creditCardId) {
        this.creditCardId = creditCardId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
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

    public List<MealBox> getMealBoxes() {
        return mealBoxes;
    }

    public void setMealBoxes(List<MealBox> mealBoxes) {
        this.mealBoxes = mealBoxes;
    }

    public List<Integer> getQuantities() {
        return quantities;
    }

    public void setQuantities(List<Integer> quantities) {
        this.quantities = quantities;
    }

}
