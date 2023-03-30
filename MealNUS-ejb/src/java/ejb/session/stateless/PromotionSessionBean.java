/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import entity.Promotion;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;

//Checking if it can be pushed
/**
 *
 * @author Darie
 */
@Stateless
public class PromotionSessionBean implements PromotionSessionBeanLocal {

    @EJB
    private MealBoxSessionBeanLocal mealBoxSessionBean;
    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    //Should we offer applying the promotion code across categories as well?
    //If so, should we ensure a check that a box is only in one category?
    @Override
    public List<MealBox> applyPromotionAcrossPlatform(String promotionCode) throws PromotionNotFoundException {
        Promotion promotionToBeApplied = retrievePromotionByPromotionCode(promotionCode);
        BigDecimal discountToBeApplied = BigDecimal.ONE.subtract(promotionToBeApplied.getDiscount());
        //Neeed to insert a check that ensure that the promotion discount is between 0 and 1
        List<MealBox> mealBoxesAcrossPlatform = mealBoxSessionBean.retrieveAllMealBoxes();
        for (MealBox box : mealBoxesAcrossPlatform) {
            BigDecimal mealBoxPrice = box.getItemPrice();
            BigDecimal updatedMealBoxPrice = mealBoxPrice.multiply(discountToBeApplied);
            box.setItemPrice(updatedMealBoxPrice);
        }
        
        promotionToBeApplied.setIsApplied(true);
        return mealBoxesAcrossPlatform;
    }
    
    @Override
    public List<MealBox> disablePromotion (String promotionCode) throws PromotionNotFoundException {
        Promotion promotionToBeDisabled = retrievePromotionByPromotionCode(promotionCode);
        
        //Current implementation. But I would like to implement this such that the MealBox
        //entity has an attribute called promotionPrice that is initally null, but updated according
        //to the promotion and set back to null when the promotion is removed. However, for now,
        //just to make sure that there will be no issue with the implementation of the meal box entity
        //I will be reversing the promotion
        List<MealBox> mealBoxesAcrossPlatform = mealBoxSessionBean.retrieveAllMealBoxes();
        BigDecimal discountToBeDisabled = promotionToBeDisabled.getDiscount();
        for (MealBox box : mealBoxesAcrossPlatform) {
            BigDecimal mealBoxPrice = box.getItemPrice();
            BigDecimal updatedMealBoxPrice = mealBoxPrice.divide(discountToBeDisabled);
            box.setItemPrice(updatedMealBoxPrice);
        }
        
        promotionToBeDisabled.setIsApplied(false);
        return mealBoxesAcrossPlatform;
    }

    @Override
    public void createPromotion(Promotion promotion) throws PromotionNotFoundException, UnknownPersistenceException {
        try {
            em.persist(promotion);
        } catch (PersistenceException ex) {
            if (ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                if (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException")) {
                    throw new PromotionNotFoundException();
                } else {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            } else {
                throw new UnknownPersistenceException(ex.getMessage());
            }
        }
    }

    @Override
    public Promotion retrievePromotionById(Long promotionId) throws PromotionNotFoundException {
        Promotion promotion = em.find(Promotion.class, promotionId);
        if (promotion != null) {
            return promotion;
        } else {
            throw new PromotionNotFoundException("Promotion with ID " + promotionId + "does not exist!");
        }

    }

    @Override
    public List<Promotion> retrievePromotionByName(String promotionName) throws PromotionNotFoundException {
        Query query = em.createQuery("SELECT p FROM Promotion p WHERE p.promotionName = :inName", Promotion.class);
        query.setParameter("inName", promotionName);
        return query.getResultList();
    }

    @Override
    public Promotion retrievePromotionByPromotionCode(String promotionCode) throws PromotionNotFoundException {
        Query query = em.createQuery("SELECT p FROM Promotion p WHERE p.promotionCode = :inPromotionCode", Promotion.class);
        query.setParameter("inPromotionCode", promotionCode);
        Promotion promotion = (Promotion) query.getSingleResult();
        return promotion;
    }

    @Override
    public List<Promotion> retrievePromotionsByStartDate(Date startDate) throws PromotionNotFoundException {
        Query query = em.createQuery("SELECT p FROM Promotion p WHERE p.startDate = :inStartDate");
        query.setParameter("inStartDate", startDate);
        return query.getResultList();
    }

    @Override
    public List<Promotion> retrievePromotionsByEndDate(Date endDate) throws PromotionNotFoundException {
        Query query = em.createQuery("SELECT p FROM Promotion p WHERE p.endDate = :inEndDate");
        query.setParameter("inEndDate", endDate);
        return query.getResultList();
    }

    @Override
    public List<Promotion> retrieveAllPromotions() {
        Query query = em.createQuery("SELECT p FROM Promotion p", Promotion.class);
        return query.getResultList();
    }

    @Override
    public void updatePromotion(Promotion promotion) throws PromotionNotFoundException {
        //Potentially could change it to have each attribute changed using the set method
        //It is possible to let the user choose which fields to change the same way a book was edited in the assignment
        Promotion oldPromo = retrievePromotionById(promotion.getPromotionId());
        oldPromo.setDiscount(promotion.getDiscount());
        oldPromo.setPromotionName(promotion.getPromotionName());
        oldPromo.setStartDate(promotion.getStartDate());
        oldPromo.setEndDate(promotion.getEndDate());
        oldPromo.setPicture(promotion.getPicture());
        oldPromo.setPromotionCode(promotion.getPromotionCode());
        //Should allow the picture to be changed too
    }

    @Override
    public void deletePromotion(Long promotionId) {
        try {
            Promotion promotionToDelete = retrievePromotionById(promotionId);
            em.remove(promotionToDelete);
        } catch (PromotionNotFoundException ex) {
            Logger.getLogger(PromotionSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}
