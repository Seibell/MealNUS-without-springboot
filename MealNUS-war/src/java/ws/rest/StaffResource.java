/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.StaffSessionBeanLocal;
import entity.Staff;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.enterprise.context.RequestScoped;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import util.exception.InvalidLoginException;

/**
 * REST Web Service
 *
 * @author ryanl
 */
@Path("Staff")
@RequestScoped
public class StaffResource {

    StaffSessionBeanLocal staffSessionBean = lookupStaffSessionBeanLocal();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of StaffResource
     */
    public StaffResource() {
    }
    
    /*
    * Example GET Request for login: http://localhost:8080/MealNUS-war/rest/Staff/staffLogin?email=staff@gmail.com&password=password
    */
    @Path("staffLogin")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response staffLogin(@QueryParam("email") String email,
            @QueryParam("password") String password) {
        try {
            Staff staff = staffSessionBean.staffLogin(email, password);
            System.out.println("*** staffLogin(): Staff = " + staff.getEmail()+ " login remotely via web service");           

            return Response.status(Response.Status.OK).entity(staff).build();
        }
        catch (InvalidLoginException ex) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(ex.getMessage()).build();
        }
        catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ex.getMessage()).build();
        }
    }

    private StaffSessionBeanLocal lookupStaffSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (StaffSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/StaffSessionBean!ejb.session.stateless.StaffSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
    
    
}
