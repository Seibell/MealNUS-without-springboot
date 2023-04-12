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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.util.Pair;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import util.enumeration.OrderStatus;
import util.exception.OrderNotFoundException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author Darie
 */
@Stateless
public class OrderSessionBean implements OrderSessionBeanLocal {

    @PersistenceContext(unitName = "MealNUS-ejbPU")
    private EntityManager em;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @Override
    public OrderEntity createOrder(OrderEntity order) throws OrderNotFoundException, UnknownPersistenceException {
        em.persist(order);
        em.flush();
        return order;
    }

    // This method helps with Order Management :: Orders Overview
    @Override
    public List<OrderEntity> retrieveAllOrders() {
        Query query = em.createQuery("SELECT o FROM OrderEntity o");
        return query.getResultList();
    }

    @Override
    public OrderEntity retrieveOrderById(Long orderId) throws OrderNotFoundException {
        OrderEntity order = em.find(OrderEntity.class, orderId);

        if (order != null) {
            return order;
        } else {
            throw new OrderNotFoundException("Order ID [" + orderId + "] not found in system!");
        }
    }

    // This method supports Order Management :: Daily Orders
    @Override
    public List<OrderEntity> retrieveOrdersByOrderStatus(OrderStatus orderStatus) {
        Query query = em.createQuery("SELECT o FROM OrderEntity o WHERE o.orderStatus = :inOrderStatus", OrderEntity.class);
        query.setParameter("inOrderStatus", orderStatus);
        return query.getResultList();
    }

    // This method supports Customer Portal Order Management
    @Override
    public List<OrderEntity> retrieveOrdersByUserEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT o FROM OrderEntity o WHERE o.user.email = :inUserEmail");
        query.setParameter("inUserEmail", email);
        return query.getResultList();
    }

    // This method will help with finding MTD and Total Turnover for each type of MealBox
    // It just takes all the orders since the start of MealNUS, then filter out orders that contain the mealBoxName concerned
    @Override
    public List<OrderEntity> retrieveOrdersByMealBoxName(String mealBoxNameToCheck) {
//        String query = "SELECT o FROM OrderEntity o JOIN o.orderDetails oD JOIN oD.getKey() mb WHERE mb.itemName = :inName";
//        TypedQuery<OrderEntity> typedQuery = em.createQuery(query, OrderEntity.class);
//        typedQuery.setParameter("inName", mealBoxNameToCheck);
//        List<OrderEntity> orders = typedQuery.getResultList();

        List<OrderEntity> orderList = retrieveAllOrders();
        if (orderList.isEmpty()) {
            return orderList; //return empty list to signify no order made under mealBoxNameToCheck
        }

        ArrayList<OrderEntity> ordersThatMatchMealBoxNameToCheck = new ArrayList<>();

        for (OrderEntity order : orderList) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                MealBox mealBox = orderLineItem.getKey();
                String mealBoxName = mealBox.getItemName();
                if (mealBoxName.equals(mealBoxNameToCheck)) {
                    ordersThatMatchMealBoxNameToCheck.add(order);
                    break;
                }
            }
        }
        return ordersThatMatchMealBoxNameToCheck;
    }

    @Override
    public List<OrderEntity> retrieveOrdersByMealBoxNameAndDate(String mealBoxNameToCheck, Date queryDate) {
        List<OrderEntity> orderList = retrieveOrdersByOrderDate(queryDate);

        if (orderList.isEmpty()) {
            return orderList; //return empty list to signify no order made under mealBoxNameToCheck
        }

        ArrayList<OrderEntity> ordersThatMatchMealBoxNameToCheck = new ArrayList<>();

        for (OrderEntity order : orderList) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                MealBox mealBox = orderLineItem.getKey();
                String mealBoxName = mealBox.getItemName();
                if (mealBoxName.equals(mealBoxNameToCheck)) {
                    ordersThatMatchMealBoxNameToCheck.add(order);
                    break;
                }
            }
        }

        return ordersThatMatchMealBoxNameToCheck;
    }

    // Dashboard :: Order Summary
    @Override
    public List<OrderEntity> retrieveOrdersByOrderDate(Date queryDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date firstSecondOfDay = cal.getTime();
        cal.add(Calendar.DATE, 1);
        cal.add(Calendar.MILLISECOND, -1);
        Date lastSecondOfDay = cal.getTime();

        Query query = em.createQuery("SELECT o FROM OrderEntity o WHERE o.orderDate >= :start AND o.orderDate <= :end", OrderEntity.class);
        query.setParameter("start", firstSecondOfDay);
        query.setParameter("end", lastSecondOfDay);
        return query.getResultList();
    }

    @Override
    public List<Pair<Date, Integer>> retrieveAllOrderCounts(Date queryDate) throws ParseException {
        List<OrderEntity> allOrders = retrieveAllOrders();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String date1 = sdf.format(allOrders.get(0).getOrderDate());
        String date2 = sdf.format(queryDate);
        Date dateFirst = sdf.parse(date1);
        Date dateLast = sdf.parse(date2);

        Date referenceDate = dateFirst;
        Calendar cal = Calendar.getInstance();
        cal.setTime(referenceDate);

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(dateLast);
        calEnd.add(Calendar.DAY_OF_MONTH, 2);
        Date endDate = calEnd.getTime();

        Map<Date, Integer> orderCountByMonth = new HashMap<>();

        while (referenceDate.before(endDate)) {
            List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(referenceDate);
            Integer currentDateOrderCount = currentDateOrders.size();

            Calendar currentCal = Calendar.getInstance();
            currentCal.setTime(referenceDate);
            currentCal.set(Calendar.DAY_OF_MONTH, 1); // set to first day of month
            Date currentMonth = currentCal.getTime();

            Integer currentMonthOrderCount = orderCountByMonth.get(currentMonth);
            if (currentMonthOrderCount == null) {
                currentMonthOrderCount = 0;
            }
            currentMonthOrderCount += currentDateOrderCount;
            orderCountByMonth.put(currentMonth, currentMonthOrderCount);

            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        List<Pair<Date, Integer>> result = new ArrayList<>();
        for (Map.Entry<Date, Integer> entry : orderCountByMonth.entrySet()) {
            result.add(new Pair<>(entry.getKey(), entry.getValue()));
        }

        Collections.sort(result, (p1, p2) -> p1.getKey().compareTo(p2.getKey()));

        return result;

    }

    @Override
    public List<List<Double>> retrieveAllOrderLocations() {
        HashMap<String, Pair<Double, Double>> locationMap = new HashMap<>();
        locationMap.put("EUSOFF_HALL", new Pair<>(1.294546, 103.772899));
        locationMap.put("UTOWN_RESIDENCES", new Pair<>(1.305786, 103.774228));
        locationMap.put("TEMBUSU_COLLEGE", new Pair<>(1.298481, 103.773604));
        locationMap.put("RESIDENTIAL_COLLEGE_FOUR", new Pair<>(1.299888, 103.770930));
        locationMap.put("PRINCE_GEORGE_PARK_RESIDENCE", new Pair<>(1.291369, 103.778046));
        locationMap.put("RIDGE_VIEW_RESIDENTIAL_COLLEGE", new Pair<>(1.294967, 103.774687));
        locationMap.put("RAFFLES_HALL", new Pair<>(1.294356, 103.773645));
        locationMap.put("TEMASEK_HALL", new Pair<>(1.294121, 103.772654));
        locationMap.put("KENT_RIDGE_HALL", new Pair<>(1.292138, 103.774123));
        locationMap.put("SHEARES_HALL", new Pair<>(1.293299, 103.772815));
        locationMap.put("KING_EDWARD_VII_HALL", new Pair<>(1.294776, 103.774031));
        locationMap.put("KENT_VALE", new Pair<>(1.295276, 103.782169));
        locationMap.put("UNIVERSITY_HALL", new Pair<>(1.297121, 103.772783));
        locationMap.put("EUSOFF_HALL", new Pair<>(1.294546, 103.772899));

        List<OrderEntity> orders = retrieveAllOrders();
        List<List<Double>> locationList = new ArrayList<>();

        for (OrderEntity order : orders) {
            String address = order.getAddress().toString();
            Pair<Double, Double> coordinates = locationMap.get(address);
            if (coordinates != null) {
                List<Double> location = new ArrayList<>();
                location.add(coordinates.getKey());
                location.add(coordinates.getValue());
                locationList.add(location);
            }
        }
        return locationList;
    }

    // Note: Revenue calculation inaccurate if need to consider refunds/returns
    @Override
    public BigDecimal calculateCurrentDateRevenue(Date queryDate) {
        List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(queryDate);

        if (currentDateOrders.isEmpty()) {
            return BigDecimal.ZERO; // no order today means no revenue today
        }

        BigDecimal revenue = BigDecimal.ZERO;
        for (OrderEntity order : currentDateOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            int i = 0;
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                BigDecimal mealBoxPrice = order.getPriceList().get(i);
                Integer quantity = orderLineItem.getValue();
                BigDecimal orderLineItemValue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                revenue = revenue.add(orderLineItemValue);
                i++;
            }
        }
        return revenue.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    @Override
    public BigDecimal calculateCurrentDateCost(Date queryDate) {
        List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(queryDate);

        if (currentDateOrders.isEmpty()) {
            return BigDecimal.ZERO; // no order today means no cost today
        }

        BigDecimal cost = BigDecimal.ZERO;
        for (OrderEntity order : currentDateOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            int i = 0;
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                BigDecimal mealBoxCost = order.getCostList().get(i);
                Integer quantity = orderLineItem.getValue();
                BigDecimal orderLineItemCost = mealBoxCost.multiply(BigDecimal.valueOf(quantity));
                cost = cost.add(orderLineItemCost);
                i++;
            }
        }
        return cost.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    // Dashboard :: MTD Sales Overview :: OrderEntity
    @Override
    public int getMtdOrderCount(Date queryDate) {

        List<OrderEntity> orders = retrieveAllOrders();
        if (queryDate.before(orders.get(0).getOrderDate())) {
            return 0;
        }

        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        int mtdNumOfOrders = 0;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            List<OrderEntity> currentDateOrders = retrieveOrdersByOrderDate(referenceDate);
            int currentDateOrderCount = currentDateOrders.size();
            mtdNumOfOrders += currentDateOrderCount;
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        return mtdNumOfOrders;
    }

    // Dashboard :: MTD Sales Overview :: Revenue
    @Override
    public BigDecimal getMtdRevenue(Date queryDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        BigDecimal mtdOrderRevenue = BigDecimal.ZERO;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            BigDecimal currentDateRevenue = calculateCurrentDateRevenue(referenceDate);
            mtdOrderRevenue = mtdOrderRevenue.add(currentDateRevenue);
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        return mtdOrderRevenue.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    @Override
    public BigDecimal getTotalRevenue() {
        List<OrderEntity> orderList = retrieveAllOrders();

        if (orderList.isEmpty()) {
            return BigDecimal.ZERO; // no orders means no revenue
        }

        BigDecimal revenue = BigDecimal.ZERO;
        for (OrderEntity order : orderList) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            int i = 0;
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                BigDecimal mealBoxPrice = order.getPriceList().get(i);
                Integer quantity = orderLineItem.getValue();
                BigDecimal orderLineItemValue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                revenue = revenue.add(orderLineItemValue);
                i++;
            }
        }
        return revenue.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    // Dashboard :: MTD Sales Overview :: Cost
    @Override
    public BigDecimal getMtdCost(Date queryDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        BigDecimal mtdOrderCost = BigDecimal.ZERO;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            BigDecimal currentDateCost = calculateCurrentDateCost(referenceDate);
            mtdOrderCost = mtdOrderCost.add(currentDateCost);
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }

        return mtdOrderCost.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    // Dashboard :: MTD Sales Overview :: Profit
    @Override
    public BigDecimal getMtdProfit(Date queryDate
    ) {
        return getMtdRevenue(queryDate).subtract(getMtdCost(queryDate)).setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    // Dashboard :: Top Selling Box (since start of MealNUS)
    // Arranges all mealboxes from top to worst selling QUANTITIES
    // Returns sorted list of mealboxes and their corresponding sold quantities
    @Override
    public List<Pair<String, Integer>> findTopSellingMealBoxes() {

        List<OrderEntity> allOrders = retrieveAllOrders();
        Map<String, Integer> mealBoxCounts = new HashMap<>();
        for (OrderEntity order : allOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            for (Pair<MealBox, Integer> orderDetail : orderDetails) {
                String mealBoxName = orderDetail.getKey().getItemName();
                int quantitySold = orderDetail.getValue();
                int totalSales = mealBoxCounts.getOrDefault(mealBoxName, 0) + quantitySold;
                mealBoxCounts.put(mealBoxName, totalSales);
            }
        }

        List<Pair<String, Integer>> sortedMealBoxList = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : mealBoxCounts.entrySet()) {
            String mealBoxName = entry.getKey();
            int soldQuantity = entry.getValue();
            sortedMealBoxList.add(new Pair<>(mealBoxName, soldQuantity));
        }

        Collections.sort(sortedMealBoxList, new Comparator<Pair<String, Integer>>() {
            @Override
            public int compare(Pair<String, Integer> mealBox1, Pair<String, Integer> mealBox2) {
                return mealBox2.getValue().compareTo(mealBox1.getValue());
            }
        });

        return sortedMealBoxList;
    }

    // Product Detail :: MTD Turnover
    // Turnover := Revenue
    @Override
    public BigDecimal getMealBoxMtdTurnover(String mealBoxNameToCheck, Date queryDate) {
        BigDecimal mealBoxMtdTurnover = BigDecimal.ZERO;

        Calendar cal = Calendar.getInstance();
        cal.setTime(queryDate);
        cal.add(Calendar.MONTH, -1);
        Date oneMonthBeforeQueryDate = cal.getTime();
        Date referenceDate = oneMonthBeforeQueryDate;

        Calendar calEnd = Calendar.getInstance();
        calEnd.setTime(queryDate);
        calEnd.add(Calendar.DAY_OF_MONTH, 1);
        Date endDate = calEnd.getTime();

        while (referenceDate.before(endDate)) {
            List<OrderEntity> mealBoxOrders = retrieveOrdersByMealBoxNameAndDate(mealBoxNameToCheck, referenceDate);
            for (OrderEntity order : mealBoxOrders) {
                List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
                for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                    MealBox mealBox = orderLineItem.getKey();
                    String mealBoxName = mealBox.getItemName();
                    if (mealBoxName.equals(mealBoxNameToCheck)) {
                        BigDecimal mealBoxPrice = order.getPriceList().get(orderDetails.indexOf(orderLineItem));
                        Integer quantity = orderLineItem.getValue();
                        BigDecimal orderLineItemRevenue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                        mealBoxMtdTurnover = mealBoxMtdTurnover.add(orderLineItemRevenue);
                        break;
                    }
                }
            }
            cal.add(Calendar.DAY_OF_MONTH, 1);
            referenceDate = cal.getTime();
        }
        return mealBoxMtdTurnover.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    // Product Detail :: Total Turnover
    @Override
    public BigDecimal geMealBoxTotalTurnover(String mealBoxNameToCheck, Date queryDate) {
        BigDecimal mealBoxTurnover = BigDecimal.ZERO;
        List<OrderEntity> mealBoxOrders = retrieveOrdersByMealBoxName(mealBoxNameToCheck);
        for (OrderEntity order : mealBoxOrders) {
            List<Pair<MealBox, Integer>> orderDetails = order.getOrderDetails();
            for (Pair<MealBox, Integer> orderLineItem : orderDetails) {
                MealBox mealBox = orderLineItem.getKey();
                String mealBoxName = mealBox.getItemName();
                if (mealBoxName.equals(mealBoxNameToCheck)) {
                    BigDecimal mealBoxPrice = order.getPriceList().get(orderDetails.indexOf(orderLineItem));
                    Integer quantity = orderLineItem.getValue();
                    BigDecimal orderLineItemValue = mealBoxPrice.multiply(BigDecimal.valueOf(quantity));
                    mealBoxTurnover = mealBoxTurnover.add(orderLineItemValue);
                }
            }
        }
        return mealBoxTurnover.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    @Override
    public void updateOrder(Long orderId, OrderEntity orderToUpdate) {

        OrderEntity updatedOrder = em.find(OrderEntity.class, orderId);
        updatedOrder.setOrderDate(orderToUpdate.getOrderDate());
        updatedOrder.setOrderDetails(orderToUpdate.getOrderDetails());
        updatedOrder.setPriceList(orderToUpdate.getPriceList());
        updatedOrder.setCostList(orderToUpdate.getCostList());
        updatedOrder.setDeliveryDate(orderToUpdate.getDeliveryDate());
        updatedOrder.setAddress(orderToUpdate.getAddress());
        updatedOrder.setOrderStatus(orderToUpdate.getOrderStatus());
        updatedOrder.setUser(orderToUpdate.getUser());
        em.merge(updatedOrder);
    }

    /*
    @Override
    public void updateOrder(OrderEntity orderToUpdate) {
        try {
            OrderEntity updatedOrder = retrieveOrderById(orderToUpdate.getOrderId());
            updatedOrder.setOrderDate(orderToUpdate.getOrderDate());
            updatedOrder.setOrderDetails(orderToUpdate.getOrderDetails());
            updatedOrder.setPriceList(orderToUpdate.getPriceList());
            updatedOrder.setCostList(orderToUpdate.getCostList());
            updatedOrder.setDeliveryDate(orderToUpdate.getDeliveryDate());
            updatedOrder.setAddress(orderToUpdate.getAddress());
            updatedOrder.setOrderStatus(orderToUpdate.getOrderStatus());
            //dont need this ba you cant be updating the user
            updatedOrder.setUser(orderToUpdate.getUser());
            em.merge(updatedOrder);      
        } catch (OrderNotFoundException ex) {
            Logger.getLogger(OrderSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
     */
    @Override
    public void deleteOrder(Long oId) {
        try {
            OrderEntity order = retrieveOrderById(oId);
            em.remove(order);
        } catch (OrderNotFoundException ex) {
            Logger.getLogger(OrderSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public OrderEntity cancelOrder(Long orderId) {
        OrderEntity order = em.find(OrderEntity.class, orderId);

        if (order != null) {
            order.setOrderStatus(OrderStatus.CANCELLED);
            em.merge(order);
        }
        return order;
    }
}
