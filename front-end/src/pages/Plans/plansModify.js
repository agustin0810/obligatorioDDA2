import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import '../../styles/general.css';
import '../../styles/forms.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const PlansModify = () =>{
    const [destiny, setDestiny] = useState(null);
    const [date, setDate] = useState(Date.now);
    const [modality, setModality] = useState(null);
    const [cost, setCost] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [errorT, setErrorT] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [plan, setPlan] = useState(null);

    const { id } = useParams()
    useEffect(() => {
        fetch('http://localhost:8080/plans/'+id)
        .then(data => data.json())
        .then(plan => {
            console.log(plan)
            setPlan(plan)
            setCost(plan.cost)
            setDestiny(plan.destiny)
            setModality(plan.modality)
            setDate(plan.date)
        })
        .catch(error => setErrorT(error))
    }, [])
    
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
        else if(!String(cost).match(/^\d+$/)){
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
                fetch('http://localhost:8080/plans/modify', {
                  method: 'POST',
                  body: JSON.stringify({"id": id,"destiny": destiny, "date": date, "modality": modality, "cost": cost, "pictures": pictures}),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => response.status==200?setAlerta(true): null)
                .catch(error => setErrorT(error))
        }
    }
    return(
        <div className="App">
            <h1> Modificación de planes </h1>
            <div className="formContainer" >
            {plan!=null ? 
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
                value={destiny}
                onChange={(e)=>setDestiny(e.target.value)}
                />
                <TextField
                required
                id="modality"
                label="Modalidad"
                style={{width: '40vmin'}}
                value={modality}
                onChange={(e)=>setModality(e.target.value)}
                />
                <TextField
                required
                id="cost"
                label="Costo"
                style={{width: '40vmin'}}
                value={cost}
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
                <Button variant="outlined" color="success" className="addBtn" style={{top: '5vmin'}} onClick={handleSubmit}>Modificar</Button>            

            </div>
            {/*Manejo de errores FRONT-END*/}
            {console.log(pictures)}
            {errorT!="" ? <Alert severity="error" className="alert">{"Error: " +errorT}</Alert>: ""}
            {alerta!=false ? <Alert severity="success" className="alert">{"Modificación realizada con éxito"}</Alert>: ""}
            </Box>
            : <h1>No se encontró el plan</h1>}

            </div>
        </div>
    )
}