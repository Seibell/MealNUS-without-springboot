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

/**
 * REST Web Service
 *
 * @author kylie
 */
@Path("orders")
public class OrdersResource {
    
    @EJB
     private OrderSessionBeanLocal orderBoxSessionBeanLocal;
    

    public OrdersResource() {
    }
    
    @POST 
    @Consumes(MediaType.APPLICATION_JSON) 
    @Produces(MediaType.APPLICATION_JSON) 
    public OrderEntity createOrder(OrderEntity o) throws OrderNotFoundException, UnknownPersistenceException, UnknownPersistenceException {
     orderBoxSessionBeanLocal.createOrder(o);
      return o; 
    } //end createCustomer 

    @GET 
    @Produces(MediaType.APPLICATION_JSON) 
    public List<OrderEntity> getAllOrder() { 
        return orderBoxSessionBeanLocal.retrieveAllOrders(); 
    } //end 
    
    @GET 
    @Path("/orderid/{orderId}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveOrderById (@PathParam("id") Long bId) throws OrderNotFoundException{ 
      try { 
          OrderEntity o = orderBoxSessionBeanLocal.retrieveOrderById(bId);
          return Response.status(200).entity( 
                  o ).type(MediaType.APPLICATION_JSON).build(); 
      } catch (OrderNotFoundException e) { 
          JsonObject exception = Json.createObjectBuilder() 
                  .add("error", "Not found") 
                  .build(); 
 
          return Response.status(404).entity(exception) 
                         .type(MediaType.APPLICATION_JSON).build(); 
      } 
    } //end
     
    @GET 
    @Path("/orderstatus/{OrderStatus}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveOrdersByOrderStatus(@PathParam("orderStatus") OrderStatus orderStatus) { 
         // no need for try catch 
          List<OrderEntity> o = orderBoxSessionBeanLocal.retrieveOrdersByOrderStatus(orderStatus);
          return Response.status(200).entity( 
                  o ).type(MediaType.APPLICATION_JSON).build(); 
    } //end
     
    @GET 
    @Path("/email/{email}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveOrdersByUserEmail(@PathParam("email") String email) throws UserNotFoundException { 
         // no need for try catch 
          List<OrderEntity> o = orderBoxSessionBeanLocal.retrieveOrdersByUserEmail(email);
          return Response.status(200).entity( 
                  o ).type(MediaType.APPLICATION_JSON).build(); 
    } //endString email
    
     
    @GET 
    @Path("/retrieveOrdersByMealBoxName/{itemName}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveOrdersByMealBoxName(@PathParam("itemName") String name){ 
         // no need for try catch 
          List<OrderEntity> o = orderBoxSessionBeanLocal.retrieveOrdersByMealBoxName(name);
          return Response.status(200).entity( 
                  o ).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
    @GET 
    @Path("/{itemName}/OrderEntity/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveOrdersByMealBoxNameAndDate(@PathParam("itemName") String name, 
             @PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          List<OrderEntity> o = orderBoxSessionBeanLocal.retrieveOrdersByMealBoxNameAndDate(name,date1);
          return Response.status(200).entity( 
                  o ).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
    @GET 
    @Path("/retrieveOrdersByMealBoxNameAndDate/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response retrieveOrdersByMealBoxNameAndDate(@PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          List<OrderEntity> o = orderBoxSessionBeanLocal.retrieveOrdersByOrderDate(date1);
          return Response.status(200).entity( 
                  o ).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
     // not sure the path for this imma keep it to orderDate for now ;; prob is just a normal date?
    @GET 
    @Path("/currentdaterevenue/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response calculateCurrentDateRevenue(@PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          BigDecimal revenue = orderBoxSessionBeanLocal.calculateCurrentDateRevenue(date1);
          return Response.status(200).entity( 
                  revenue).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
     //check
    @GET 
    @Path("/currentdatecost/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response calculateCurrentDateCost(@PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          BigDecimal revenue = orderBoxSessionBeanLocal.calculateCurrentDateCost(date1);
          return Response.status(200).entity( 
                  revenue).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
    // how does this work wow
    @GET 
    @Path("/topselling/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response findTopSellingMealBoxes(@PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          List<Map.Entry<MealBox, Integer>> top = orderBoxSessionBeanLocal.findTopSellingMealBoxes(date1);
          return Response.status(200).entity( 
                  top).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
    // check date again
    @GET 
    @Path("/MtdTurnover/{itemName}/OrderEntity/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response getMealBoxMtdTurnover(@PathParam("itemName") String mealboxname,@PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          BigDecimal revenue = orderBoxSessionBeanLocal.getMealBoxMtdTurnover(mealboxname,date1);
          return Response.status(200).entity( 
                  revenue).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
    @GET 
    @Path("/TotalTurnover/{itemName}/OrderEntity/{orderDate}") 
    @Produces(MediaType.APPLICATION_JSON)
     public Response geMealBoxTotalTurnover(@PathParam("itemName") String mealboxname,@PathParam("orderDate") String date) throws ParseException{ 
         // no need for try catch 
         Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(date);  
          BigDecimal revenue = orderBoxSessionBeanLocal.geMealBoxTotalTurnover(mealboxname,date1);
          return Response.status(200).entity( 
                  revenue).type(MediaType.APPLICATION_JSON).build(); 
    } 
     
    
    @PUT 
    @Path("/update/{orderId}") 
    @Consumes(MediaType.APPLICATION_JSON) 
    @Produces(MediaType.APPLICATION_JSON) 
    public Response updateOrder (@PathParam("orderId") Long orderId) throws OrderNotFoundException { 
         OrderEntity order = orderBoxSessionBeanLocal.retrieveOrderById(orderId);
          orderBoxSessionBeanLocal.updateOrder(order); 
          return Response.status(204).build();
    } //end editCustomer 
    
    @DELETE 
    @Path("/delete/{orderId}") 
    @Produces(MediaType.APPLICATION_JSON) 
    public Response deleteField( @PathParam("orderId") Long orderId) throws OrderNotFoundException {  
        OrderEntity o = orderBoxSessionBeanLocal.retrieveOrderById(orderId);
        orderBoxSessionBeanLocal.deleteOrder(o);
        return Response.status(204).build();    
    } //end deleteField
}
