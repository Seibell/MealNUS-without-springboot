/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Category;
import entity.Ingredient;
import entity.MealBox;
import entity.Promotion;
import java.util.ArrayList;
import java.util.List;
import javafx.util.Pair;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.MealBoxNotFoundException;
import util.exception.PromotionNotFoundException;

/**
 *
 * @author ryanl
 */
@Stateless
public class MealBoxSessionBean implements MealBoxSessionBeanLocal {

    @EJB(name = "ingredientSessionBean")
    private IngredientSessionBeanLocal ingredientSessionBean;

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public Long createMealBox(MealBox mealBox) {
        System.out.println("ingredients: " + mealBox.getIngredients().toString());
        System.out.println("alergen: " + mealBox.getAllergens().toString());
        System.out.println("category: " + mealBox.getCategories().toString());
        em.persist(mealBox);
        return mealBox.getMealBoxId();
    }

    public void addIngredientsToBox(Long mealboxId, List<Ingredient> ingredients) {
        try {
            MealBox m = retrieveMealBoxById(mealboxId);
            List<Ingredient> mealboxList = m.getIngredients();
            
            for (Ingredient i : ingredients) {
                System.out.println("************** " + i);
                mealboxList.add(i);
            }
            em.merge(m);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public MealBox addNewQuantity(Long id, Integer quantity) {
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
    public List<MealBox> retrieveMealboxByCategory(String category) throws MealBoxNotFoundException {
        Category cat = em.createQuery("SELECT c FROM Category c WHERE c.name = :category", Category.class)
                    .setParameter("category", category)
                    .getSingleResult();
        Query query = em.createQuery("SELECT DISTINCT m FROM MealBox m JOIN m.categories c WHERE c = :category", MealBox.class);
        query.setParameter("category", cat);
        return query.getResultList();
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
    public MealBox updateMealBox(Long id, MealBox mealbox) {
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
    
    public void setStatusAvailability(Long id, Boolean status) { 
        MealBox m = em.find(MealBox.class, id);
        m.setStatusAvail(status);
        em.merge(m);
    }
}
