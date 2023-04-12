/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javafx.util.Pair;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import util.enumeration.AddressEnum;
import util.enumeration.OrderStatus;

/**
 *
 * @author ryanl
 */
@Entity
public class OrderEntity implements Serializable {
   
//name is because order dosent work with SQL  <-- can i replace with OrderEntity?? -CH
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    private List<Pair<MealBox, Integer>> orderDetails;
    
    private List<MealBox> userorders;
    private List<Integer> quantity;

    private List<BigDecimal> priceList;
    private List<BigDecimal> costList;

//    Q) shld orderAmount be an attribute or be a method in session bean?
//    private BigDecimal orderAmount;
//    Q) similar to orderAmount, how abt profit?
//    private BigDecimal profit;
    @Temporal(TemporalType.DATE)
    private Date deliveryDate;

    @Enumerated
    private AddressEnum address;
    @Enumerated
    private OrderStatus orderStatus;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;

//    Q) is review going to be under orders?
//    @ManyToOne
//    private Review review;
    public OrderEntity() {
    }

    public OrderEntity(Date orderDate, List<Pair<MealBox, Integer>> orderDetails, Date deliveryDate, AddressEnum address, OrderStatus orderStatus, User user) {
        this.orderDate = orderDate;
        this.orderDetails = orderDetails;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.orderStatus = orderStatus;
        this.user = user;
    }

    public OrderEntity(Date orderDate, List<Pair<MealBox, Integer>> orderDetails, List<BigDecimal> priceList, List<BigDecimal> costList, Date deliveryDate, AddressEnum address, OrderStatus orderStatus, User user) {
        this.orderDate = orderDate;
        this.orderDetails = orderDetails;
        this.priceList = priceList;
        this.costList = costList;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.orderStatus = orderStatus;
        this.user = user;
    }

    public OrderEntity(Date orderDate, List<Pair<MealBox, Integer>> orderDetails, List<BigDecimal> priceList, Date deliveryDate, AddressEnum address, OrderStatus orderStatus, User user) {
        this.orderDate = orderDate;
        this.orderDetails =  orderDetails;
        this.priceList = priceList;
        this.deliveryDate = deliveryDate;
        this.address = address;
        this.orderStatus = orderStatus;
        this.user = user;
    }
    
   
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (orderId != null ? orderId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the orderId fields are not set
        if (!(object instanceof OrderEntity)) {
            return false;
        }
        OrderEntity other = (OrderEntity) object;
        if ((this.orderId == null && other.orderId != null) || (this.orderId != null && !this.orderId.equals(other.orderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Order[ id=" + orderId + " ]";
    }

    /**
     * @return the orderDate
     */
    public Date getOrderDate() {
        return orderDate;
    }

    /**
     * @param orderDate the orderDate to set
     */
    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    /**
     * @return the deliveryDate
     */
    public Date getDeliveryDate() {
        return deliveryDate;
    }

    /**
     * @param deliveryDate the deliveryDate to set
     */
    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    /**
     * @return the address
     */
    public AddressEnum getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(AddressEnum address) {
        this.address = address;
    }

    /**
     * @return the orderStatus
     */
    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    /**
     * @param orderStatus the orderStatus to set
     */
    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    /**
     * @return the orderDetails
     */
    public List<Pair<MealBox, Integer>> getOrderDetails() {
        return orderDetails;
    }

    /**
     * @param orderDetails the orderDetails to set
     */
    public void setOrderDetails(List<Pair<MealBox, Integer>> orderDetails) {
        this.orderDetails = orderDetails;
    }

    /**
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return the priceList
     */
    public List<BigDecimal> getPriceList() {
        return priceList;
    }

    /**
     * @param priceList the priceList to set
     */
    public void setPriceList(List<BigDecimal> priceList) {
        this.priceList = priceList;
    }

    /**
     * @return the costList
     */
    public List<BigDecimal> getCostList() {
        return costList;
    }

    /**
     * @param costList the costList to set
     */
    public void setCostList(List<BigDecimal> costList) {
        this.costList = costList;
    }

    public List<MealBox> getUserorders() {
        return userorders;
    }

    public void setUserorders(List<MealBox> userorders) {
        this.userorders = userorders;
    }

    public List<Integer> getQuantity() {
        return quantity;
    }

    public void setQuantity(List<Integer> quantity) {
        this.quantity = quantity;
    }
    
    
}
