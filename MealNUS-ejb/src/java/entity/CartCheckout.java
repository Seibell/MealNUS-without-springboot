/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author ryanl
 */
@Entity
public class CartCheckout implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;
    private List<MealBox> items;

    public CartCheckout() {
    }

    public CartCheckout(List<MealBox> items) {
        this.items = items;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cartId != null ? cartId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the cartId fields are not set
        if (!(object instanceof CartCheckout)) {
            return false;
        }
        CartCheckout other = (CartCheckout) object;
        if ((this.cartId == null && other.cartId != null) || (this.cartId != null && !this.cartId.equals(other.cartId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.CartCheckout[ id=" + cartId + " ]";
    }

    /**
     * @return the items
     */
    public List<MealBox> getItems() {
        return items;
    }

    /**
     * @param items the items to set
     */
    public void setItems(List<MealBox> items) {
        this.items = items;
    }
    
}
