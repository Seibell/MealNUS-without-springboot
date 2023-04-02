import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


    const Orders = () => {
        const [value, setValue] = React.useState('1');
        const [orders, setOrders] = useState([]);

        const handleChange = (event, newValue) => {
            setValue(newValue);
          };

        useEffect(() => {
            Axios.get(
              "http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxes"
            )
              .then((response) => {
                setOrders(response.data);
                console.log(response.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }, []);
        

        return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>All MealBox</caption>
        <TableHead>
          <TableRow>
            <TableCell>MealBox Id</TableCell>
            <TableCell align="right">Quantity Available</TableCell>
            <TableCell align="right">Selling Price</TableCell>
            <TableCell align="right">Cost Price</TableCell>
            <TableCell align="right">Total Sold as of to date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Array.isArray(orders.mealBoxEntities) &&
                            orders.mealBoxEntities.map((item) => (
            <TableRow key={item.mealBoxId}>
              <TableCell component="th" scope="row">
              {item.mealBoxId}
              </TableCell>
              <TableCell align="right">{item.quantityAvailable}</TableCell>
              <TableCell align="right">{item.itemPrice}</TableCell>
              <TableCell align="right">{item.itemCost}</TableCell>
              <TableCell align="right">{item.itemDescription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
        );
    }

export default Orders;