/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

/**
 *
 * @author ryanl
 */
@Entity
public class Allergen implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long allergenId;
    private String allergenName;
    private String allergenDescription;
    
    @ManyToMany
    private List<MealBox> mealBoxIncluded;

    public Allergen() {
    }

    public Allergen(String allergenName, String allergenDescription) {
        this.allergenName = allergenName;
        this.allergenDescription = allergenDescription;
        this.mealBoxIncluded = new ArrayList<>();
    }
    
    

    public Long getAllergenId() {
        return allergenId;
    }

    public void setAllergenId(Long allergenId) {
        this.allergenId = allergenId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (allergenId != null ? allergenId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the allergenId fields are not set
        if (!(object instanceof Allergen)) {
            return false;
        }
        Allergen other = (Allergen) object;
        if ((this.allergenId == null && other.allergenId != null) || (this.allergenId != null && !this.allergenId.equals(other.allergenId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Allergen[ id=" + allergenId + " ]";
    }

    /**
     * @return the allergenName
     */
    public String getAllergenName() {
        return allergenName;
    }

    /**
     * @param allergenName the allergenName to set
     */
    public void setAllergenName(String allergenName) {
        this.allergenName = allergenName;
    }

    /**
     * @return the allergenDescription
     */
    public String getAllergenDescription() {
        return allergenDescription;
    }

    /**
     * @param allergenDescription the allergenDescription to set
     */
    public void setAllergenDescription(String allergenDescription) {
        this.allergenDescription = allergenDescription;
    }
    
}
