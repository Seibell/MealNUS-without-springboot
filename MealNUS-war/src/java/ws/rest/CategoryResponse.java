/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.CategorySessionBeanLocal;
import entity.Category;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
 * REST Web Service
 *
 * @author kylie
 */
@Path("Category")
public class CategoryResponse {

    CategorySessionBeanLocal categorySessionBean = lookupCategorySessionBeanLocal();

    
    
    public CategoryResponse() {
    }

    // http://localhost:8080/MealNUS-war/rest/Category/retrieveAllCategories
    @GET
    @Path(value = "retrieveAllCategories")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllCategories() {
        List<Category> list = categorySessionBean.retrieveAllCategories();
        GenericEntity<List<Category>> entity = new GenericEntity<List<Category>>(list) { 
            }; 
 
            return Response.status(200).entity( 
                    entity 
            ).build();
    }

    private CategorySessionBeanLocal lookupCategorySessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (CategorySessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/CategorySessionBean!ejb.session.stateless.CategorySessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
    
}
