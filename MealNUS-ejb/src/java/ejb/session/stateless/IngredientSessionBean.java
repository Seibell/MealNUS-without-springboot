/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Ingredient;
import static entity.OrderEntity_.orderId;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.IngredientNotFoundException;

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
    public Ingredient updateIngredient(Long id, Ingredient i){
          Ingredient ingred = em.find(Ingredient.class, id);
          ingred.setName(i.getName());
          ingred.setPicture(i.getPicture());
          em.merge(ingred);
          return ingred;
    }
    
    public void deleteIngredient(Ingredient i) {
        em.remove(i);
    }
    
    @Override
     public Ingredient retrieveIngredientById(Long IngredientId) throws IngredientNotFoundException {
        Ingredient i = em.find(Ingredient.class, IngredientId);

        if (i != null) {
            return i;
        } else {
            throw new IngredientNotFoundException("Ingredient not found in system!");
        }
    }
}
