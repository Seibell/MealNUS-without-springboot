import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import AdminTitle from './AdminTitle';

function AdminOrderTable() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders')
            .then(response => response.json())
            .then(data => setOrders(data.orderEntities))
            .catch(error => console.error(error));
    }, []);

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
        <React.Fragment>
            <AdminTitle>Orders</AdminTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.orderId}>
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.user.firstName}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell style={{ color: getOrderStatusColor(order.orderStatus) }}>
                                {order.orderStatus}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default AdminOrderTable;