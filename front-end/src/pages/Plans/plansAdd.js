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
import FileBase64 from 'react-file-base64';



export const PlansAdd = () =>{
    const [destiny, setDestiny] = useState(null);
    const [date, setDate] = useState(Date.now);
    const [modality, setModality] = useState(null);
    const [cost, setCost] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [errorT, setErrorT] = useState("");
    const [alerta, setAlerta] = useState(false);

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
            setErrorT("Ingrese destino válido (no más de 20 dígitos)")
            return false
        }
        else if(date<Date.now){
            setErrorT("Ingrese una fecha mayor o igual a hoy")
            return false
        }
        else if(!cost.match(/^\d+$/)){
            setErrorT("El costo debe ser un valor entero")
            return false
        }
        else if(modality!="AEREA" && modality!="MARITIMA" && modality!="TERRESTRE"){
            console.log("entro")
            setErrorT("La modalidad debe ser aérea, marítima o terrestre")
            return false
        }

        return true;
    }
    function handleSubmit(){
        if(checkFields()){
            console.log(pictures)
                fetch('http://localhost:8080/plans/add', {
                  method: 'POST',
                  body: JSON.stringify({destiny: destiny, date: date, modality: modality, cost: cost}),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => response.json())
                .then(plan=>uploadImages(plan.id))
                //.then(plan => plan!=null ?uploadImages(plan.id): setErrorT("No se pudo realizar el alta"))
                .catch(error => setErrorT(error))

        }
    }
    function uploadImages(planId){
        for(var i =0; i<pictures.length; i++){

            console.log(pictures[i].base64)
            fetch('http://localhost:8080/images/add?planId='+planId, {
              method: 'POST',
              body: JSON.stringify({imageData: pictures[i].base64}),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(response => response.status==200?setAlerta(true): null)
            .catch(error => setErrorT(error))
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
                    value={date}
                    onChange={(newValue) => {
                    setDate(newValue);
                    }}
                    renderInput={(params) => <TextField 
                        style={{width: '40vmin'}} {...params} />}
                />
                </LocalizationProvider>
            </div>
            <div>
                <FileBase64
                multiple={ true }
                hidden
                id="inputFile"
                onDone={ setPictures.bind(this) } />
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