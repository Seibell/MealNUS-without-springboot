/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Allergen;
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
public class AllergenSessionBean implements AllergenSessionBeanLocal {
    
    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public void createAllergen(Allergen allergen) {
        em.persist(allergen);
    }

    @Override
    public List<Allergen> retrieveAllAllergens() {
        Query query = em.createQuery("SELECT a FROM Allergen a");
        return query.getResultList();
    }
}
