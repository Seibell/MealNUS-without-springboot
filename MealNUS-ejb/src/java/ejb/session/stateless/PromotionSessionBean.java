/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Promotion;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;

/**
 *
 * @author Darie
 */
@Stateless
public class PromotionSessionBean implements PromotionSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

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
    public Promotion retrievePromotionById(Long promotionId) {
        Promotion promotion = em.find(Promotion.class, promotionId);
        return promotion;
    }

    @Override
    public Promotion retrievePromotionByName(String promotionName) {
        Query query = em.createQuery("SELECT p FROM Promotion p WHERE p.promotionName = :inName", Promotion.class);
        query.setParameter("inName", promotionName);
        Promotion promotion = (Promotion) query.getSingleResult();
        return promotion;
    }
    
    @Override
    public List<Promotion> retrievePromotionsByStartDate(Date startDate) {
        Query query = em.createQuery("SELECT p FROM Promotion p WHERE p.startDate = :inStartDate");
        query.setParameter("inStartDate", startDate);
        return query.getResultList();
    }
    
    @Override
    public List<Promotion> retrievePromotionsByEndDate(Date endDate) {
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
    public void updatePromotion(Promotion promotion) {
        em.merge(promotion);
    }

    @Override
    public void deletePromotion(Promotion promotion) {
        em.remove(promotion);
    }

}
