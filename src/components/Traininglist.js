import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from "@mui/material";

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
    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE' })
                .then(res => fetchTrainings())
                .catch(err => console.log(err))
        }
    }
    const columns = [
        { field: "date", headerName: "DATE", cellRenderer: params => { return dayjs(params.value).format('DD.MM.YYYY HH:mm')} },
        { field: "duration", headerName: "DURATION", width: 130 },
        { field: "activity", headerName: "ACTIVITY" },
        { field: "customer.firstname", headerName: "FIRST NAME" },
        { field: "customer.lastname", headerName: "LAST NAME" },
        {
            field: "id", headerName: "", width: 100,
            cellRendererFramework: params =>
            <Tooltip title="Delete workout" placement="top">
            <Button variant="outlined" color="error" onClick={() => deleteTraining(params.value)}><DeleteIcon />
            </Button>
            </Tooltip>
        }
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