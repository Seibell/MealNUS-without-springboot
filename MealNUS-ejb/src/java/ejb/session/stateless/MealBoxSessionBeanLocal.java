/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import java.util.List;
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

    public void createMealBox(MealBox mealBox);
    
}
