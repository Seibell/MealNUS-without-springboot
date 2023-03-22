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
import javax.persistence.OneToOne;

/**
 *
 * @author ryanl
 */
@Entity
public class WishList implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishListId;
    private List<MealBox> wishListItems;

    public WishList() {
    }

    public WishList(List<MealBox> wishlistItems) {
        this.wishListItems = wishlistItems;
    }

    public Long getWishListId() {
        return wishListId;
    }

    public void setWishListId(Long wishListId) {
        this.wishListId = wishListId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (wishListId != null ? wishListId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the wishListId fields are not set
        if (!(object instanceof WishList)) {
            return false;
        }
        WishList other = (WishList) object;
        if ((this.wishListId == null && other.wishListId != null) || (this.wishListId != null && !this.wishListId.equals(other.wishListId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.WishList[ id=" + wishListId + " ]";
    }

    /**
     * @return the wishListItems
     */
    public List<MealBox> getWishListItems() {
        return wishListItems;
    }

    /**
     * @param wishListItems the wishListItems to set
     */
    public void setWishListItems(List<MealBox> wishListItems) {
        this.wishListItems = wishListItems;
    }
    
}
