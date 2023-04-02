/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Ingredient;
import java.util.List;
import javax.ejb.Local;
import util.exception.IngredientNotFoundException;

/**
 *
 * @author ryanl
 */
@Local
public interface IngredientSessionBeanLocal {

    public void createIngredient(Ingredient ingredient);

    public List<Ingredient> retrieveAllIngredients();

    public void deleteIngredient(Ingredient i);

    public Ingredient retrieveIngredientById(Long IngredientId) throws IngredientNotFoundException;

    public Ingredient updateIngredient(Long id, Ingredient i);
    
    public Ingredient retrieveIngredientByName(String ingredientName);
    
}
