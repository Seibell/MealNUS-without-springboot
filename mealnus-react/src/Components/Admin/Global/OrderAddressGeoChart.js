import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "./AdminTheme";
import Axios from "axios";


const OrderAddressGeoChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [locations, setLocations] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderLocations')
            .then((response) => {
                const heatmapData = Object.keys(response.data).map((key) => {
                    const [lat, lng] = response.data[key];
                    return [lat, lng];
                });
                setLocations(heatmapData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    // return (
    //     // <MapContainer center={[1.2966, 103.7764]} zoom={16}>
    //     //     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //     //     <HeatmapLayer
    //     //         points={locations}
    //     //         longitudeExtractor={(location) => location[1]}
    //     //         latitudeExtractor={(location) => location[0]}
    //     //         intensityExtractor={() => 1}
    //     //     />
    //     // </MapContainer>
    // );
};

export default OrderAddressGeoChart;