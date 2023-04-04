import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AdminTitle from './AdminTitle';

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

function createData(key, value, quantityAvailable, allMealBoxes) {
    const stock = quantityAvailable;
    const maxStock = value + stock;
    const fraction = stock / maxStock;
    return { key, value, fraction, stock, maxStock };
}


function AdminDashboardTopSelling() {
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
            const allMealBoxes = data[1];
            const topSellingRows = topSellingMealBoxes.map((pair) => {
                const { key, value } = pair;
                const mealBox = allMealBoxes.find(mealBox => mealBox.key === key);
                if (mealBox) {
                    return createData(key, pair.value, mealBox.value, allMealBoxes);
                } else {
                    return createData(key, value, 6, allMealBoxes);
                }
            });
            setTopSellingRows(topSellingRows);

            const allMealBoxRows = allMealBoxes.map((mealBox) => {
                const { key, value } = mealBox;
                const topSellingMealBox = topSellingMealBoxes.find(pair => pair.key === key);
                if (topSellingMealBox) {
                    return createData(key, topSellingMealBox.value, mealBox.value, allMealBoxes);
                } else {
                    return createData(key, 0, value, allMealBoxes);
                }
            });
            setAllMealBoxRows(allMealBoxRows);
        });
    }, []);

    const rows = [...topSellingRows, ...allMealBoxRows];

    return (
        <React.Fragment>
            <AdminTitle>Top Selling MealBoxes</AdminTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>MealBox</TableCell>
                        <TableCell><b>Sold Quantity</b></TableCell>
                        <TableCell>Available Quantity</TableCell>
                        <TableCell>Stock Level</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.key}>
                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                            <TableCell component="th" scope="row">{row.key}</TableCell>
                            <TableCell>{row.value}</TableCell>
                            <TableCell>{row.stock}</TableCell>
                            <TableCell style={{ textAlign: 'right' }}>
                                <LinearProgress variant="determinate" value={row.fraction * 100} classes={{ bar: colorClass(row.fraction * 100) }} />
                                {/* {`${(row.maxStock)}`} */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default AdminDashboardTopSelling;