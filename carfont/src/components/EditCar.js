import React, { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car,setCar] = useState({
        brand: "",
        model: "",
        color: "",
        years: "",
        price: "",

    });

    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            years: props.data.row.years,
            price: props.data.row.price,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => { 
        props.updateCar(car, props.data.id);
        handleClose();
    };

    const handleChange = (e) => {
        setCar({...car,[e.target.name]: e.target.value});
    };
    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color='primary' />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nouvelle Voiture</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField variant="standard" autoFocus label="Marque" name="brand" value={car.brand} onChange={handleChange} />
                        <br />
                        <TextField variant="standard" autoFocus label="Modèle" name="model" value={car.model} onChange={handleChange} />
                        <br />
                        <TextField variant="standard" autoFocus label="Couleur" name="color" value={car.color} onChange={handleChange} />
                        <br />
                        <TextField variant="standard" autoFocus label="Année" name="years" value={car.years} onChange={handleChange} />
                        <br />
                        <TextField variant="standard" autoFocus label="Prix" name="price" value={car.price} onChange={handleChange} />
                        <br />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Annuler</Button>
                    <Button variant="contained" onClick={handleSave}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCar;