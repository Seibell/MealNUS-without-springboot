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
    public List<ForumPost> getAllForumPosts() {
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
}
