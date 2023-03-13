/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import util.enumeration.ForumCategory;

/**
 *
 * @author ryanl
 */
@Entity
public class ForumPost implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Temporal(TemporalType.DATE)
    private Date postDate;
    private String posTitle;
    private String postDescription;
    private String[] postAttachments;
    private ForumCategory forumCategory;
    public ForumPost() {
    }

    public ForumPost(Date postDate, String posTitle, String postDescription, String[] postAttachments, ForumCategory forumCategory) {
        this.postDate = postDate;
        this.posTitle = posTitle;
        this.postDescription = postDescription;
        this.postAttachments = postAttachments;
        this.forumCategory = forumCategory;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (postId != null ? postId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the postId fields are not set
        if (!(object instanceof ForumPost)) {
            return false;
        }
        ForumPost other = (ForumPost) object;
        if ((this.postId == null && other.postId != null) || (this.postId != null && !this.postId.equals(other.postId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.ForumPost[ id=" + postId + " ]";
    }

    /**
     * @return the postDate
     */
    public Date getPostDate() {
        return postDate;
    }

    /**
     * @param postDate the postDate to set
     */
    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    /**
     * @return the posTitle
     */
    public String getPosTitle() {
        return posTitle;
    }

    /**
     * @param posTitle the posTitle to set
     */
    public void setPosTitle(String posTitle) {
        this.posTitle = posTitle;
    }

    /**
     * @return the postDescription
     */
    public String getPostDescription() {
        return postDescription;
    }

    /**
     * @param postDescription the postDescription to set
     */
    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    /**
     * @return the postAttachments
     */
    public String[] getPostAttachments() {
        return postAttachments;
    }

    /**
     * @param postAttachments the postAttachments to set
     */
    public void setPostAttachments(String[] postAttachments) {
        this.postAttachments = postAttachments;
    }

    /**
     * @return the forumCategory
     */
    public ForumCategory getForumCategory() {
        return forumCategory;
    }

    /**
     * @param forumCategory the forumCategory to set
     */
    public void setForumCategory(ForumCategory forumCategory) {
        this.forumCategory = forumCategory;
    }
    
}
