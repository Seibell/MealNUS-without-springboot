/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author ryanl
 */

@javax.ws.rs.ApplicationPath("rest")
public class ApplicationConfig extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    
    
    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) 
    {
        resources.add(ws.rest.AllergenResource.class);
        resources.add(ws.rest.CategoryResponse.class);
        resources.add(ws.rest.CorsFilter.class);
        resources.add(ws.rest.ForumResource.class);
        resources.add(ws.rest.IngredientResource.class);
        resources.add(ws.rest.MealBoxResource.class);
        resources.add(ws.rest.OrdersResource.class);
        resources.add(ws.rest.PromotionsResource.class);
        resources.add(ws.rest.ReviewResource.class);
        resources.add(ws.rest.StaffResource.class);
        resources.add(ws.rest.UserResource.class);
    }    
}
