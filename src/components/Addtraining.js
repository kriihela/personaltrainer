import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Tooltip } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import Stack from '@mui/material/Stack';

export default function Addtraining(props) {

    const [open, setOpen] = useState(false);
    const [chooseDate, setChooseDate] = useState(new Date(''));
    const [training, setTraining] = useState(
        {
            date: '',
            duration: '',
            activity: '',
            customer: props.customerId
        }
    );
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    };
    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    };
    const handleDate = (chooseDate) => {
        setChooseDate(chooseDate.toISOString());
        setTraining({...training, date: chooseDate});
    };

    return (
        <div>
            <Tooltip title="Add workout" placement="top">
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                <AddTaskIcon />
            </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <br />
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                    <DesktopDatePicker
                        type="date"
                        margin="dense"
                        name="date"
                        value={chooseDate}
                        onChange={handleDate}
                        label="DATE"
                        //inputFormat="dd/MM/yyyy"
                        fullWidth
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="DURATION (MINUTES)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="ACTIVITY"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}