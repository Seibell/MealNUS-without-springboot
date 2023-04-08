/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Allergen;
import java.util.List;
import javax.ejb.Local;
import util.exception.AllergenNotFound;

/**
 *
 * @author ryanl
 */
@Local
public interface AllergenSessionBeanLocal {

    public List<Allergen> retrieveAllAllergens();

    public void createAllergen(Allergen allergen);

    public Allergen retrieveAllergenById(Long AllergenId) throws AllergenNotFound;

    public Allergen updateIngredient(Long id, Allergen a);
    
}
