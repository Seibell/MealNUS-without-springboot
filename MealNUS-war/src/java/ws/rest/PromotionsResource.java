/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.PromotionSessionBeanLocal;
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
import ws.model.RetrieveAllPromotionsResponse;

/**
 *
 * @author Mehak
 */
@Path("promotion")//Should the p be capitilized?

public class PromotionsResource {

    @Context
    private UriInfo context;

    private final PromotionSessionBeanLocal promotionSessionBeanLocal;

    public PromotionsResource() {
        promotionSessionBeanLocal = lookupPromotionSessionBeanLocal();
    }

    @GET
    @Path(value = "retrieveAllPromotions") //http://localhost:8080/MealNUS-war/rest/Notification/retrieveAllPromotions <- this should show json of notification class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllPromotions() {
        RetrieveAllPromotionsResponse retrieveAllPromotionsResponse = new RetrieveAllPromotionsResponse(promotionSessionBeanLocal.retrieveAllPromotions());

        return Response.status(Response.Status.OK).entity(retrieveAllPromotionsResponse).build();
    }

    private PromotionSessionBeanLocal lookupPromotionSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (PromotionSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/PromotionSessionBean!ejb.session.stateless.PromotionSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}

