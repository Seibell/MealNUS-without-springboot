/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Promotion;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;

/**
 *
 * @author Darie
 */
@Local
public interface PromotionSessionBeanLocal {

    public void createPromotion(Promotion promotion) throws PromotionNotFoundException, UnknownPersistenceException;

    public Promotion retrievePromotionById(Long promotionId);

    public Promotion retrievePromotionByName(String promotionName);

    public List<Promotion> retrievePromotionsByStartDate(Date startDate);

    public List<Promotion> retrievePromotionsByEndDate(Date endDate);

    public List<Promotion> retrieveAllPromotions();

    public void updatePromotion(Promotion promotion);

    public void deletePromotion(Promotion promotion);
    
}
