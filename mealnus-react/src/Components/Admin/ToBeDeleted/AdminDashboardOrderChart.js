import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState, useEffect } from "react";
import Axios from "axios";
import Title from './AdminTitle';


const AdminDashboardOrderChart = () => {
    const [orderCountData, setOrderCountData] = useState([]);

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        // const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Singapore" }).slice(0, 10);
        Axios.get(`http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderCounts/${currentDate}`)
            .then(response => {
                setOrderCountData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <React.Fragment>
            <Title>Order Summary</Title>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={orderCountData}
                    margin={{
                        top: 20,
                        right: 40,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="key"
                        tickFormatter={(date) => {
                            const originalDate = new Date(date.split('T')[0]);
                            const nextDay = new Date(originalDate.getTime() + 24 * 60 * 60 * 1000);
                            return nextDay.toISOString().slice(0, 10);
                        }}
                        label={{ value: '', position: 'insideBottomCentre', offset: 20 }}
                    />
                    <YAxis
                        interval={1}
                        label={{
                            value: 'Orders Per Day',
                            angle: -90,
                            position: 'insideLeftCentre',
                            dy: -10,
                            dx: -25
                        }}
                    />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Area
                        type="monotone"
                        dataKey="value"
                        name="Orders for the Day"
                        stroke="#0f3da8"
                        fill="#d46e02"
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};


export default AdminDashboardOrderChart;