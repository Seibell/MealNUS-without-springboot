/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.AllergenSessionBeanLocal;
import entity.Allergen;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.POST;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
