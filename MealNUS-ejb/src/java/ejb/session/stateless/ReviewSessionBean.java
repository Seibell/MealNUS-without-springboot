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
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author 60540
 */
@Stateless
public class ReviewSessionBean implements ReviewSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public void createReview(Review review) {
        em.persist(review);
    }

    @Override
    public List<Review> retrieveAllReviews() {
        Query query = em.createQuery("SELECT r FROM Review r", Review.class);
        return query.getResultList();
    }

    @Override
    public List<Review> retrieveAllReviewsByUser(User user) {
        Query query = em.createQuery("SELECT r FROM Review r WHERE r.user = :user", Review.class);
        query.setParameter("user", user);
        return query.getResultList();
    }
    
    @Override
    public List<Review> retrieveAllReviewsByMealBox(MealBox mb) {
        Query query = em.createQuery("SELECT r FROM Review r WHERE r.mealBox = :mb", Review.class);
        query.setParameter("mb", mb);
        return query.getResultList();
    }

    @Override
    public Review retrieveReviewById(Long id) {
        Review review = em.find(Review.class, id);
        return review;
    }

    @Override
    public void updateReview(Review review) {
        em.merge(review);
    }

    @Override
    public void deleteReview(Review review) {
        em.remove(review);
    }
}
