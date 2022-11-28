import * as React from 'react';
import '../../styles/forms.css'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import '../../styles/general.css';
import '../../styles/forms.css';

export const CompraViaje = () =>{
    const [clientes, setClientes] = React.useState([]);
    const [planes, setPlanes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    const [alerta, setAlerta] = React.useState(false);
    
    const [selectedClientCI, setSelectedClientCI] = React.useState(null);
    const [selectedPlanID, setSelectedPlanID] = React.useState(null);
    const [finalCost, setFinalCost] = React.useState(null); 
    
    function getFinalCost(){
        if(selectedPlanID!=null && selectedClientCI!=null){
            
        const apiCall = async () => {
            const response = await fetch('http://localhost:8080/clients/getFinalCost', {
          method: 'POST',
          body: {"ci": selectedClientCI, "planId": selectedPlanID},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
        .then(plan => plan!=null? setFinalCost(plan.cost): setErrorT("No se encontró el costo"))
        .catch(error => setErrorT(error))
        
        }
    }
    }
    function listClients(){
        fetch('localhost:8080/clients')
        .then(data => {
            return data.json();
        })
        .then(client => {
            clientes.push(client)
        })
        .catch(error => setErrorT(error))
    }
    function listPlans(){
        fetch('localhost:8080/plans')
        .then(data => {
            return data.json();
        })
        .then(plan => {
            planes.push(plan)
        })
        .catch(error => setErrorT(error))
    }

    React.useEffect(() => {
      listClients()
      listPlans()
      getFinalCost();
    }, [])

    function checkFields(){
        if(selectedClientCI!=null && selectedPlanID!=null){
            return true;
        }
        return false;
    }
    function handleSubmit(){
        if(checkFields()){
            const apiCall = async () => {
                    const response = await fetch('http://localhost:8080/purchase/add', {
                  method: 'POST',
                  body: {"ci": selectedClientCI, "planID": selectedPlanID, "cost": finalCost},
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => response.status==200?setAlerta(true): null)
                .catch(error => setErrorT(error))
            }
        }
    }

    return(
    <div className="App">
        
      <h1>Compra de viaje</h1>
      <div className="formContainer" >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label" style={{position: 'relative', margin: "auto"}}>Cliente</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={""}
            onChange={(e) =>setSelectedClientCI(e.target.value)}
            label="Cliente"
            style={{position: 'relative', margin: "auto", width: "40vmin", backgroundColor: 'lightgray'}}
            >
                                    
            {clientes.map((aClient, i) => { 
                return(
                    <MenuItem value={aClient.ci}>
                    <em>{aClient.ci + ", " +aClient.name + " " +aClient.lastname}</em>
                    </MenuItem>

                )
            })}
            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label" style={{position: 'relative', margin: "auto"}}>Plan de viaje</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={""}
            onChange={(e) =>setSelectedPlanID(e.target.index)}
            label="Plan de viaje"
            style={{position: 'relative', margin: "auto", width: "40vmin", backgroundColor: 'lightgray'}}
            >
            {planes.map((aPlan, i) => { 
                return(
                    <MenuItem value={aPlan.id}>
                    <em>{aPlan.id + ", " +aPlan.destiny + " " +aPlan.date}</em>
                    </MenuItem>

                )
            })}
            </Select>
        </FormControl>
        <h1>{finalCost}</h1>
        <div>
            <Button variant="outlined" color="success" className="addBtn" style={{top: '5vmin'}} onClick={handleSubmit}>Agregar</Button>            

        </div>
        {errorT!="" ? <Alert severity="error" className="alert">{"Error: " +errorT}</Alert>: ""}
        {alerta!=false ? <Alert severity="success" className="alert">{"Compra realizada con éxito"}</Alert>: ""}

      </div>

    </div>
    )
}
