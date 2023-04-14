/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import java.util.Date;

/**
 *
 * @author Jester
 */
public class CreateReviewResponse {
    
    private Date reviewDate;
    private Integer stars;
    private String comments;
    private Long itemCode;
    private Long userId;

    public CreateReviewResponse() {
    }

    public CreateReviewResponse(Date reviewDate, Integer stars, String comments, Long itemCode, Long userId) {
        this.reviewDate = reviewDate;
        this.stars = stars;
        this.comments = comments;
        this.itemCode = itemCode;
        this.userId = userId;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Long getItemCode() {
        return itemCode;
    }

    public void setItemCode(Long itemCode) {
        this.itemCode = itemCode;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    
    
}
