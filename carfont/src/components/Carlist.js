import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AppBar from "@mui/material/AppBar";
import ToolBar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import  Stack  from '@mui/material/Stack';
import AddCar from './AddCar';
import EditCar from './EditCar';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Owner from './Owner';


function Carlist() {
    const [cars, setCars] = useState([]);
    const [owner, setOwner] = useState([]);
    const [links, setLinks] = useState(false);
    const columns = [
        { field: 'brand', headerName: 'Marque', width: 180 },
        { field: 'model', headerName: 'Modèle', width: 180 },
        { field: 'color', headerName: 'Couleur', width: 180 },
        { field: 'years', headerName: 'Année', width: 120 },
        { field: 'price', headerName: 'Prix', width: 120 },
        {
            field: "_links.owner.href",
            headerName: "Propriétaire",
            sortable:false,
            filterable: false,
            renderCell: row => (
                <Button  onClick={() => oneOwnerClick(row.id)} >
                    <Avatar />
                </Button>
            ),
          },
        {
          field: "_links.car.href",
          headerName: "",
          sortable: false,
          filterable: false,
          renderCell: row => <EditCar data={row} updateCar={updateCar} />
        },
        {
          field: "_links.self.href",
          headerName: "",
          sortable:false,
          filterable: false,
          renderCell: row => (
            <Button  color='error' onClick={() => oneDelClick(row.id)} >
                <DeleteIcon color='error'/>
            </Button>
          ),
        },
    ];
    
    const [open, setOpen] = useState(false);
    const [openO, setOpenO] = useState(false);
    useEffect(()=>{
        fetchCars();
    },[]);

    const fetchCars = () => {
        fetch(SERVER_URL+"api/cars")
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err));
    };
    

    const addCar = car => {
        fetch(SERVER_URL + "api/cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car),
        })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                } else{
                    alert("Un problème est survenu lors de la creation! Reéssayer :(");
                }
            })
    };

    const updateCar = (car, link) => {
        fetch(link, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(car),
        })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                } else {
                    alert("Un problème est survenu lors de la modification! Reéssayer :(")
                }
            })
            .catch(err => console.error(err));
    };

    const oneDelClick = url => {
        if (window.confirm("Etes vous sur de vouloir supprimer la voiture? :(")) {
            fetch(url, { method: "DELETE" })
            .then(response => {
                if (response.ok){
                    fetchCars(url);
                    setOpen(true);
                } else{
                    alert("Un problème est survenu lors de la suppression! Reéssayer :(");
                }
            })
            .catch(err => console.error(err)); 
        }
    };

    const oneOwnerClick = ownerLink => {
        fetch(ownerLink+"/owner")
            .then(response => response.json())
            .then(ownerData => {
                console.log(ownerData);
                setOwner(ownerData);
                setOpenO(true);
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <AppBar position="static">
                <ToolBar>
                    <Typography variant="h4">Carshop</Typography>
                </ToolBar>
            </AppBar>
            <div style={{ height: 500, 
                width: '100%', 
                background: "rgb(241, 232, 196)", 
                textAlign: "right", }}>
                <Stack mr={20} mt={1}>
                    <AddCar addCar={addCar} />
                </Stack>
                <DataGrid
                rows={cars}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href}
                sx={detailStyle}
                />
                <Snackbar 
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Voiture supprimée"
                />  
                <Owner firstname={owner.firstname} lastname={owner.lastname} open={openO} handleClose={()=>{setOpenO(false)}}/>
            </div>
            <h1></h1>
        </div>
    );
}

const detailStyle = {
    background: "rgb(241, 232, 196)",
}


export default Carlist;