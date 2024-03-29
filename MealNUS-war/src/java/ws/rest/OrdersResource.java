/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.rest;

import ejb.session.stateless.CreditCardSessionBeanLocal;
import ejb.session.stateless.MealBoxSessionBeanLocal;
import entity.OrderEntity;
import java.util.List;
import javax.ws.rs.Path;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import ejb.session.stateless.OrderSessionBeanLocal;
import ejb.session.stateless.UserSessionBeanLocal;
import entity.MealBox;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.util.Pair;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.DELETE;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import util.exception.OrderNotFoundException;
import util.exception.UnknownPersistenceException;
import util.enumeration.OrderStatus;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response.Status;
import util.enumeration.AddressEnum;
import util.exception.UserNotFoundException;
import ws.model.CreateOrderResponse;
import ws.model.RetrieveAllOrdersResponse;
import ws.model.UpdateOrderResponse;

/**
 * REST Web Service
 *
 * @author kylie
 */
@Path("orders")
public class OrdersResource {

    private final CreditCardSessionBeanLocal creditCardSessionBeanLocal;

    private final MealBoxSessionBeanLocal mealBoxSessionBeanLocal;

    private final OrderSessionBeanLocal orderSessionBeanLocal;

    private final UserSessionBeanLocal userSessionBeanLocal;

    public OrdersResource() {
        orderSessionBeanLocal = lookupOrderSessionBeanLocal();
        userSessionBeanLocal = lookupUserSessionBeanLocal();
        mealBoxSessionBeanLocal = lookupMealBoxSessionBeanLocal();
        creditCardSessionBeanLocal = lookupCreditCardSessionBeanLocal();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createOrder(CreateOrderResponse createOrderResponse) throws OrderNotFoundException, UserNotFoundException, UnknownPersistenceException {
        List<Pair<MealBox, Integer>> orderDetails = new ArrayList<>();
        MealBox[] mealboxes = createOrderResponse.getMealBoxes().toArray(new MealBox[createOrderResponse.getMealBoxes().size()]);
        Integer[] quantities = createOrderResponse.getQuantities().toArray(new Integer[createOrderResponse.getQuantities().size()]);

        for (int i = 0; i < mealboxes.length; i++) {
            orderDetails.add(new Pair<>(mealboxes[i], quantities[i]));
        }

        OrderEntity order = new OrderEntity(
                createOrderResponse.getOrderDate(),
                orderDetails,
                createOrderResponse.getDeliveryDate(),
                createOrderResponse.getAddress(),
                createOrderResponse.getOrderStatus(),
                userSessionBeanLocal.retrieveUserById(createOrderResponse.getUserId()),
                creditCardSessionBeanLocal.retrieveCreditCardById(createOrderResponse.getCreditCardId())
        );

        OrderEntity createdOrder = orderSessionBeanLocal.createOrder(order);

        for (int i = 0; i < mealboxes.length; i++) {
            mealBoxSessionBeanLocal.subtractQuantityAvailable(mealboxes[i].getMealBoxId(), quantities[i]);
        }

        List<BigDecimal> priceList = new ArrayList<>();
        List<BigDecimal> costList = new ArrayList<>();

        for (MealBox mealbox : mealboxes) {
            priceList.add(mealbox.getItemPrice());
        }

        for (MealBox mealbox : mealboxes) {
            costList.add(mealbox.getItemCost());
        }

        orderSessionBeanLocal.updatePriceList(createdOrder.getOrderId(), priceList);
        orderSessionBeanLocal.updateCostList(createdOrder.getOrderId(), costList);

        return Response.status(Status.OK).entity(order).build();

    } //end createCustomer 

    // http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders
    @GET
    @Path(value = "retrieveAllOrders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllOrders() {
        RetrieveAllOrdersResponse retrieveAllOrdersResponse = new RetrieveAllOrdersResponse(orderSessionBeanLocal.retrieveAllOrders());
        return Response.status(Status.OK).entity(retrieveAllOrdersResponse).build();
    }

    @GET
    @Path(value = "retrieveOrdersByUser/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveOrdersByUser(@PathParam("userId") Long userId) {
        try {
            List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByUserId(userId);
            GenericEntity<List<OrderEntity>> entity
                    = new GenericEntity<List<OrderEntity>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    }

    @GET
    @Path("/retrieveAllOrderCounts/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllOrderCounts(@PathParam("queryDate") String date) throws ParseException {
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        List<Pair<Date, Integer>> results = orderSessionBeanLocal.retrieveAllOrderCounts(date1);
        GenericEntity<List<Pair<Date, Integer>>> entity
                = new GenericEntity<List<Pair<Date, Integer>>>(results) {
        };
        return Response.status(200).entity(
                entity).type(MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("/getOrder/{orderId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrder(@PathParam("orderId") Long cId) {
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

    @GET
    @Path("/orderstatus/{orderStatus}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByOrderStatus(@PathParam("orderStatus") OrderStatus orderStatus) {
        // no need for try catch 
        List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByOrderStatus(orderStatus);
        GenericEntity<List<OrderEntity>> entity
                = new GenericEntity<List<OrderEntity>>(results) {
        };
        return Response.status(200).entity(
                entity).build();
    } //end

//    // This method is an alternative of the next 2 methods
//    // http://localhost:8080/MealNUS-war/rest/orders/query?{queryParam that you are using}={variable name you are searching for}
//    // e.g. http://localhost:8080/MealNUS-war/rest/orders/query?mealBoxName=Supreme Meat Box
//    @GET
//    @Path("/query")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response searchOrders(@QueryParam("orderStatus") OrderStatus orderStatus,
//            @QueryParam("userEmail") String email,
//            @QueryParam("mealBoxName") String mealBoxName) {
//
//        if (orderStatus != null) {
//            List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByOrderStatus(orderStatus);
//            GenericEntity<List<OrderEntity>> entity
//                    = new GenericEntity<List<OrderEntity>>(results) {
//            };
//            return Response.status(200).entity(
//                    entity).build();
//        } else if (email != null) {
//            try {
//                List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByUserEmail(email);
//                GenericEntity<List<OrderEntity>> entity
//                        = new GenericEntity<List<OrderEntity>>(results) {
//                };
//                return Response.status(200).entity(
//                        entity).build();
//            } catch (UserNotFoundException ex) {
//                JsonObject exception = Json.createObjectBuilder()
//                        .add("error", "Not found")
//                        .build();
//                return Response.status(404).entity(exception)
//                        .build();
//            }
//        } else if (mealBoxName != null) {
//            List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByMealBoxName(mealBoxName);
//            GenericEntity<List<OrderEntity>> entity
//                    = new GenericEntity<List<OrderEntity>>(results) {
//            };
//            return Response.status(200).entity(
//                    entity).build();
//        } else {
//            JsonObject exception = Json.createObjectBuilder()
//                    .add("error", "No query conditions")
//                    .build();
//            return Response.status(400).entity(exception).build();
//        }
//    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/email/user4@gmail.com
    @GET
    @Path("/userId/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByUserEmail(@PathParam("userId") Long userId) {
        try {
            List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByUserId(userId);
            GenericEntity<List<OrderEntity>> entity
                    = new GenericEntity<List<OrderEntity>>(results) {
            };
            return Response.status(200).entity(
                    entity).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception)
                    .build();
        }
    } //endString email

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/retrieveOrdersByMealBoxName/Supreme Meat Box
    @GET
    @Path("/retrieveOrdersByMealBoxName/{itemName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByMealBoxName(@PathParam("itemName") String name) {
        // no need for try catch 
        List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByMealBoxName(name);
        GenericEntity<List<OrderEntity>> entity
                = new GenericEntity<List<OrderEntity>>(results) {
        };
        return Response.status(200).entity(
                entity).build();
    }

    // Be careful about all methods using orderDate, let's go with e.g. 2023-03-22
    // Note: there is only 1 order in datainit and has orderDate 2023-03-22
    // e.g. http://localhost:8080/MealNUS-war/rest/orders/Supreme Meat Box/OrderEntity/2023-03-22
    @GET
    @Path("/{itemName}/OrderEntity/{orderDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByMealBoxNameAndDate(@PathParam("itemName") String name,
            @PathParam("orderDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByMealBoxNameAndDate(name, date1);
        GenericEntity<List<OrderEntity>> entity
                = new GenericEntity<List<OrderEntity>>(results) {
        };
        return Response.status(200).entity(
                entity).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/retrieveOrdersByOrderDate/2023-03-22
    @GET
    @Path("/retrieveOrdersByOrderDate/{orderDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByOrderDate(@PathParam("orderDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        List<OrderEntity> results = orderSessionBeanLocal.retrieveOrdersByOrderDate(date1);
        GenericEntity<List<OrderEntity>> entity
                = new GenericEntity<List<OrderEntity>>(results) {
        };
        return Response.status(200).entity(
                entity).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/currentDateOrderCount/2023-03-22
    @GET
    @Path("/currentDateOrderCount/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentDateOrderCount(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        List<OrderEntity> orders = orderSessionBeanLocal.retrieveOrdersByOrderDate(date1);
        Integer orderCount = orders.size();
        return Response.status(200).entity(
                orderCount).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/currentDateRevenue/2023-03-22
    @GET
    @Path("/currentDateRevenue/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentDateRevenue(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal revenue = orderSessionBeanLocal.calculateCurrentDateRevenue(date1);
        return Response.status(200).entity(
                revenue).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/currentDateCost/2023-03-22
    @GET
    @Path("/currentDateCost/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentDateCost(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal revenue = orderSessionBeanLocal.calculateCurrentDateCost(date1);
        return Response.status(200).entity(
                revenue).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/mtdOrderCount/2023-03-22
    @GET
    @Path("/mtdOrderCount/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMtdOrderCount(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        Integer count = orderSessionBeanLocal.getMtdOrderCount(date1);
        return Response.status(200).entity(
                count).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/mtdRevenue/2023-03-22
    @GET
    @Path("/mtdRevenue/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMtdRevenue(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal revenue = orderSessionBeanLocal.getMtdRevenue(date1);
        return Response.status(200).entity(
                revenue).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/totalRevenue/2023-03-22
    @GET
    @Path("/totalRevenue")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalRevenue() {
        BigDecimal revenue = orderSessionBeanLocal.getTotalRevenue();
        return Response.status(200).entity(
                revenue).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/mtdCost/2023-03-22
    @GET
    @Path("/mtdCost/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMtdCost(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal count = orderSessionBeanLocal.getMtdCost(date1);
        return Response.status(200).entity(
                count).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/mtdProfit/2023-03-22
    @GET
    @Path("/mtdProfit/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMtdProfit(@PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal count = orderSessionBeanLocal.getMtdProfit(date1);
        return Response.status(200).entity(
                count).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/topSellingMealBoxes
    @GET
    @Path("/topSellingMealBoxes")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findTopSellingMealBoxes() throws ParseException {
        // no need for try catch 
        List<Pair<String, Integer>> results = orderSessionBeanLocal.findTopSellingMealBoxes();
        GenericEntity<List<Pair<String, Integer>>> entity
                = new GenericEntity<List<Pair<String, Integer>>>(results) {
        };
        return Response.status(200).entity(
                entity).type(MediaType.APPLICATION_JSON).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/mtdTurnover/Supreme Meat Box/2023-03-22
    // Notice when you try 2023-04-23, it should give 0 since it's > 1 mth since the order was made
    @GET
    @Path("/mtdTurnover/{itemName}/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMealBoxMtdTurnover(@PathParam("itemName") String mealboxname, @PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal revenue = orderSessionBeanLocal.getMealBoxMtdTurnover(mealboxname, date1);
        return Response.status(200).entity(
                revenue).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/totalTurnover/Supreme Meat Box/2023-03-22
    @GET
    @Path("/totalTurnover/{itemName}/{queryDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response geMealBoxTotalTurnover(@PathParam("itemName") String mealboxname, @PathParam("queryDate") String date) throws ParseException {
        // no need for try catch 
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        BigDecimal revenue = orderSessionBeanLocal.geMealBoxTotalTurnover(mealboxname, date1);
        return Response.status(200).entity(
                revenue).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderLocations
    @GET
    @Path("/retrieveAllOrderLocations")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllOrderLocations() {
        List<List<Double>> orderLocations = orderSessionBeanLocal.retrieveAllOrderLocations();
        GenericEntity<List<List<Double>>> entity
                = new GenericEntity<List<List<Double>>>(orderLocations) {
        };
        return Response.status(200).entity(
                entity).build();
    }

    // e.g. http://localhost:8080/MealNUS-war/rest/orders/update/1
    // success should show the success message
    @PUT
    @Path("/updateOrder/{orderId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateOrder(@PathParam("orderId") Long orderId, UpdateOrderResponse updateOrderResponse)
            throws UserNotFoundException {

        System.out.println("Check : " + orderId + " : " + updateOrderResponse.getDeliveryDate());
        Date deliveryDate = updateOrderResponse.getDeliveryDate();
        AddressEnum address = updateOrderResponse.getAddress();
        OrderStatus orderStatus = updateOrderResponse.getOrderStatus();

        orderSessionBeanLocal.updateOrder(orderId, deliveryDate, address, orderStatus);
        String updateSuccessMessage = "Order with ID [" + orderId + "] has been updated successfully!";
        return Response.status(200).entity(updateSuccessMessage).build();
    }

    /*
    @Path("/update2/{orderId}") 
    @Consumes(MediaType.APPLICATION_JSON) 
    @Produces(MediaType.APPLICATION_JSON) 
    public Response updateOrder2(@PathParam("orderId") Long orderId, OrderEntity orderEntity) throws OrderNotFoundException { 
       // OrderEntity order = orderSessionBeanLocal.retrieveOrderById(orderId);
        System.out.println(orderId + " status: " + orderEntity.getOrderStatus()); 
        orderSessionBeanLocal.updateOrder(orderEntity);
        String updateSuccessMsg = "Order with ID [" + orderId + "] has been updated successfully!"; 
        return Response.status(200).entity(updateSuccessMsg).build(); 
    } //end editOrder
     */
    // e.g. http://localhost:8080/MealNUS-war/rest/orders/delete/1
    // success should show the success message
    @DELETE
    @Path("/delete/{orderId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteOrder(@PathParam("orderId") Long orderId) throws OrderNotFoundException {
        orderSessionBeanLocal.deleteOrder(orderId);
        String deleteSuccessMessage = "Order with ID [" + orderId + "] has been deleted successfully!";
        return Response.status(200).entity(deleteSuccessMessage).build();
    } //end deleteOrder

    @PUT
    @Path("cancel/{orderId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cancelOrder(@PathParam("orderId") Long orderId) throws OrderNotFoundException {
        OrderEntity order = orderSessionBeanLocal.retrieveOrderById(orderId);

        OrderEntity updatedOrder = orderSessionBeanLocal.cancelOrder(orderId);

        List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
        for (Pair<MealBox, Integer> detail : orderDetails) {
            MealBox mealbox = detail.getKey();
            Integer quantity = detail.getValue();
            mealBoxSessionBeanLocal.addQuantityAvailable(mealbox.getMealBoxId(), quantity);
        }

        if (updatedOrder != null) {
            return Response.status(Response.Status.OK).entity(updatedOrder).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

    }

    // retrieve order status;
    // http://localhost:8080/MealNUS-war/rest/orders/retrieveAllAddress
    @GET
    @Path(value = "retrieveAllAddress")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllAddress() {
        AddressEnum[] address = AddressEnum.values();
        return Response.status(Status.OK).entity(address).build();
    }

    //retrieve all enum addr
    // http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderStatus
    @GET
    @Path(value = "retrieveAllOrderStatus")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveAllOrderStatus() {
        OrderStatus[] status = OrderStatus.values();
        return Response.status(Status.OK).entity(status).build();
    }

    private UserSessionBeanLocal lookupUserSessionBeanLocal() {
        try {
            Context c = new InitialContext();
            return (UserSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/UserSessionBean!ejb.session.stateless.UserSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private OrderSessionBeanLocal lookupOrderSessionBeanLocal() {
        try {
            Context c = new InitialContext();
            return (OrderSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/OrderSessionBean!ejb.session.stateless.OrderSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private MealBoxSessionBeanLocal lookupMealBoxSessionBeanLocal() {
        try {
            Context c = new InitialContext();
            return (MealBoxSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/MealBoxSessionBean!ejb.session.stateless.MealBoxSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private CreditCardSessionBeanLocal lookupCreditCardSessionBeanLocal() {
        try {
            Context c = new InitialContext();
            return (CreditCardSessionBeanLocal) c.lookup("java:global/MealNUS/MealNUS-ejb/CreditCardSessionBean!ejb.session.stateless.CreditCardSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }
}
