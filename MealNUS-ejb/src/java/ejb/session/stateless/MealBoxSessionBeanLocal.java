/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Ingredient;
import entity.MealBox;
import java.util.List;
import javafx.util.Pair;
import javax.ejb.Local;
import util.exception.MealBoxNotFoundException;

/**
 *
 * @author ryanl
 */
@Local
public interface MealBoxSessionBeanLocal {

    public List<MealBox> retrieveAllMealBoxes();

    public void updateMealBox(MealBox updatedMealBox);

    public MealBox retrieveMealBoxById(Long id) throws MealBoxNotFoundException;

    public void deleteMealBox(MealBox mealBox);

    public Long createMealBox(MealBox mealBox);

    public List<Pair<String, Integer>> retrieveAllMealBoxesWithQty();

    public void addIngredientsToBox(Long id, List<Ingredient> i );

    public MealBox addNewQuantity(Long id, Integer quantity);

    public MealBox updateMealBox(Long id, MealBox mealbox);

    public List<MealBox> retrieveMealboxByCategory(String category) throws MealBoxNotFoundException;

    public void setStatusAvailability(Long id, MealBox meal);
    
}
