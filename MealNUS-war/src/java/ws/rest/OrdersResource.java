/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import entity.MealBox;
import entity.OrderEntity;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Path;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import ejb.session.stateless.OrderSessionBeanLocal;
import java.text.ParseException;
import util.exception.OrderNotFoundException;
import util.exception.UnknownPersistenceException;
import util.enumeration.OrderStatus;
import util.exception.UserNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.math.BigDecimal;
import java.util.Map;
import javax.ws.rs.core.Response.Status;
import util.exception.NoResultException;
import ws.model.RetrieveAllOrdersResponse;

/**
 * REST Web Service
 *
 * @author kylie
 */
@Path("orders")
public class OrdersResource {

    @EJB
    private OrderSessionBeanLocal orderSessionBeanLocal;

    public OrdersResource() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public OrderEntity createOrder(OrderEntity o) throws OrderNotFoundException, UnknownPersistenceException, UnknownPersistenceException {
        orderSessionBeanLocal.createOrder(o);
        return o;
    } //end createCustomer 

    @GET
    @Path(value = "retrieveAllOrders") //http://localhost:8080/MealNUS-war/rest/Review/retrieveAllReviews <- this should show json of review class created in db
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllOrders() {
        RetrieveAllOrdersResponse retrieveAllOrdersResponse = new RetrieveAllOrdersResponse(orderSessionBeanLocal.retrieveAllOrders());

        return Response.status(Status.OK).entity(retrieveAllOrdersResponse).build();
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public List<OrderEntity> getAllOrders() {
//        return orderSessionBeanLocal.retrieveAllOrders();
//    } //end 
//    @GET
//    @Path("/{orderId}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getOrderById(@PathParam("id") Long oId) throws OrderNotFoundException {
//        try {
//            OrderEntity o = orderSessionBeanLocal.retrieveOrderById(oId);
//            return Response.status(200).entity(
//                    o).type(MediaType.APPLICATION_JSON).build();
//        } catch (OrderNotFoundException e) {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "Not found")
//                    .build();
//
//            return Response.status(404).entity(exception)
//                    .type(MediaType.APPLICATION_JSON).build();
//        }
//    } //end
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrder(@PathParam("id") Long cId) {
        try {
            OrderEntity c = orderSessionBeanLocal.retrieveOrderById(cId);
            return Response.status(200).entity(
                    c
            ).type(MediaType.APPLICATION_JSON).build();
        } catch (OrderNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    } //end getOrder 

//    @GET
//    @Path("/orderstatus/{OrderStatus}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getOrdersByOrderStatus(@PathParam("orderStatus") OrderStatus orderStatus) {
//        // no need for try catch 
//        List<OrderEntity> o = orderSessionBeanLocal.retrieveOrdersByOrderStatus(orderStatus);
//        return Response.status(200).entity(
//                o).type(MediaType.APPLICATION_JSON).build();
//    } //end
//
//    @GET
//    @Path("/email/{email}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getOrdersByUserEmail(@PathParam("email") String email) throws UserNotFoundException {
//        // no need for try catch 
//        List<OrderEntity> o = orderSessionBeanLocal.retrieveOrdersByUserEmail(email);
//        return Response.status(200).entity(
//                o).type(MediaType.APPLICATION_JSON).build();
//    } //endString email
//
//    @GET
//    @Path("/retrieveOrdersByMealBoxName/{itemName}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getOrdersByMealBoxName(@PathParam("itemName") String name) {
//        // no need for try catch 
//        List<OrderEntity> o = orderSessionBeanLocal.retrieveOrdersByMealBoxName(name);
//        return Response.status(200).entity(
//                o).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    @GET
//    @Path("/{itemName}/OrderEntity/{orderDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getOrdersByMealBoxNameAndDate(@PathParam("itemName") String name,
//            @PathParam("orderDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        List<OrderEntity> o = orderSessionBeanLocal.retrieveOrdersByMealBoxNameAndDate(name, date1);
//        return Response.status(200).entity(
//                o).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    @GET
//    @Path("/retrieveOrdersByMealBoxNameAndDate/{orderDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getOrdersByOrderDate(@PathParam("orderDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        List<OrderEntity> o = orderSessionBeanLocal.retrieveOrdersByOrderDate(date1);
//        return Response.status(200).entity(
//                o).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    // not sure the path for this imma keep it to orderDate for now ;; prob is just a normal date? <-- this is query Date so a general one should be fine
//    @GET
//    @Path("/currentdaterevenue/{queryDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getCurrentDateRevenue(@PathParam("queryDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        BigDecimal revenue = orderSessionBeanLocal.calculateCurrentDateRevenue(date1);
//        return Response.status(200).entity(
//                revenue).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    //check
//    @GET
//    @Path("/currentdatecost/{queryDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getCurrentDateCost(@PathParam("queryDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        BigDecimal revenue = orderSessionBeanLocal.calculateCurrentDateCost(date1);
//        return Response.status(200).entity(
//                revenue).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    // how does this work wow
//    @GET
//    @Path("/topselling/{queryDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response findTopSellingMealBoxes(@PathParam("queryDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        List<Map.Entry<MealBox, Integer>> top = orderSessionBeanLocal.findTopSellingMealBoxes(date1);
//        return Response.status(200).entity(
//                top).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    // check date again <-- KIV first
//    @GET
//    @Path("/mtdturnover/{itemName}/{queryDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getMealBoxMtdTurnover(@PathParam("itemName") String mealboxname, @PathParam("queryDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        BigDecimal revenue = orderSessionBeanLocal.getMealBoxMtdTurnover(mealboxname, date1);
//        return Response.status(200).entity(
//                revenue).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    @GET
//    @Path("/totalturnover/{itemName}/{queryDate}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response geMealBoxTotalTurnover(@PathParam("itemName") String mealboxname, @PathParam("queryDate") String date) throws ParseException {
//        // no need for try catch 
//        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);
//        BigDecimal revenue = orderSessionBeanLocal.geMealBoxTotalTurnover(mealboxname, date1);
//        return Response.status(200).entity(
//                revenue).type(MediaType.APPLICATION_JSON).build();
//    }
//
//    @PUT
//    @Path("/update/{orderId}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response updateOrder(@PathParam("orderId") Long orderId) throws OrderNotFoundException {
//        OrderEntity order = orderSessionBeanLocal.retrieveOrderById(orderId);
//        orderSessionBeanLocal.updateOrder(order);
//        return Response.status(204).build();
//    } //end editCustomer 
//
//    @DELETE
//    @Path("/delete/{orderId}")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response deleteField(@PathParam("orderId") Long orderId) throws OrderNotFoundException {
//        OrderEntity o = orderSessionBeanLocal.retrieveOrderById(orderId);
//        orderSessionBeanLocal.deleteOrder(o);
//        return Response.status(204).build();
//    } //end deleteField
}
