/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

/**
 *
 * @author ryanl
 */
@Entity
public class MealBox implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mealBoxId;

    @Column(nullable = false)
    @NotNull
    private String itemName;

    @Column(unique = true, nullable = false)
    @NotNull
    private Long ItemCode;

    @Column(nullable = false)
    @NotNull
    private String itemImage;

    @Column(nullable = false)
    @NotNull
    private BigDecimal itemCost;

    @Column(nullable = false)
    @NotNull
    private BigDecimal itemPrice;

    @Column(nullable = false)
    @NotNull
    private String itemDescription;

    @Column(nullable = false)
    @NotNull
    private Integer quantityAvailable;

    @Column(nullable = false)
    @NotNull
    private boolean isPromotionApplied;

    @Column(nullable = false)
    @NotNull
    private boolean StatusAvail;

    @ManyToMany
    private List<Allergen> allergens;

    @ManyToMany
    private List<Ingredient> ingredients;

    @ManyToMany
    private List<Category> categories;

    @OneToMany
    private List<Review> reviews;

    public MealBox() {
        this.allergens = new ArrayList<>();
        this.ingredients = new ArrayList<>();
        this.categories = new ArrayList<>();
        this.reviews = new ArrayList<>();
        this.StatusAvail = true;
    }

    public MealBox(String itemImage, String itemName, Long ItemCode, BigDecimal itemCost, BigDecimal itemPrice, String itemDescription, Integer quantityAvailable) {
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.ItemCode = ItemCode;
        this.itemCost = itemCost;
        this.itemPrice = itemPrice;
        this.itemDescription = itemDescription;
        this.quantityAvailable = quantityAvailable;
        this.allergens = new ArrayList<>();
        this.ingredients = new ArrayList<>();
        this.categories = new ArrayList<>();
        this.reviews = new ArrayList<>();
        this.StatusAvail = true;
    }

    public MealBox(String itemName, Long ItemCode, BigDecimal itemCost, BigDecimal itemPrice, String itemDescription, Integer quantityAvailable) {
        this.itemName = itemName;
        this.ItemCode = ItemCode;
        this.itemCost = itemCost;
        this.itemPrice = itemPrice;
        this.itemDescription = itemDescription;
        this.quantityAvailable = quantityAvailable;
        this.StatusAvail = true;
    }

    public MealBox(String itemName, Long ItemCode, String itemImage, BigDecimal itemPrice, BigDecimal itemCost, String itemDescription, Integer quantityAvailable) {
        this.itemName = itemName;
        this.ItemCode = ItemCode;
        this.itemImage = itemImage;
        this.itemPrice = itemPrice;
        this.itemCost = itemCost;
        this.itemDescription = itemDescription;
        this.quantityAvailable = quantityAvailable;
        this.allergens = new ArrayList<>();
        this.ingredients = new ArrayList<>();
        this.categories = new ArrayList<>();
        this.StatusAvail = true;
    }

    public MealBox(String itemName, Long ItemCode, String itemImage, BigDecimal itemCost, BigDecimal itemPrice, String itemDescription, Integer quantityAvailable, List<Ingredient> ingredients) {
        this.itemName = itemName;
        this.ItemCode = ItemCode;
        this.itemImage = itemImage;
        this.itemCost = itemCost;
        this.itemPrice = itemPrice;
        this.itemDescription = itemDescription;
        this.quantityAvailable = quantityAvailable;
        this.ingredients = ingredients;
        this.StatusAvail = true;
    }

    public MealBox(String itemName, Long ItemCode, String itemImage, BigDecimal itemCost, BigDecimal itemPrice, String itemDescription, Integer quantityAvailable, List<Allergen> allergens, List<Ingredient> ingredients, List<Category> categories) {
        this.itemName = itemName;
        this.ItemCode = ItemCode;
        this.itemImage = itemImage;
        this.itemCost = itemCost;
        this.itemPrice = itemPrice;
        this.itemDescription = itemDescription;
        this.quantityAvailable = quantityAvailable;
        this.allergens = allergens;
        this.ingredients = ingredients;
        this.categories = categories;
        this.StatusAvail = true;
    }

    public Long getMealBoxId() {
        return mealBoxId;
    }

    public void setMealBoxId(Long mealBoxId) {
        this.mealBoxId = mealBoxId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mealBoxId != null ? mealBoxId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the mealBoxId fields are not set
        if (!(object instanceof MealBox)) {
            return false;
        }
        MealBox other = (MealBox) object;
        if ((this.mealBoxId == null && other.mealBoxId != null) || (this.mealBoxId != null && !this.mealBoxId.equals(other.mealBoxId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.MealBox[ id=" + mealBoxId + " ]";
    }

    /**
     * @return the itemName
     */
    public String getItemName() {
        return itemName;
    }

    /**
     * @param itemName the itemName to set
     */
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    /**
     * @return the ItemCode
     */
    public Long getItemCode() {
        return ItemCode;
    }

    public void addReview(Review r) {
        this.reviews.add(r);
        System.out.println("this line executed");
    }

    /**
     * @param ItemCode the ItemCode to set
     */
    public void setItemCode(Long ItemCode) {
        this.ItemCode = ItemCode;
    }

    /**
     * @return the itemImage
     */
    public String getItemImage() {
        return itemImage;
    }

    /**
     * @param itemImage the itemImage to set
     */
    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    /**
     * @return the itemPrice
     */
    public BigDecimal getItemPrice() {
        return itemPrice;
    }

    /**
     * @param itemPrice the itemPrice to set
     */
    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    /**
     * @return the itemDescription
     */
    public String getItemDescription() {
        return itemDescription;
    }

    /**
     * @param itemDescription the itemDescription to set
     */
    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    /**
     * @return the quantityAvailable
     */
    public Integer getQuantityAvailable() {
        return quantityAvailable;
    }

    /**
     * @param quantityAvailable the quantityAvailable to set
     */
    public void setQuantityAvailable(Integer quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    /**
     * @return the allergens
     */
    public List<Allergen> getAllergens() {
        return allergens;
    }

    /**
     * @param allergens the allergens to set
     */
    public void setAllergens(List<Allergen> allergens) {
        this.allergens = allergens;
    }

    /**
     * @return the ingredients
     */
    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void addIngredients(Ingredient e) {
        this.ingredients.add(e);
    }

    /**
     * @param ingredients the ingredients to set
     */
    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    /**
     * @return the categories
     */
    public List<Category> getCategories() {
        return categories;
    }

    /**
     * @param categories the categories to set
     */
    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public void addCategory(Category category) {
        this.categories.add(category);
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
     * @return the itemCost
     */
    public BigDecimal getItemCost() {
        return itemCost;
    }

    /**
     * @param itemCost the itemCost to set
     */
    public void setItemCost(BigDecimal itemCost) {
        this.itemCost = itemCost;
    }

    /**
     * @return the isPromotionApplied
     */
    public boolean isIsPromotionApplied() {
        return isPromotionApplied;
    }

    /**
     * @param isPromotionApplied the isPromotionApplied to set
     */
    public void setIsPromotionApplied(boolean isPromotionApplied) {
        this.isPromotionApplied = isPromotionApplied;
    }

    public boolean isStatusAvail() {
        return StatusAvail;
    }

    public void setStatusAvail(boolean StatusAvail) {
        this.StatusAvail = StatusAvail;
    }

}
