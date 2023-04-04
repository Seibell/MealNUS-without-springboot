import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AdminTitle from './AdminTitle';
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';


function AdminOrderTable() {
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders')
            .then(response => response.json())
            .then(data => setOrders(data.orderEntities))
            .catch(error => console.error(error));
    }, []);

    console.log(query);

     //search filter

    const filteredData = orders.filter(
        (order) => 
            order.user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            order.orderId == query ||
            order.address.toLowerCase().includes(query.toLowerCase()) ||
            order.orderStatus.toLowerCase().includes(query.toLowerCase())
     );

    const getOrderStatusColor = (orderStatus) => {
        switch (orderStatus) {
            case "PAID":
                return "orange";
            case "CREATED":
                return "blue";
            case "PREPARING":
                return "green";
            default:
                return "inherit";
        }
    };


    return (
        
            <div>
            <AdminTitle>Orders 
            <div>
                <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                style={{ height: '30px', marginRight: '5px' }}
                                />
            </div>
            </AdminTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Update Order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map(order => (
                        <TableRow key={order.orderId}>
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.user.firstName}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell style={{ color: getOrderStatusColor(order.orderStatus) }}>
                                {order.orderStatus}
                            </TableCell>
                            <TableCell >
                            <button onClick={() => navigate('/UpdateOrder/' + order.orderId)}>
                                Add A MealBox
                            </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
      
    );
}

export default AdminOrderTable;