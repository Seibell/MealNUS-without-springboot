/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.Promotion;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Mehak
 */
@XmlRootElement

public class RetrieveAllPromotionsResponse {

    private List<Promotion> promotions;

    public RetrieveAllPromotionsResponse() {
        promotions = new ArrayList<>();
    }

    public RetrieveAllPromotionsResponse(List<Promotion> promotions) {
        this.promotions = promotions;
    }

    @XmlElements({
        @XmlElement(name = "promotion", type = Promotion.class)
    })
    @XmlElementWrapper
    public List<Promotion> getPromotionEntities() {
        return promotions;
    }

    public void setPromotionEntities(List<Promotion> promotions) {
        this.promotions = promotions;
    }

}

