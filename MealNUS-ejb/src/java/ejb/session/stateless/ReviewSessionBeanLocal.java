/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import entity.Review;
import entity.User;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author 60540
 */
@Local
public interface ReviewSessionBeanLocal {

    public void createReview(Review review);

    public List<Review> retrieveAllReviews();

    public Review retrieveReviewById(Long id);

    public void updateReview(Review review);

    public void deleteReview(Review review);

    public List<Review> retrieveAllReviewsByUser(User user);

    public List<Review> retrieveAllReviewsByMealBox(MealBox mb);
    
}
