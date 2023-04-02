/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.ForumPost;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.enumeration.ForumCategory;

/**
 *
 * @author 60540
 */
@Stateless
public class ForumSessionBean implements ForumSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    @Override
    public ForumPost createForumPost(ForumPost forumPost) {
        em.persist(forumPost);
        return forumPost;
    }

    @Override
    public ForumPost retrieveForumPostById(Long id) {
        return em.find(ForumPost.class, id);
    }

    @Override
    public List<ForumPost> retrieveForumPostsByForumCategory(ForumCategory fc) {
        Query query = em.createQuery("SELECT fp FROM ForumPost fp WHERE fp.forumCategory = :forumCategory", ForumPost.class);
        query.setParameter("forumCategory", fc);
        List<ForumPost> forumPosts = query.getResultList();
        return forumPosts;
    }

    @Override
    public List<ForumPost> retrieveAllForumPosts() {
        Query query = em.createQuery("SELECT f FROM ForumPost f", ForumPost.class);
        return query.getResultList();
    }

    @Override
    public ForumPost updateForumPost(ForumPost forumPost) {
        return em.merge(forumPost);
    }

    @Override
    public void deleteForumPost(ForumPost forumPost) {
        em.remove(forumPost);
    }
    
    
    @Override
    public ForumPost increaseThumbsUp(Long postId) {
        ForumPost post = em.find(ForumPost.class, postId);
        post.setNumThumbsUp(post.getNumThumbsUp() + 1);
        em.persist(post);
        return post;
    }
}
