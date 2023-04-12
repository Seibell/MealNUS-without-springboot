import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "./AdminTheme";
import { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment-timezone";
import { scaleLinear } from "d3";

const MonthlyOrderLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orderCountData, setOrderCountData] = useState([]);

    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10);
        Axios.get(`http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderCounts/${currentDate}`)
            .then(response => {
                console.log(response.data);
                const data = [{
                    id: "Order Count",
                    data: response.data.map(item => ({
                        x: moment.utc(item.key, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Singapore').format('YYYY-MM'),
                        y: item.value
                    }))
                }];
                console.log(data);
                setOrderCountData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const yMax = Math.max(...orderCountData.map(d => d.value));
    const yScale = scaleLinear().domain([0, yMax]).nice();
    const tickValues = yScale.ticks(10);

    return (
        <ResponsiveLine
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
                tooltip: {
                    container: {
                        color: colors.primary[500],
                    },
                },
            }}
            colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
            margin={{ top: 40, right: 140, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
            }}
            yFormat="d"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: {tickValues},
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Orders Per Month",
                legendOffset: -40,
                legendPosition: "middle",
            }}
            yAxisTickCount={undefined}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor="#FFA500"
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 100,
                    itemHeight: 380,
                    itemOpacity: 0.7,
                    symbolSize: 6,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    data: [
                        {
                            id: "Monthly Order Count",
                            label: "Num of Orders/Month",
                            color: "#FFA500"
                        }
                    ],
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default MonthlyOrderLineChart;