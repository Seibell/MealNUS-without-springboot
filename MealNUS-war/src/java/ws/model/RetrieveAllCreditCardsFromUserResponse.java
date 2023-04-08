/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.CreditCard;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ryanl
 */
@XmlRootElement

public class RetrieveAllCreditCardsFromUserResponse {

    private List<CreditCard> ccs;

    public RetrieveAllCreditCardsFromUserResponse() {
        ccs = new ArrayList<>();
    }

    public RetrieveAllCreditCardsFromUserResponse(List<CreditCard> ccs) {
        this.ccs = ccs;
    }

    @XmlElements({
        @XmlElement(name = "CreditCard", type = CreditCard.class)
    })
    @XmlElementWrapper
    public List<CreditCard> getUserCreditCards() {
        return ccs;
    }

    public void setUserCreditCards(List<CreditCard> ccs) {
        this.ccs = ccs;
    }
}
