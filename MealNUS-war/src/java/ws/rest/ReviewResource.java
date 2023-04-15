/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.MealBoxSessionBeanLocal;
import ejb.session.stateless.ReviewSessionBeanLocal;
import ejb.session.stateless.UserSessionBeanLocal;
import entity.MealBox;
import entity.Review;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;
import util.exception.MealBoxNotFoundException;
import util.exception.UserNotFoundException;
import ws.model.CreateReviewResponse;
import ws.model.RetrieveAllReviewsResponse;

/**
 *
 * @author 60540
 */
@Path("Review")
public class ReviewResource {

    @Context
    private UriInfo context;

    private final ReviewSessionBeanLocal reviewSessionBeanLocal;

    private final UserSessionBeanLocal userSessionBeanLocal;

    private final MealBoxSessionBeanLocal mealBoxSessionBeanLocal;

    public ReviewResource() {
        reviewSessionBeanLocal = lookupReviewSessionBeanLocal();
        userSessionBeanLocal = lookupUserSessionBeanLocal();
        mealBoxSessionBeanLocal = lookupMealBoxSessionBeanLocal();
    }

    @GET
    @Path(value = "retrieveAllReviews") //http://localhost:8080/MealNUS-war/rest/Review/retrieveAllReviews <- this should show json of review class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllReviews() {
        RetrieveAllReviewsResponse retrieveAllReviewsResponse = new RetrieveAllReviewsResponse(reviewSessionBeanLocal.retrieveAllReviews());

        return Response.status(Status.OK).entity(retrieveAllReviewsResponse).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewReview(CreateReviewResponse createReviewResponse) throws UserNotFoundException, MealBoxNotFoundException {

        System.out.println(createReviewResponse.getItemCode() == null);
        MealBox test = mealBoxSessionBeanLocal.retrieveMealBoxById(createReviewResponse.getItemCode());
        Review review = new Review(
                createReviewResponse.getReviewDate(),
                createReviewResponse.getStars(),
                createReviewResponse.getComments(),
                userSessionBeanLocal.retrieveUserById(createReviewResponse.getUserId())
                //test
        //mealBoxSessionBeanLocal.retrieveMealBoxById(createReviewResponse.getItemCode())
        );

        reviewSessionBeanLocal.createReview(review);
        //mealBoxSessionBeanLocal.retrieveMealBoxById(createReviewResponse.getItemCode()).addReview(review);
        test.addReview(review);
        mealBoxSessionBeanLocal.updateMealBox(test);
        System.out.println("###########TEST HERE test:" + test.getReviews().toString());
        System.out.println("###########TEST HERE sessionbean:" + mealBoxSessionBeanLocal.retrieveMealBoxById(createReviewResponse.getItemCode()).getReviews().toString());
        return Response.status(Status.OK).entity(review).build();
    }

    private ReviewSessionBeanLocal lookupReviewSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (ReviewSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/ReviewSessionBean!ejb.session.stateless.ReviewSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
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
