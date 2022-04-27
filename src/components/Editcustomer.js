import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from "@mui/material";

export default function Editcustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(
        {
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        }
    );
    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name] : e.target.value });
    };
    const editCustomer = () => {
        props.editCustomer(props.link, customer);
        handleClose();
    };

    return (
        <div>
        <Tooltip title="Edit customer" placement="top">
        <Button variant="outlined" onClick={handleClickOpen}>
            <EditIcon />
        </Button>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={e => handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={e => handleInputChange(e)}
                    label="Address"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={e => handleInputChange(e)}
                    label="Postcode"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={e => handleInputChange(e)}
                    label="City"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={e => handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={e => handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={editCustomer}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
    )

}