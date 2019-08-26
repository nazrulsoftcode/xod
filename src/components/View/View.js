import React, {useState} from 'react';

import Table from '../Table/Table';

function createTable1Data(id, val, name, delta, tpl) {
    return { id, val, name, delta, tpl };
}

const headRows1 = [
    { id: 'id', numeric: true, disablePadding: false, label: 'Tagnr', width: 40 },
    { id: 'val', numeric: true, disablePadding: false, label: 'Ann' },
    { id: 'name', numeric: true, disablePadding: false, label: 'Lift' },
    { id: 'delta', numeric: true, disablePadding: false, label: 'Ave' },
    { id: 'tpl', numeric: true, disablePadding: false, label: 'Tpl' },
];
const rows1 = [
    createTable1Data(23, 303, 'RC', 67, 4.3),
    createTable1Data(61, 75, 'X11', -34, 43),
    createTable1Data(14, 123, 'X55', -72, 72),
    createTable1Data(322, 64, 'X52', 24, 4.0),
    createTable1Data(63, 54, 'X40', -12, 65),
    createTable1Data(22, 305, 'RC', -23, 56),
    createTable1Data(342, 452, 'X2', 51, 4.9),
];

const headRow3 = [
    { id: 'id', numeric: true, disablePadding: false, label: 'Tagnr', width: 40 },
    { id: 'val', numeric: true, disablePadding: false, label: 'Stracka' },
    { id: 'name', numeric: true, disablePadding: false, label: 'Lift' },
    { id: 'bef', numeric: true, disablePadding: false, label: 'Bef' },
    { id: 'tel', numeric: true, disablePadding: false, label: 'tel' },
];
function createTable1Data3(id, val, name, bef, tel) {
    return { id, val, name, bef, tel };
}

const row3 = [
    createTable1Data3(1, "KV-Kmb", "Roger Selberg", "Lokf", "91232"),
    createTable1Data3(2, "KV-Kmb", "Rosgs fserg", "Lokf", "34342"),
    createTable1Data3(3, "Bif-Kmb", "Rogte saqdfw", "Lokf", "423"),
    createTable1Data3(4, "Bif-Kmb", "Rsdty jhdfdg", "Lokf", "653412"),
    createTable1Data3(5, "Bif-Kmb", "Hdfgf Selberg", "Lokf", "75322"),
    createTable1Data3(6, "Cst-Ga", "Yfdfg berg", "Lokf", "23225`"),
    createTable1Data3(7, "Cst-Ga", "Tdfgfg lberg", "Lokf", "55345"),
    createTable1Data3(8, "Cst-Ga", "Roge Selberg", "Lokf", "74345"),
    createTable1Data3(9, "Ua-bdn", "Gwerg berg", "Lokf", "1432"),
    createTable1Data3(10, "Ua-bdn", "Tsfd lberg", "Lokf", "14434"),
    createTable1Data3(11, "Ua-bdn", "Esdsd berg", "Lokf", "4563"),
    createTable1Data3(12, "Ua-bdn", "Bdfgdg lberg", "Lokf", "34234")
]
function View(props) {
    const [show3, setShow3] = useState(false);
    const [filterItem, setFilter] = useState([]);
    const [rows, setRows] = useState(rows1);
    const [delta, setDelta] = useState(1);
    const [rows3, setRows3] = useState([]);

    function showTable3(value){
        let new_rows = [];
        if (show3) {
            setShow3(false)
        }
        row3.map(row => {
            new_rows.push(createTable1Data3(row.id + value.id, value.name.slice(0,2) + row.val, row.name + value.name.slice(0,2), row.bef + value.name.slice(0,2), '0' + value.id.toString() + row.tel))
        });
        setRows3(new_rows);
        setShow3(true);
    }

    function filter() {
        if (filterItem.length > 0)
        {
            let filteredRows = [];
            rows1.map((row, index) => {
                if (filterItem.indexOf(row.name) >= 0 && row.delta* delta > 0) {
                    filteredRows.push(row)
                }
            });
            setRows(filteredRows);
        } else {
            setRows(rows1);
        }
    }
    function hideTable3() {
        setShow3(false);
    }
    function resetDelta(value) {
        setDelta(value);
    }
    function setFilterItem(items) {
        setFilter(items);
    }


    return (
        <div className="content-area">
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Table title={"Info"} onClickShow={showTable3} rows={rows} headRows={headRows1} filterItem={filterItem}/>
            </div>
        </div>
    )
}
export default View;
