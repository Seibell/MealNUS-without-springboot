/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import entity.OrderEntity;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import javafx.util.Pair;
import javax.ejb.Local;
import util.enumeration.OrderStatus;
import util.exception.OrderNotFoundException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author Darie
 */
@Local
public interface OrderSessionBeanLocal {

    public OrderEntity createOrder(OrderEntity order) throws OrderNotFoundException, UnknownPersistenceException;

    public List<OrderEntity> retrieveAllOrders();

    public OrderEntity retrieveOrderById(Long orderId) throws OrderNotFoundException;

    public List<OrderEntity> retrieveOrdersByOrderStatus(OrderStatus orderStatus);

    public List<OrderEntity> retrieveOrdersByUserEmail(String email) throws UserNotFoundException;

    public List<OrderEntity> retrieveOrdersByOrderDate(Date queryDate);

    public BigDecimal calculateCurrentDateRevenue(Date queryDate);

    public BigDecimal calculateCurrentDateCost(Date queryDate);

    public int getMtdOrderCount(Date queryDate);

    public BigDecimal getMtdRevenue(Date queryDate);

    public BigDecimal getMtdCost(Date queryDate);

    public BigDecimal getMtdProfit(Date queryDate);

    public List<Pair<String, Integer>> findTopSellingMealBoxes();

    public BigDecimal getMealBoxMtdTurnover(String mealBoxName, Date queryDate);

    public BigDecimal geMealBoxTotalTurnover(String mealBoxNameToCheck, Date queryDate);

    public void deleteOrder(Long oId);

    public List<OrderEntity> retrieveOrdersByMealBoxNameAndDate(String mealBoxNameToCheck, Date queryDate);

    public List<OrderEntity> retrieveOrdersByMealBoxName(String mealBoxNameToCheck);

    public List<Pair<Date, Integer>> retrieveAllOrderCounts(Date queryDate) throws ParseException;

    public BigDecimal getTotalRevenue();

    public void updateOrder(Long orderId, OrderEntity orderToUpdate);

    public OrderEntity cancelOrder(Long orderId);

}