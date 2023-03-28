/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import java.util.ArrayList;
import java.util.List;
import javafx.util.Pair;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.MealBoxNotFoundException;

/**
 *
 * @author ryanl
 */
@Stateless
public class MealBoxSessionBean implements MealBoxSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public void createMealBox(MealBox mealBox) {
        em.persist(mealBox);
    }

    @Override
    public List<MealBox> retrieveAllMealBoxes() {
        Query query = em.createQuery("SELECT m FROM MealBox m", MealBox.class);
        return query.getResultList();
    }
    
    @Override
    public List<Pair<String, Integer>> retrieveAllMealBoxesWithQty() {
        List<MealBox> mealBoxList = retrieveAllMealBoxes();
        List<Pair<String, Integer>> resultList = new ArrayList<>();
        for (MealBox mealBox : mealBoxList) {
            String mealBoxName = mealBox.getItemName();
            Integer qtyAvailable = mealBox.getQuantityAvailable();
            resultList.add(new Pair<>(mealBoxName, qtyAvailable));
        }
        return resultList;
    }

    @Override
    public MealBox retrieveMealBoxById(Long id) throws MealBoxNotFoundException {
        MealBox mealBox = em.find(MealBox.class, id);
        if (mealBox == null) {
            throw new MealBoxNotFoundException("Meal box with id " + id + " not found.");
        }
        return mealBox;
    }

    @Override
    public void updateMealBox(MealBox updatedMealBox) {
        em.merge(updatedMealBox);
    }

    @Override
    public void deleteMealBox(MealBox mealBox) {
        em.remove(mealBox);
    }
}
