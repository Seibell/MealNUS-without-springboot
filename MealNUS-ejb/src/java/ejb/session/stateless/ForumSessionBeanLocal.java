/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.ForumPost;
import java.util.List;
import javax.ejb.Local;
import util.enumeration.ForumCategory;

/**
 *
 * @author 60540
 */
@Local
public interface ForumSessionBeanLocal {

    public ForumPost createForumPost(ForumPost forumPost);

    public ForumPost retrieveForumPostById(Long id);

    public List<ForumPost> retrieveAllForumPosts();

    public ForumPost updateForumPost(ForumPost forumPost);

    public void deleteForumPost(ForumPost forumPost);

    public List<ForumPost> retrieveForumPostsByForumCategory(ForumCategory fc);

    public Boolean increaseThumbsUp(Long postId, Long userId);

    public Boolean increaseThumbsDown(Long postId, Long userId);

    public ForumPost createReply(Long replyId, Long postId);
    
}
