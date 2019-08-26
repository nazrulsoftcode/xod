import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';


import EnhancedTableToolbar from './TableTitle/TableTitle'
import EnhancedTableHeader from './TableHeader/TableHeader'

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: 10
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 'unset',
        fontSize: '10'
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableCell: {
        fontSize: 10,
        padding: 10,
    },
    tHeader: {
        background: 'gray'
    }
}));

export default function CustomTable(props) {
    const {onClickShow, rows, headRows, title, showExit, hideTable} = props;

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);


    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
        setDense(false);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar title={title} showExit={showExit} closeTable={hideTable}/>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHeader
                            classes={classes}
                            headRows={headRows}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={0}
                        />
                        <TableBody>
                            {(rows && rows.length > 0) ?
                                stableSort(rows, getSorting(order, orderBy))
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                { (headRows && headRows.length > 0) ?
                                                    (
                                                    headRows.map((headerRow, key) => {
                                                        if (headerRow.id === "id") {
                                                            return (
                                                                <TableCell key={key} onClick={() => onClickShow(row)} className={classes.tableCell} component="th"  align="right" id={labelId} scope="row">
                                                                    {row.id}
                                                                </TableCell>
                                                            )
                                                        }
                                                        return (<TableCell  key={key} className={classes.tableCell} align="right">{row[headerRow.id]}</TableCell>)
                                                    })
                                                    )
                                                    : null
                                                }
                                            </TableRow>
                                        );
                                    }): null
                            }
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}
