/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.MealBox;
import entity.OrderEntity;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
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

    public List<Map.Entry<MealBox, Integer>> findTopSellingMealBoxes(Date queryDate);

    public BigDecimal getMealBoxMtdTurnover(String mealBoxName, Date queryDate);

    public BigDecimal geMealBoxTotalTurnover(String mealBoxNameToCheck, Date queryDate);

    public void updateOrder(OrderEntity orderToUpdate);

    public void deleteOrder(OrderEntity orderToRemove);

    public List<OrderEntity> retrieveOrdersByMealBoxNameAndDate(String mealBoxNameToCheck, Date queryDate);

    public List<OrderEntity> retrieveOrdersByMealBoxName(String mealBoxNameToCheck);

}
