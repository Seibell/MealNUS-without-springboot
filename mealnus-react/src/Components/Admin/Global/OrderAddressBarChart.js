import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "./AdminTheme";
import { useState, useEffect } from "react";
import Axios from "axios";
import { countBy } from "lodash";

const MonthlyOrderLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderCountData, setOrderCountData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrders")
            .then((response) => {
                const orderCounts = countBy(response.data.orderEntities, "address");
                const data = Object.entries(orderCounts).map(([address, count]) => ({
                    id: address,
                    value: count,
                }));
                setOrderCountData(data);
                console.log(orderCountData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ResponsiveBar
            data={orderCountData}
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
            keys={["EUSOFF_HALL",
                "UTOWN_RESIDENCES",
                "TEMBUSU_COLLEGE",
                "RESIDENTIAL_COLLEGE_FOUR",
                "PRINCE_GEORGE_PARK_RESIDENCE",
                "RIDGE_VIEW_RESIDENTIAL_COLLEGE",
                "RAFFLES_HALL",
                "TEMASEK_HALL",
                "KENT_RIDGE_HALL",
                "SHEARES_HALL",
                "KING_EDWARD_VII_HALL",
                "KENT_VALE",
                "UNIVERSITY_HALL"]}
            indexBy="address"
            margin={{ top: 0, right: 100, bottom: 50, left: 45 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
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
                legend: isDashboard ? undefined : "Num of Orders", // changed
                legendPosition: "middle",
                legendOffset: -40,
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
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            barAriaLabel={function (e) {
                return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
            }}
        />
    );
};

export default MonthlyOrderLineChart;