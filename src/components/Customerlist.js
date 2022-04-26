import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";

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
        { field: "phone", headerName: "PHONE" },
        {
            field: "links.0.href", headerName: "", width: 100,
            cellRendererFramework: params =>
            <Editcustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
        },
        {
            field: "links.0.href", headerName: "", width: 100,
            cellRendererFramework: params =>
            <Button variant="outlined" color="error" onClick={() => deleteCustomer(params.value)}><DeleteIcon /></Button>
        }
    ];
    const defaultColDef = useMemo( () => ({
        sortable: true,
        filter: true,
        width: 170
    }), []);

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchCustomers())
                .catch(err => console.log(err))
        }
    }
    const editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
    };

    return (
        <div className="ag-theme-material" style={{ width: '100', height: '500px', margin: 'auto', textAlign: 'left', }} >
            <p><Addcustomer saveCustomer={saveCustomer} /></p>
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