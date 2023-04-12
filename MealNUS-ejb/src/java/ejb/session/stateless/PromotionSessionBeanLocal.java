/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import entity.Promotion;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;
import util.exception.MealBoxNotFoundException;
import util.exception.PromotionAlreadyAppliedException;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;

/**
 *
 * @author Darie
 */
@Local
public interface PromotionSessionBeanLocal {

    public void createPromotion(Promotion promotion) throws PromotionNotFoundException, UnknownPersistenceException;

    public Promotion retrievePromotionById(Long promotionId) throws PromotionNotFoundException;

    public List<Promotion> retrievePromotionByName(String promotionName) throws PromotionNotFoundException;

    public List<Promotion> retrievePromotionsByStartDate(Date startDate) throws PromotionNotFoundException;

    public List<Promotion> retrievePromotionsByEndDate(Date endDate) throws PromotionNotFoundException;

    public List<Promotion> retrieveAllPromotions();

    public void updatePromotion(Long promoId, Promotion promotion) throws PromotionNotFoundException;

    public void deletePromotion(Long promotionId);

    public List<MealBox> applyPromotionAcrossPlatform(String promotionCode) throws PromotionNotFoundException, PromotionAlreadyAppliedException;

    public Promotion retrievePromotionByPromotionCode(String promotionCode) throws PromotionNotFoundException;

    public List<MealBox> disablePromotion(String promotionCode) throws PromotionNotFoundException;

    public List<MealBox> applyPromotionAcrossCategory(String promotionCode, String categoryName) throws PromotionNotFoundException, PromotionAlreadyAppliedException, MealBoxNotFoundException;

    public List<MealBox> disablePromotionAcrossCategory(String promotionCode, String categoryName) throws PromotionNotFoundException, MealBoxNotFoundException;

}
