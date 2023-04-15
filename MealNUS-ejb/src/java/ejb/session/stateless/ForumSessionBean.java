/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.ForumPost;
import entity.User;
import java.util.List;
import java.util.Set;
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
    public ForumPost createReply(Long replyId, Long postId) {
         ForumPost reply = retrieveForumPostById(replyId);
         ForumPost post = retrieveForumPostById(postId);
         List<ForumPost> list = post.getReplies();
         list.add(reply);
         post.setReplies(list);
         return post;      
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
    public List<ForumPost> retrieveAllForumPosts() {//without reply 
        Query query = em.createQuery("SELECT f FROM ForumPost f WHERE f.posTitle <> ''", ForumPost.class);
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
    public Boolean increaseThumbsUp(Long postId, Long userId) {
        System.out.println(userId);
        ForumPost post = retrieveForumPostById(postId);
        System.out.println(post.getLikedUsers().toString());
        //check if the user alr liked the post
        for (User user : post.getLikedUsers()) {
            System.out.println(user.getEmail() + " " + user.getUserId());
            
            if (user.getUserId() == userId) {
                System.out.println("Line 79");
                return false;
            }
        }
        User currUser = em.find(User.class, userId);

        post.setNumThumbsUp(post.getNumThumbsUp() + 1);
        List<User> likedUsers = post.getLikedUsers();
        likedUsers.add(currUser);
        post.setLikedUsers(likedUsers);
        em.persist(post);
        return true;
    }

    @Override
    public Boolean increaseThumbsDown(Long postId, Long userId) {
        ForumPost post = retrieveForumPostById(postId);
        //check if the user alr liked the post
        for (User user : post.getDislikedUsers()) {
            if (user.getUserId() == userId) {
                return false;
            }
        }
        User currUser = em.find(User.class, userId);
        post.setNumThumbsDown(post.getNumThumbsDown() + 1);
        List<User> dislikedUsers = post.getDislikedUsers();
        dislikedUsers.add(currUser);
        post.setDislikedUsers(dislikedUsers);
        em.persist(post);
        return true;
    }
}
