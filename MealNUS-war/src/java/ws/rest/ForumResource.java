/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.ForumSessionBeanLocal;
import ejb.session.stateless.UserSessionBeanLocal;
import entity.ForumPost;
import entity.User;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;
import util.exception.UserNotFoundException;
import ws.model.CreateForumPostReplyResponse;
import ws.model.CreateForumPostResponse;
import ws.model.RetrieveAllForumPostsResponse;

/**
 *
 * @author 60540
 */
@Path("Forum")
public class ForumResource {

    private final UserSessionBeanLocal userSessionBeanLocal;

    @Context
    private UriInfo context;

    private final ForumSessionBeanLocal forumSessionBeanLocal;

    public ForumResource() {
        forumSessionBeanLocal = lookupForumSessionBeanLocal();
        userSessionBeanLocal = lookupUserSessionBeanLocal();
    }

    @GET
    @Path(value = "retrieveAllForumPosts") //http://localhost:8080/MealNUS-war/rest/Forum/retrieveAllForumPosts <- this should show json of forum class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllForumPosts() {
        RetrieveAllForumPostsResponse retrieveAllUsersResponse = new RetrieveAllForumPostsResponse(forumSessionBeanLocal.retrieveAllForumPosts());

        return Response.status(Status.OK).entity(retrieveAllUsersResponse).build();
    }

    @POST
    @Path("createNewForumPost")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewForumPost(CreateForumPostResponse createForumPostResponse) throws UserNotFoundException {
        ForumPost forumPost = new ForumPost(
                createForumPostResponse.getPostDate(),
                createForumPostResponse.getPostTitle(),
                createForumPostResponse.getPostDescription()
        );

        // Get the user's ID and associate it with the forum post
        Long userId = createForumPostResponse.getUserId();
        User user = userSessionBeanLocal.retrieveUserById(userId);
        forumPost.setUser(user);

        ForumPost createdForumPost = forumSessionBeanLocal.createForumPost(forumPost);

        return Response.status(Status.OK).entity(createdForumPost).build();
    }

    @POST
    @Path("createNewForumPostReply")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewForumPostReply(CreateForumPostReplyResponse createForumPostReplyResponse) throws UserNotFoundException {
        ForumPost forumPost = new ForumPost(
                createForumPostReplyResponse.getPostDate(),
                createForumPostReplyResponse.getPostTitle(),
                createForumPostReplyResponse.getPostDescription()
        );
        // Get the user's ID and associate it with the forum post
        Long userId = createForumPostReplyResponse.getUserId();
        User user = userSessionBeanLocal.retrieveUserById(userId);
        forumPost.setUser(user);
        ForumPost createdForumPost = forumSessionBeanLocal.createForumPost(forumPost);
        forumSessionBeanLocal.createReply(createdForumPost.getPostId(),createForumPostReplyResponse.getPostId());
        return Response.status(Status.OK).entity(createForumPostReplyResponse).build();
    }

    @PUT
    @Path("thumbsUpForumPost/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response increaseThumbsUp(@PathParam("postId") Long postId, @QueryParam("userId") Long userId) {
        boolean success = forumSessionBeanLocal.increaseThumbsUp(postId, userId);

        if (success) {
            return Response.status(Status.OK).build();
        } else {
            String errorMessage = "You already liked this post!";
            return Response.status(Status.BAD_REQUEST).entity(errorMessage).build();
        }
    }

    @PUT
    @Path("thumbsDownForumPost/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response increaseThumbsDown(@PathParam("postId") Long postId, @QueryParam("userId") Long userId) {
        boolean success = forumSessionBeanLocal.increaseThumbsDown(postId, userId);

        if (success) {
            return Response.status(Status.OK).build();
        } else {
            String errorMessage = "You already disliked this post!";
            return Response.status(Status.BAD_REQUEST).entity(errorMessage).build();
        }
    }

    // havent implement increase ThumbsDown 
    private ForumSessionBeanLocal lookupForumSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (ForumSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/ForumSessionBean!ejb.session.stateless.ForumSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private UserSessionBeanLocal lookupUserSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (UserSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/UserSessionBean!ejb.session.stateless.UserSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
