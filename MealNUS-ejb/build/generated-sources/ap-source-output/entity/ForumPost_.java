package entity;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import util.enumeration.ForumCategory;

@Generated(value="EclipseLink-2.7.7.v20200504-rNA", date="2023-03-21T22:25:09")
@StaticMetamodel(ForumPost.class)
public class ForumPost_ { 

    public static volatile SingularAttribute<ForumPost, String> posTitle;
    public static volatile SingularAttribute<ForumPost, String[]> postAttachments;
    public static volatile SingularAttribute<ForumPost, Date> postDate;
    public static volatile SingularAttribute<ForumPost, Long> postId;
    public static volatile SingularAttribute<ForumPost, ForumCategory> forumCategory;
    public static volatile SingularAttribute<ForumPost, String> postDescription;

}