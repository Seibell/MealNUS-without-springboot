/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.ForumSessionBeanLocal;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;
import ws.model.RetrieveAllForumPostsResponse;

/**
 *
 * @author 60540
 */
@Path("Forum")
public class ForumResource {

    @Context
    private UriInfo context;

    private final ForumSessionBeanLocal forumSessionBeanLocal;

    public ForumResource() {
        forumSessionBeanLocal = lookupForumSessionBeanLocal();
    }
    @GET
    @Path(value = "retrieveAllForumPosts") //http://localhost:8080/MealNUS-war/rest/Forum/retrieveAllForumPosts <- this should show json of forum class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllForumPosts() 
    {
        RetrieveAllForumPostsResponse retrieveAllUsersResponse = new RetrieveAllForumPostsResponse(forumSessionBeanLocal.retrieveAllForumPosts());
        
        return Response.status(Status.OK).entity(retrieveAllUsersResponse).build();
    }
     
    private ForumSessionBeanLocal lookupForumSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (ForumSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/ForumSessionBean!ejb.session.stateless.ForumSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
