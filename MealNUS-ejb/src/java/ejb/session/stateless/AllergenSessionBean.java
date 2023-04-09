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
import util.exception.AllergenNotFound;

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
    
    @Override
      public Allergen retrieveAllergenById(Long AllergenId) throws AllergenNotFound {
        Allergen a = em.find(Allergen.class, AllergenId);

        if (a != null) {
            return a;
        } else {
            throw new AllergenNotFound("Allergen not found in system!");
        }
    }
      
    public Allergen updateIngredient(Long id, Allergen a){
        
        Allergen allergen = em.find(Allergen.class, id);
        allergen.setAllergenName(a.getAllergenName());
        allergen.setAllergenDescription(a.getAllergenDescription());
        em.merge(allergen);
        return allergen;
    }
}
