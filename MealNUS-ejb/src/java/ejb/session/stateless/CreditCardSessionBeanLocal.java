/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.CreditCard;
import javax.ejb.Local;
import util.exception.UserNotFoundException;

/**
 *
 * @author Jester
 */
@Local
public interface CreditCardSessionBeanLocal {

    public CreditCard addNewCreditCard(CreditCard creditCard, Long userId) throws UserNotFoundException;

    public void updateCreditCard(CreditCard updatedCreditCard);

    public void removeCreditCard(CreditCard creditCard);

    public CreditCard retrieveCreditCardById(Long creditCardId);
    
}
