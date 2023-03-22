/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.model;

import entity.ForumPost;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;

/**
 *
 * @author 60540
 */
public class RetrieveAllForumPostsResponse {

    private List<ForumPost> posts;

    public RetrieveAllForumPostsResponse() {
        posts = new ArrayList<>();
    }

    public RetrieveAllForumPostsResponse(List<ForumPost> posts) {
        this.posts = posts;
    }

    @XmlElements({
        @XmlElement(name = "posts", type = ForumPost.class)
    })
    @XmlElementWrapper
    public List<ForumPost> getForumPostEntities() {
        return posts;
    }

    public void setForumPostEntities(List<ForumPost> posts) {
        this.posts = posts;
    }
}
