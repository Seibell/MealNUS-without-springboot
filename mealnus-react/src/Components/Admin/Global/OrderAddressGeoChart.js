import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { tokens } from "./AdminTheme";
import L from "leaflet";
import "leaflet.heat";

const OrderAddressGeoChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:8080/MealNUS-war/rest/orders/retrieveAllOrderLocations"
            );
            const data = await response.json();
            setLocations(data);
            console.log(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const mapContainer = document.getElementById('map-container');
        const map = L.map(mapContainer, {
            center: [1.297542, 103.774430],
            zoom: 18,
            maxBounds: [
                [1.290467, 103.767334],
                [1.307146, 103.780196]
            ],
            dragging: true, // enable dragging
            zoomControl: false, // disable zoom control
        });

        const tiles = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
            }
        );
        tiles.addTo(map);

        const heat = L.heatLayer(locations, { radius: 50 });
        heat.addTo(map);

        return () => {
            map.remove();
        };
    }, [locations]);

    return (
        <div id="map-container" style={{ width: "100%", height: "500px" }}>
            <div id="map" style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default OrderAddressGeoChart;