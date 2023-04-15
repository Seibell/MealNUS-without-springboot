import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import Axios from "axios";
import { scaleLinear } from "d3";
import { useEffect, useState } from "react";
import { tokens } from "./AdminTheme";

const MonthlyOrderLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders")
            .then(response => {
                setOrderData(response.data.orderEntities);
                console.log(response.data.orderEntities);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    console.log(orderData);

    const yMax = Math.max(...orderData.map(d => d.value));
    const yScale = scaleLinear().domain([0, yMax]).nice();
    const tickValues = yScale.ticks();

    const abbreviatedDeliveryAddress = (address) => {
        switch (address) {
            case "EUSOFF_HALL":
                return "EH";
            case "UTOWN_RESIDENCES":
                return "UTR";
            case "TEMBUSU_COLLEGE":
                return "TC";
            case "RESIDENTIAL_COLLEGE_FOUR":
                return "RC4";
            case "PRINCE_GEORGE_PARK_RESIDENCE":
                return "PGP";
            case "RIDGE_VIEW_RESIDENTIAL_COLLEGE":
                return "RVRC";
            case "RAFFLES_HALL":
                return "RH";
            case "TEMASEK_HALL":
                return "TH";
            case "KENT_RIDGE_HALL":
                return "KRH";
            case "SHEARES_HALL":
                return "SH";
            case "KING_EDWARD_VII_HALL":
                return "KE7";
            case "KENT_VALE":
                return "KV";
            case "UNIVERSITY_HALL":
                return "UH";
            default:
                return address;
        }
    };

    const processDataForBarChart = (orders) => {
        const filteredOrders = orders.filter(
            (order) =>
                order.orderStatus === "PREPARING" ||
                order.orderStatus === "DELIVERING" ||
                order.orderStatus === "PAID"
        );
        const addressCounts = filteredOrders.reduce((acc, order) => {
            const deliveryAddress = abbreviatedDeliveryAddress(order.address.toString());
            acc[deliveryAddress] = (acc[deliveryAddress] || 0) + 1;
            return acc;
        }, {});

        const sortedAddresses = Object.keys(addressCounts).sort(
            (a, b) => a.charAt(0) - b.charAt(0)
        );

        const colors = [
            "#0088FE",
            "#00C49F",
            "#FFBB28",
            "#FF8042",
            "#AF19FF",
            "#FF1919",
            "#666666",
            "#333333",
            "#FF6A00",
            "#FFC400",
            "#4F4F4F",
            "#A4A4A4",
            "#0072C6",
        ];

        const data = sortedAddresses.map((deliveryAddress, index) => ({
            deliveryAddress,
            "Qty of Orders": addressCounts[deliveryAddress],
            color: colors[index % colors.length],
        }));

        // setOrderData(data);
        console.log(data);
        return data;
    };

    return (
        <ResponsiveBar
            data={processDataForBarChart(orderData)}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
            }}
            keys={["Qty of Orders"]}
            indexBy="deliveryAddress"
            margin={{ top: 5, right: 90, bottom: 25, left: 35 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            color={({ index }) => colors[index % colors.length]}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            borderColor={{
                from: "color",
                modifiers: [["darker", "1.6"]],
            }}
            yFormat=".0f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Address", // changed
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Number of Orders", // changed
                legendPosition: "middle",
                legendOffset: -30,
                tickValues: { tickValues },
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 88,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 90,
                    itemHeight: 368,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.8,
                    symbolSize: 12,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 4,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default MonthlyOrderLineChart;