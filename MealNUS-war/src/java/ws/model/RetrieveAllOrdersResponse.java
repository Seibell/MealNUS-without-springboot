/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.OrderEntity;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Darie
 */
@XmlRootElement

public class RetrieveAllOrdersResponse {
    private List<OrderEntity> orders;

    public RetrieveAllOrdersResponse() {
        orders = new ArrayList<>();
    }

    public RetrieveAllOrdersResponse(List<OrderEntity> orders) {
        this.orders = orders;
    }

    @XmlElements({
        @XmlElement(name = "order", type = OrderEntity.class)
    })
    @XmlElementWrapper
    public List<OrderEntity> getOrderEntities() {
        return orders;
    }

    public void setPromotionEntities(List<OrderEntity> orders) {
        this.orders = orders;
    }
}
