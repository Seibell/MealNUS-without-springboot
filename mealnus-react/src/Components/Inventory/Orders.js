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
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const Orders = () => {
  const [value, setValue] = React.useState('1');
  const [orders, setOrders] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Axios.get(
      "http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders"
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
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All Orders" value="1" />
              <Tab label="Preparing" value="2" />
              <Tab label="Delivering" value="3" />
              <Tab label="Completed" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>All Orders</caption>
                <TableHead>
                  <TableRow>
                    <TableCell>OrderId</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Delivery Date</TableCell>
                    <TableCell align="right">Delivery Address</TableCell>
                    <TableCell align="right">Profit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(orders.orderEntities) &&
                    orders.orderEntities.map((orders) => (
                      <TableRow key={orders.orderId}>
                        <TableCell component="th" scope="row">
                          {orders.orderId}
                        </TableCell>
                        <TableCell align="right">{orders.orderStatus}</TableCell>
                        <TableCell align="right">{orders.deliveryDate}</TableCell>
                        <TableCell align="right">{orders.address}</TableCell>
                        <TableCell align="right">{orders.priceList}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Three</TabPanel>
        </TabContext>
      </Box>
      <a href="/inventoryhome">Inventory Home</a>
    </ThemeProvider>
  );
}

export default Orders;