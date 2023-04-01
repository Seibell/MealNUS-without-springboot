/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Ingredient;
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
    public Long createMealBox(MealBox mealBox) {
        em.persist(mealBox);
        return mealBox.getMealBoxId();
    }
    
    public void addIngredientsToBox(Long id, List<Ingredient> i){
        MealBox m = em.find(MealBox.class, id);
        m.setIngredients(i);
        em.merge(m);
    }
    
    public MealBox addNewQuantity(Long id, Integer quantity){
          MealBox m = em.find(MealBox.class, id);
          m.setQuantityAvailable(quantity);
          em.merge(m);
          return m;
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
      public MealBox updateMealBox(Long id, MealBox mealbox){
          MealBox m = em.find(MealBox.class, id);
          m.setItemCode(mealbox.getItemCode());
          m.setItemCost(mealbox.getItemCost());
          m.setItemDescription(mealbox.getItemDescription());
          m.setItemName(mealbox.getItemName());
          m.setItemPrice(mealbox.getItemPrice());
          m.setQuantityAvailable(mealbox.getQuantityAvailable());
          m.setIngredients(mealbox.getIngredients());
          em.merge(m);
          return m;
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
