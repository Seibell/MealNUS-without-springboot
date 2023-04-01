/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.IngredientSessionBeanLocal;
import entity.Ingredient;
import entity.OrderEntity;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import util.exception.IngredientNotFoundException;
import util.exception.OrderNotFoundException;

/**
 * REST Web Service
 *
 * @author kylie
 */
@Path("Ingredient")
@RequestScoped
public class IngredientResource {

    IngredientSessionBeanLocal ingredientSessionBean = lookupIngredientSessionBeanLocal();
    public IngredientResource() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Ingredient createIngredient(Ingredient i){
        ingredientSessionBean.createIngredient(i);
        return i;
    } //end

    // http://localhost:8080/MealNUS-war/rest/Ingredient/retrieveAllIngredient
    @GET
    @Path(value = "retrieveAllIngredient")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllIngredient() {
        List<Ingredient> list = ingredientSessionBean.retrieveAllIngredients();
        GenericEntity<List<Ingredient>> entity = new GenericEntity<List<Ingredient>>(list) { 
            }; 
 
            return Response.status(200).entity( 
                    entity 
            ).build();
    }
    
    @GET
    @Path("/ingredient/{ingredientId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIngredientById(@PathParam("ingredientId") Long id) {
        
        try {
            Ingredient i = ingredientSessionBean.retrieveIngredientById(id);
            return Response.status(200).entity(
                    i).build();
        } catch (IngredientNotFoundException ex) {
        JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
        
    } //end
    
    @PUT
    @Path("/updateIngredient/{ingredientId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateIngredient(@PathParam("ingredientId") Long Id, Ingredient i){
        Ingredient ingred = ingredientSessionBean.updateIngredient(Id, i);
        return Response.status(200).entity(ingred).build();
    }  
    
    @DELETE
    @Path("/delete/{ingredientId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteIngredient(@PathParam("ingredientId") Long Id) throws IngredientNotFoundException {
        Ingredient i;
        try {
            i = ingredientSessionBean.retrieveIngredientById(Id);
            ingredientSessionBean.deleteIngredient(i);
            String deleteSuccessMsg = "Ingredient with ID [" + Id + "] has been deleted successfully!";
            return Response.status(200).entity(deleteSuccessMsg).build();
        } catch (IngredientNotFoundException ex) {
            throw new IngredientNotFoundException();
        }
    } //end deleteOrder
    
    
    private IngredientSessionBeanLocal lookupIngredientSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (IngredientSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/IngredientSessionBean!ejb.session.stateless.IngredientSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

   
}
