/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.UserSessionBeanLocal;
import entity.User;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.PersistenceException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;
import util.exception.InvalidLoginException;
import util.exception.UserAlreadyExistsException;
import ws.model.RetrieveAllUsersResponse;

/**
 *
 * @author ryanl
 */
@Path("User")

public class UserResource {

    @Context
    private UriInfo context;

    private final UserSessionBeanLocal userSessionBeanLocal;

    public UserResource() {
        userSessionBeanLocal = lookupUserSessionBeanLocal();
    }

    @GET
    @Path(value = "retrieveAllUsers") //http://localhost:8080/MealNUS-war/rest/User/retrieveAllUsers <- this should show json of user class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllUsers() {
        RetrieveAllUsersResponse retrieveAllUsersResponse = new RetrieveAllUsersResponse(userSessionBeanLocal.retrieveAllUsers());

        return Response.status(Status.OK).entity(retrieveAllUsersResponse).build();
    }

    /*
    * Example GET Request for login: http://localhost:8080/MealNUS-war/rest/User/userLogin?email=user@gmail.com&password=password
     */
    @Path("userLogin")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response userLogin(@QueryParam("email") String email,
            @QueryParam("password") String password) {
        try {
            User user = userSessionBeanLocal.userLogin(email, password);
            System.out.println("*** userLogin(): User = " + user.getEmail() + " login remotely via web service");

            return Response.status(Response.Status.OK).entity(user).build();
        } catch (InvalidLoginException ex) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(ex.getMessage()).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ex.getMessage()).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(User user) {
        try {
            user.setImageURL("https://i.imgur.com/Kvyecsm.png");
            userSessionBeanLocal.createUser(user);
            System.out.println("*** createuser(): User = " + user.getEmail() + " created via web service");

            return Response.status(Response.Status.OK).entity(user).build();
        } catch (PersistenceException | UserAlreadyExistsException ex) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(ex.getMessage()).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("User email already exists!").build();
        }
    }

    @PUT
    @Path("edit/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser(@PathParam("userId") Long userId, User updatedUser) {
        updatedUser.setUserId(userId);

        updatedUser = userSessionBeanLocal.editUser(userId, updatedUser.getFirstName(), updatedUser.getLastName(), updatedUser.getEmail(), updatedUser.getPassword(), updatedUser.getImageURL());

        if (updatedUser != null) {
            return Response.status(Response.Status.OK).entity(updatedUser).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

    }

    @Path("/numOfNewUsersBySignupDate/{queryDate}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response countNumOfNewUsersBySignupDate(@PathParam("queryDate") String date) throws ParseException {

        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        List<User> newUsers = userSessionBeanLocal.retrieveNewUsersBySignupDate(date1);
        return Response.status(Response.Status.OK).entity(newUsers.size()).build();
    }

    private UserSessionBeanLocal lookupUserSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (UserSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/UserSessionBean!ejb.session.stateless.UserSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
