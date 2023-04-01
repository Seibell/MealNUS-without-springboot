/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.CreditCard;
import entity.User;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
    public CreditCard addNewCreditCard(CreditCard creditCard, Long userId) throws UserNotFoundException {
        User user = userSessionBean.retrieveUserById(userId);
        em.persist(creditCard);
        creditCard.setUser(user);
        em.flush();
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
    public void removeCreditCard(CreditCard creditCard) {
        em.remove(creditCard);
    }
    
    @Override
    public CreditCard retrieveCreditCardById(Long creditCardId) {
        CreditCard creditCard = em.find(CreditCard.class, creditCardId);
        return creditCard;
    }
    
    
}