// Admin Dashboard Template Imports
import { useEffect, useState } from "react";

import { LinearProgress, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box, useTheme } from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../Global/AdminTheme";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    red: {
        backgroundColor: 'red',
    },
    orange: {
        backgroundColor: 'orange',
    },
    green: {
        backgroundColor: 'green',
    },
});

function createData(rank, key, value, quantityAvailable, allMealBoxes) {
    const stock = quantityAvailable;
    const maxStock = value + stock;
    const fraction = stock / maxStock;
    return { rank, key, value, fraction, stock, maxStock };
}


const TopSellingMealboxes = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [topSellingRows, setTopSellingRows] = useState([]);
    const [allMealBoxRows, setAllMealBoxRows] = useState([]);

    const classes = useStyles();

    const colorClass = (value) => {
        if (value <= 25) {
            return classes.red;
        } else if (value > 25 && value <= 75) {
            return classes.orange;
        } else {
            return classes.green;
        }
    };

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8080/MealNUS-war/rest/orders/topSellingMealBoxes')
                .then(response => response.json()),
            fetch('http://localhost:8080/MealNUS-war/rest/Mealbox/retrieveAllMealBoxesWithQty')
                .then(response => response.json())
        ]).then(data => {
            const topSellingMealBoxes = data[0];
            console.log(data[0]);
            const allMealBoxes = data[1];
            console.log(data[1]);
            const topSellingRows = topSellingMealBoxes.map((pair, index) => {
                const { key, value } = pair;
                const mealBox = allMealBoxes.find(mealBox => mealBox.key === key);
                if (mealBox) {
                    return createData(index + 1, key, pair.value, mealBox.value, allMealBoxes);
                } else {
                    return createData(index + 1, key, value, 6, allMealBoxes);
                }
            });
            const allMealBoxRows = topSellingMealBoxes.map((mealBox, index) => {
                const { key, value } = mealBox;
                const topSellingMealBox = topSellingMealBoxes.find(pair => pair.key === key);
                if (topSellingMealBox) {
                    return createData(index + 1 + topSellingMealBoxes.length, key, topSellingMealBox.value, mealBox.value);
                }
                else {
                    return createData(index + 1 + topSellingMealBoxes.length, key, 0, value, allMealBoxes);
                }
            });
            setTopSellingRows(topSellingRows);
            setAllMealBoxRows(allMealBoxRows);
        });
    }, []);

    const rows = [
        ...topSellingRows,
        ...allMealBoxRows.filter(
            (mealBoxRow) =>
                !topSellingRows.find((topSellingRow) => topSellingRow.key === mealBoxRow.key)
        ),
    ];

    const columns = [
        {
            field: "rank",
            headerName: "Rank",
            flex: 1,
            headerClassName: "headerName",
        },
        {
            field: "key",
            headerName: "MealBox",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: "headerName",
        },
        {
            field: "value",
            headerName: "Sold Quantity",
            flex: 1,
            headerClassName: "headerName",
        },
        {
            field: "stock",
            headerName: "Available Quantity",
            flex: 1,
            headerClassName: "headerName",
        },
        {
            headerName: "Stock Level",
            field: "fraction",
            flex: 1,
            headerClassName: "headerName",
            renderCell: (params) => (
                <TableCell>
                    <Box display="flex" alignItems="center">
                        <Box minWidth={120} ml={-2} mb={2} mt={2}>
                            <LinearProgress
                                variant="determinate"
                                value={params.value * 100}
                                classes={{ bar: colorClass(params.value * 100) }}
                            />
                        </Box>
                    </Box>
                </TableCell>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                height="40vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.mealNUSBlue[100],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.mealNUSBlue[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.white[100],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.mealNUSOrange[100],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .headerName": {
                        color: colors.white[100],
                    },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.rank}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default TopSellingMealboxes;