/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.CreditCard;
import entity.User;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.UserNotFoundException;

/**
 *
 * @author Jester
 */
@Stateless
public class CreditCardSessionBean implements CreditCardSessionBeanLocal {

    @EJB
    private UserSessionBeanLocal userSessionBean;

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    @Override
    public CreditCard addNewCreditCard(CreditCard creditCard, Long userId) {
        em.persist(creditCard);
        return creditCard;
    }

    @Override
    public void updateCreditCard(CreditCard updatedCreditCard) {
        Long creditCardId = updatedCreditCard.getCreditCardId();
        CreditCard oldCreditCard = retrieveCreditCardById(creditCardId);

        oldCreditCard.setCardOwnerName(updatedCreditCard.getCardOwnerName());
        oldCreditCard.setCreditCardNumber(updatedCreditCard.getCreditCardNumber());
        oldCreditCard.setCvv(updatedCreditCard.getCvv());
        oldCreditCard.setExpiryDate(updatedCreditCard.getExpiryDate());
    }

    @Override
    public void removeCreditCard(Long cardId) {
        CreditCard cc = em.find(CreditCard.class, cardId);
        em.remove(cc);
    }

    @Override
    public CreditCard retrieveCreditCardById(Long creditCardId) {
        CreditCard creditCard = em.find(CreditCard.class, creditCardId);
        return creditCard;
    }

    @Override
    public List<CreditCard> retrieveAllCreditCardsByUserId(Long userId) {
        Query query = em.createQuery("SELECT c FROM CreditCard c WHERE c.userId = :userId");
        query.setParameter("userId", userId);
        return query.getResultList();
    }

}
