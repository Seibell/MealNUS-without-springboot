/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javafx.util.Pair;
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
public class Orders implements Serializable { //name is because order dosent work with SQL

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    @Temporal(TemporalType.DATE)
    private Date orderDate;
    
    private List<Pair<MealBox, Integer>> orderDetails;
    
    @Temporal(TemporalType.DATE)
    private Date deliveryDate;
    
    @Enumerated
    private AddressEnum address;
    @Enumerated
    private OrderStatus orderStatus;
    
    @ManyToOne
    private User user;

    public Orders() {
    }

    public Orders(Date orderDate, List<Pair<MealBox, Integer>> orderDetails, Date deliveryDate, AddressEnum address, OrderStatus orderStatus, User user) {
        this.orderDate = orderDate;
        this.orderDetails = orderDetails;
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
        if (!(object instanceof Orders)) {
            return false;
        }
        Orders other = (Orders) object;
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
     * @return the user
     */
    
}
