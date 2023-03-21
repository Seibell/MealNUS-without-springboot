/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.MealBoxSessionBeanLocal;
import entity.MealBox;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import util.exception.NoResultException;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;
import util.exception.MealBoxNotFoundException;
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
    
    @GET 
    @Path("/{mealboxId}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveMealBoxById(@PathParam("mealboxId") Long bId) throws MealBoxNotFoundException { 
      try { 
          MealBox box = mealBoxSessionBeanLocal.retrieveMealBoxById(bId);
          return Response.status(200).entity( 
                  box ).type(MediaType.APPLICATION_JSON).build(); 
      } catch (MealBoxNotFoundException e) { 
          JsonObject exception = Json.createObjectBuilder() 
                  .add("error", "Not found") 
                  .build(); 
 
          return Response.status(404).entity(exception) 
                         .type(MediaType.APPLICATION_JSON).build(); 
      } 
    } //end
     
    @POST 
    @Consumes(MediaType.APPLICATION_JSON) 
    @Produces(MediaType.APPLICATION_JSON) 
     public MealBox createMealBox(MealBox box) { 
      mealBoxSessionBeanLocal.createMealBox(box);        
      return box; 
  } //end 

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
