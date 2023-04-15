/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

/**
 *
 * @author ryanl
 */
@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    @NotNull
    private String firstName;

    @Column(nullable = false)
    @NotNull
    private String lastName;

    @Column(nullable = false, unique = true)
    @NotNull
    private String email;

    @Column(nullable = false)
    @NotNull
    private String password;

    @Column(nullable = false)
    @NotNull
    private Date signupDate;

    private String imageURL;

    @OneToMany
    private List<Review> reviews;
    
    private List<OrderEntity> orders;
    
    @OneToMany
    private List<CreditCard> creditCards;

    // Added just in case we are still displaying product detail and the number of wishlists its in
//    @OneToOne
//    private WishList wishList;
    public User() {
    }

    //Default constructor (upon account signup)
    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageURL = "https://i.imgur.com/Kvyecsm.png"; //profs face :D
        this.signupDate = new Date();
        this.reviews = new ArrayList<>();
        this.orders = new ArrayList<>();
        this.creditCards = new ArrayList<>();
    }

    //Use this constructor for uploading image
    public User(String firstName, String lastName, String email, String password, String imageURL) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.imageURL = imageURL;
        this.reviews = new ArrayList<>();
        this.orders = new ArrayList<>();
        this.creditCards = new ArrayList<>();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the userId fields are not set
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.User[ id=" + userId + " ]";
    }

    /**
     * @return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

//    /**
//     * @return the wishList
//     */
//    public WishList getWishList() {
//        return wishList;
//    }
//
//    /**
//     * @param wishList the wishList to set
//     */
//    public void setWishList(WishList wishList) {
//        this.wishList = wishList;
//    }
    /**
     * @return the imageURL
     */
    public String getImageURL() {
        return imageURL;
    }

    /**
     * @param imageURL the imageURL to set
     */
    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    /**
     * @return the reviews
     */
    public List<Review> getReviews() {
        return reviews;
    }

    /**
     * @param reviews the reviews to set
     */
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    /**
     * @return the orders
     */
    public List<OrderEntity> getOrders() {
        return orders;
    }

    /**
     * @param orders the orders to set
     */
    public void setOrders(List<OrderEntity> orders) {
        this.orders = orders;
    }

    /**
     * @return the creditCards
     */
    public List<CreditCard> getCreditCards() {
        return creditCards;
    }

    /**
     * @param creditCards the creditCards to set
     */
    public void setCreditCards(List<CreditCard> creditCards) {
        this.creditCards = creditCards;
    }

    /**
     * @return the signupDate
     */
    public Date getSignupDate() {
        return signupDate;
    }

    /**
     * @param signupDate the signupDate to set
     */
    public void setSignupDate(Date signupDate) {
        this.signupDate = signupDate;
    }

}
