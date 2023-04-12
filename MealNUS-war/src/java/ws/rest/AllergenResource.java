/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.AllergenSessionBeanLocal;
import entity.Allergen;
import entity.Ingredient;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import util.exception.AllergenNotFound;
import util.exception.IngredientNotFoundException;

/**
 * REST Web Service
 *
 * @author kylie
 */
@Path("Allergen")
@RequestScoped
public class AllergenResource {

    AllergenSessionBeanLocal allergenSessionBean = lookupAllergenSessionBeanLocal();

    public AllergenResource() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Allergen createAllergent(Allergen a){
        allergenSessionBean.createAllergen(a);
        return a;
    } //end

    // http://localhost:8080/MealNUS-war/rest/Allergen/retrieveAllAllergent
    @GET
    @Path(value = "retrieveAllAllergent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllAllergent() {
        List<Allergen> list = allergenSessionBean.retrieveAllAllergens();
        GenericEntity<List<Allergen>> entity = new GenericEntity<List<Allergen>>(list) { 
            }; 
 
            return Response.status(200).entity( 
                    entity 
            ).build();
    }
    
    @GET
    @Path("/getAllergenById/{allergenId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllergenById(@PathParam("allergenId") Long id) {
        
        try {
            Allergen a = allergenSessionBean.retrieveAllergenById(id);
            return Response.status(200).entity(
                    a).build();
        } catch (AllergenNotFound ex) {
        JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
        
    } //end
    
    @PUT
    @Path("/updateAllergen/{allergenId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAllergen(@PathParam("allergenId") Long Id, Allergen a){
        Allergen allergen = allergenSessionBean.updateIngredient(Id, a);
        return Response.status(200).entity(allergen).build();
    }  
    

    private AllergenSessionBeanLocal lookupAllergenSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (AllergenSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/AllergenSessionBean!ejb.session.stateless.AllergenSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

   
}
