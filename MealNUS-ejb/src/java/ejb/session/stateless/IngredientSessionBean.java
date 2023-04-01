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
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

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
    public Ingredient retrieveIngredientByName(String ingredientName) {
        TypedQuery<Ingredient> query = em.createQuery("SELECT i FROM Ingredient i WHERE i.name = :ingredientName", Ingredient.class);
        query.setParameter("ingredientName", ingredientName);

        try {
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}
