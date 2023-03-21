/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.NotificationSessionBeanLocal;
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
import javax.ws.rs.core.UriInfo;
import ws.model.RetrieveAllNotificationsResponse;

/**
 *
 * @author 60540
 */


@Path("Notification")

public class NotificationResource
{
    @Context
    private UriInfo context;
    
    private final NotificationSessionBeanLocal notificationSessionBeanLocal;
    
    
    
    public NotificationResource()
    {
        notificationSessionBeanLocal = lookupNotificationSessionBeanLocal();
    }

    
    
    @GET
    @Path(value = "retrieveAllNotifications") //http://localhost:8080/MealNUS-war/rest/Notification/retrieveAllNotifications <- this should show json of notification class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllNotifications() 
    {
        RetrieveAllNotificationsResponse retrieveAllNotificationsResponse = new RetrieveAllNotificationsResponse(notificationSessionBeanLocal.retrieveAllNotifications());
        
        return Response.status(Response.Status.OK).entity(retrieveAllNotificationsResponse).build();
    }

    
    
    private NotificationSessionBeanLocal lookupNotificationSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (NotificationSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/NotificationSessionBean!ejb.session.stateless.NotificationSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}