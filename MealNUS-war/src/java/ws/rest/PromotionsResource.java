package ws.rest;

import ejb.session.stateless.PromotionSessionBeanLocal;
import entity.MealBox;
import entity.Promotion;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import util.exception.PromotionAlreadyAppliedException;
import util.exception.PromotionNotFoundException;
import util.exception.UnknownPersistenceException;
import ws.model.RetrieveAllPromotionsResponse;

/**
 *
 * @author Mehak
 */
@Path("promotion")//Should the p be capitilized?
public class PromotionsResource {

    @Context
    private UriInfo context;
    private final PromotionSessionBeanLocal promotionSessionBeanLocal;

    public PromotionsResource() {
        promotionSessionBeanLocal = lookupPromotionSessionBeanLocal();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/apply/89a00e71-e9f3-45fd-92ad-fcc353833bd0
    @GET
    @Path("/apply/{promotionCode}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response applyPromotionAcrossPlatform(@PathParam("promotionCode") String promotionCode) {
        try {
            List<MealBox> results = promotionSessionBeanLocal.applyPromotionAcrossPlatform(promotionCode);

            GenericEntity<List<MealBox>> entity
                    = new GenericEntity<List<MealBox>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        } catch (PromotionAlreadyAppliedException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Promotion already applied")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end applyPromotionAcrossPlatform
    
        @GET
    @Path("/disable/{promotionCode}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response disablePromotionAcrossPlatform(@PathParam("promotionCode") String promotionCode) {
        try {
            List<MealBox> results = promotionSessionBeanLocal.disablePromotion(promotionCode);

            GenericEntity<List<MealBox>> entity
                    = new GenericEntity<List<MealBox>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end disablePromotionAcrossPlatform

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Promotion createPromotion(Promotion p) throws PromotionNotFoundException, UnknownPersistenceException {
        promotionSessionBeanLocal.createPromotion(p);
        return p;
    } //end createPromotion

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/2
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrievePromotionById(@PathParam("id") Long id) {
        try {
            Promotion promo = promotionSessionBeanLocal.retrievePromotionById(id);

            return Response.status(200).entity(
                    promo).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end retrievePromotionById

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/name/Promotion 1
    @GET
    @Path("/name/{promotionName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrievePromotionByName(@PathParam("promotionName") String promotionName) {
        try {
            List<Promotion> results = promotionSessionBeanLocal.retrievePromotionByName(promotionName);

            GenericEntity<List<Promotion>> entity
                    = new GenericEntity<List<Promotion>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end retrievePromotionByName

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/code/89a00e71-e9f3-45fd-92ad-fcc353833bd0
    //Yet to limit the size of the auto-generated promotion code
    @GET
    @Path("/code/{promotionCode}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrievePromotionByPromotionCode(@PathParam("promotionCode") String promotionCode) {
        try {
            Promotion promo = promotionSessionBeanLocal.retrievePromotionByPromotionCode(promotionCode);

            return Response.status(200).entity(
                    promo).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end retrievePromotionByPromotionCode

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/start/3923-04-13
    @GET
    @Path("/start/{startDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrievePromotionsByStartDate(@PathParam("startDate") String startDate) throws ParseException {
        try {
            Date parsedStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(startDate);
            List<Promotion> results = promotionSessionBeanLocal.retrievePromotionsByStartDate(parsedStartDate);

            GenericEntity<List<Promotion>> entity
                    = new GenericEntity<List<Promotion>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end retrievePromotionsByStartDate

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/end/3923-04-17
    @GET
    @Path("/end/{endDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrievePromotionsByEndDate(@PathParam("endDate") String endDate) throws ParseException {
        try {
            Date parsedEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(endDate);
            List<Promotion> results = promotionSessionBeanLocal.retrievePromotionsByEndDate(parsedEndDate);

            GenericEntity<List<Promotion>> entity
                    = new GenericEntity<List<Promotion>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (PromotionNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //end retrievePromotionsByEndDate

    @GET
    @Path(value = "retrieveAllPromotions") //http://localhost:8080/MealNUS-war/rest/promotion/retrieveAllPromotions
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllPromotions() {
        RetrieveAllPromotionsResponse retrieveAllPromotionsResponse = new RetrieveAllPromotionsResponse(promotionSessionBeanLocal.retrieveAllPromotions());

        return Response.status(Response.Status.OK).entity(retrieveAllPromotionsResponse).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/promotion/update/1
    // success should show the success message
    @PUT
    @Path("/update/{promotionId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePromotion(@PathParam("promotionId") Long promotionId) throws PromotionNotFoundException {
        Promotion promo = promotionSessionBeanLocal.retrievePromotionById(promotionId);
        promotionSessionBeanLocal.updatePromotion(promo);
        String updateSuccessMsg = "Promotion with ID [" + promo.getPromotionId() + "] has been updated successfully!";
        return Response.status(200).entity(updateSuccessMsg).build();
    } //end editPromotion

    //http://localhost:8080/MealNUS-war/rest/promotion/delete/1
    @DELETE
    @Path("/delete/{promotionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePromotion(@PathParam("promotionId") Long promotionId) throws PromotionNotFoundException {
        promotionSessionBeanLocal.deletePromotion(promotionId);
        String deleteSuccessMsg = "Promotion with ID [" + promotionId + "] has been deleted successfully!";
        return Response.status(200).entity(deleteSuccessMsg).build();
    } //end deletePromotion

    private PromotionSessionBeanLocal lookupPromotionSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (PromotionSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/PromotionSessionBean!ejb.session.stateless.PromotionSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
