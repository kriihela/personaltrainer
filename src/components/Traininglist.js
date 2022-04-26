import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import dayjs from "dayjs";

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    };
    const columns = [
        { field: "date", headerName: "DATE", cellRenderer: params => { return dayjs(params.value).format('DD.MM.YYYY HH:mm')} },
        { field: "duration", headerName: "DURATION", width: 130 },
        { field: "activity", headerName: "ACTIVITY" },
        { field: "customer.firstname", headerName: "FIRST NAME" },
        { field: "customer.lastname", headerName: "LAST NAME" }
    ];
    const defaultColDef = useMemo( () => ({
        sortable: true,
        filter: true,
        width: 170
    }), []);

    return (
        <div className="ag-theme-material" style={{ height: '500px', margin: 'auto', textAlign: 'left' }} >
            <AgGridReact
                pagination="true"
                paginationPageSize={10}
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                defaultColDef={defaultColDef}
                //rowSelection="single"
                animateRows={true}
                columnDefs={columns}
                rowData={trainings} />
        </div>
    );
}