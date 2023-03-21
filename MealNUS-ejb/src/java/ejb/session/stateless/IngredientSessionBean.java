/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Ingredient;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author ryanl
 */
@Stateless
public class IngredientSessionBean implements IngredientSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public void createIngredient(Ingredient ingredient) {
        em.persist(ingredient);
    }

    @Override
    public List<Ingredient> retrieveAllIngredients() {
        Query query = em.createQuery("SELECT i FROM Ingredient i");
        return query.getResultList();
    }
    
    @Override
    public List<Ingredient> searchIngredient(String item) { 
        Query q; 
        if (item != null) { 
            q = em.createQuery("SELECT i FROM Ingredient i WHERE " 
                    + "LOWER(i.name) LIKE :name"); 
            q.setParameter("name", "%" + item.toLowerCase() + "%"); 
        } else { 
            q = em.createQuery("SELECT i FROM Ingredient i"); 
        } 
        return q.getResultList(); 
    } //end 
}
