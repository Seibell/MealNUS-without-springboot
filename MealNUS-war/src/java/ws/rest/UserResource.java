/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.UserSessionBeanLocal;
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
import ws.model.RetrieveAllUsersResponse;

/**
 *
 * @author ryanl
 */
@Path("User")

public class UserResource
{
    @Context
    private UriInfo context;
    
    private final UserSessionBeanLocal userSessionBeanLocal;
    
    
    
    public UserResource()
    {
        userSessionBeanLocal = lookupUserSessionBeanLocal();
    }

    
    
    @GET
    @Path(value = "retrieveAllUsers") //http://localhost:8080/MealNUS-war/rest/User/retrieveAllUsers <- this should show json of user class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllUsers() 
    {
        RetrieveAllUsersResponse retrieveAllUsersResponse = new RetrieveAllUsersResponse(userSessionBeanLocal.retrieveAllUsers());
        
        return Response.status(Status.OK).entity(retrieveAllUsersResponse).build();
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
