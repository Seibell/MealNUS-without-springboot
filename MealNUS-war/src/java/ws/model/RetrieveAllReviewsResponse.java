/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.Review;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author 60540
 */
@XmlRootElement

public class RetrieveAllReviewsResponse {

    private List<Review> reviews;

    public RetrieveAllReviewsResponse() {
        reviews = new ArrayList<>();
    }

    public RetrieveAllReviewsResponse(List<Review> reviews) {
        this.reviews = reviews;
    }

    @XmlElements({
        @XmlElement(name = "review", type = Review.class)
    })
    @XmlElementWrapper
    public List<Review> getReviewEntities() {
        return reviews;
    }

    public void setReviewEntities(List<Review> reviews) {
        this.reviews = reviews;
    }
}
