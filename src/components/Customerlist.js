import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    };
    const columns = [
        { field: "firstname", headerName: "FIRST NAME", },
        { field: "lastname", headerName: "LAST NAME" },
        { field: "streetaddress", headerName: "ADDRESS" },
        { field: "postcode", headerName: "ZIP", width: 120 },
        { field: "city", headerName: "CITY" },
        { field: "email", headerName: "EMAIL" },
        { field: "phone", headerName: "PHONE" }
    ];
    const defaultColDef = useMemo( () => ({
        sortable: true,
        filter: true,
        width: 170
    }), []);

    return (
        <div className="ag-theme-material" style={{ width: '100', height: '500px', margin: 'auto', textAlign: 'left', }} >
            <AgGridReact
                pagination="true"
                paginationPageSize={10}
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                defaultColDef={defaultColDef}
                //rowSelection="single"
                animateRows={true}
                columnDefs={columns}
                rowData={customers} />
        </div>
    );

}