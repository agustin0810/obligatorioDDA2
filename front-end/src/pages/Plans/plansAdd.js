import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import '../../styles/general.css';
import '../../styles/forms.css';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const PlansAdd = () =>{
    const [destiny, setDestiny] = useState(null);
    const [date, setDate] = useState(Date.now);
    const [modality, setModality] = useState(null);
    const [cost, setCost] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [errorT, setErrorT] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [value, setValue] = React.useState(null);

    function selectImgs(){
        const fileInput = document.querySelector('#inputFile');
        pictures.splice(0, pictures.length)
        for(var i =0; i<fileInput.files.length; i++){
            if(fileInput.files[i].type=="image/jpeg" || fileInput.files[i].type=="image/png"){
                
                pictures.push(fileInput.files[i])
                setPictures(pictures)
                console.log(pictures)
            }
            else{
                setErrorT("La imágen debe tener formato png o jpeg")
            }
        }
    }
    function checkFields(){

        //Errores de filling
        if(destiny==null || date==null || modality==null || cost==null){

            var error = "falta ";
            if(destiny == null){
                error = error + " destino "
            }
            if(date == null){
                error = error + " fecha "
            }
            if(modality == null){
                error = error + " modalidad "
            }
            if(cost == null){
                error = error + " precio "
            }
            
            setErrorT(error)
            return false;
        }
        else if((destiny.length>20)){
            setErrorT("Error: ingrese destino válido (no más de 20 dígitos)")
            return false
        }
        else if(date<Date.now){
            setErrorT("Error: Ingrese una fecha mayor o igual a hoy")
            return false
        }
        else if(!cost.match(/^\d+$/)){
            setErrorT("Error: el costo debe ser un valor entero")
            return false
        }

        return true;
    }
    function handleSubmit(){
        if(checkFields()){
            const apiCall = async () => {
                    const response = await fetch('http://localhost:5000/plans/add', {
                  method: 'POST',
                  body: {"destiny": destiny, "date": date, "modality": modality, "cost": cost, "pictures": pictures},
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => response.json())
                .then(plan => plan!=null ?uploadImages(plan.id): setErrorT("No se pudo realizar el alta"))


            }
        }
    }
    function uploadImages(planId){
        const formData = new FormData();
        formData.append("planId", planId)
        for(var i =0; i<pictures.length; i++){
            formData.append("file"+i, pictures[i])
        }
        const uploadCall = async () => {
            const response = await fetch('http://localhost:5000/images/add', {
          method: 'POST',
          body: {formData}
        }).then(response => response.status==200?setAlerta(true): null)
        }
    }
    return(
        <div className="App">
            <h1> Alta de planes </h1>
            <div className="formContainer" >
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 4, width: '33ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                id="destiny"
                label="Destino"
                style={{width: '40vmin'}}
                onChange={(e)=>setDestiny(e.target.value)}
                />
                <TextField
                required
                id="modality"
                label="Modalidad"
                style={{width: '40vmin'}}
                onChange={(e)=>setModality(e.target.value)}
                />
                <TextField
                required
                id="cost"
                label="Costo"
                style={{width: '40vmin'}}
                onChange={(e)=>setCost(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="Fecha del viaje"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField 
                        style={{width: '40vmin'}} {...params} />}
                />
                </LocalizationProvider>
            </div>
            <div>
                <Button
                    variant="contained"
                    component="label"
                    >
                    Subir fotos
                    <input
                        id="inputFile"
                        type="file"
                        hidden
                        multiple
                        onChange={selectImgs}
                    />
                </Button>
            </div>
            <div>
                <Button variant="outlined" color="success" className="addBtn" style={{top: '5vmin'}} onClick={handleSubmit}>Agregar</Button>            

            </div>
            {/*Manejo de errores FRONT-END*/}
            {console.log(pictures)}
            {errorT!="" ? <Alert severity="error" className="alert">{"Error: " +errorT}</Alert>: ""}
            {alerta!=false ? <Alert severity="success" className="alert">{"Alta realizada con éxito"}</Alert>: ""}
            </Box>

            </div>
        </div>
    )
}