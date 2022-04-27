import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Tooltip } from "@mui/material";

export default function Addtraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState(
        {
            date: '',
            duration: '',
            activity: '',
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

    return (
        <div>
            <Tooltip title="Add workout" placement="top">
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                <AddTaskIcon />
            </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        label="DATE"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="DURATION"
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