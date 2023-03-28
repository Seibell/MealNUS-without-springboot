/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.MealBoxSessionBeanLocal;
import java.text.ParseException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.util.Pair;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;
import ws.model.RetrieveAllMealBoxesResponse;

/**
 *
 * @author 60540
 */
@Path("Mealbox")
public class MealBoxResource {

    @javax.ws.rs.core.Context
    private UriInfo context;
    
    private final MealBoxSessionBeanLocal mealBoxSessionBeanLocal;

    public MealBoxResource() {
        this.mealBoxSessionBeanLocal = lookupMealBoxSessionBeanLocal();
    }

    @GET
    @Path(value = "retrieveAllMealBoxes") //http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxes <- this should show json of mealbox class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllMealBoxes() {
        RetrieveAllMealBoxesResponse retrieveAllUsersResponse = new RetrieveAllMealBoxesResponse(mealBoxSessionBeanLocal.retrieveAllMealBoxes());
        return Response.status(Status.OK).entity(retrieveAllUsersResponse).build();
    }
    
    // e.g. http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxesWithQty
    @GET
    @Path("/retrieveAllMealBoxesWithQty")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveMealBoxesAndQty() throws ParseException {
        // no need for try catch 
        List<Pair<String, Integer>> results = mealBoxSessionBeanLocal.retrieveAllMealBoxesWithQty();
        GenericEntity<List<Pair<String, Integer>>> entity
                = new GenericEntity<List<Pair<String, Integer>>>(results) {
        };
        return Response.status(200).entity(
                entity).type(MediaType.APPLICATION_JSON).build();
    }

    private MealBoxSessionBeanLocal lookupMealBoxSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (MealBoxSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/MealBoxSessionBean!ejb.session.stateless.MealBoxSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

}
