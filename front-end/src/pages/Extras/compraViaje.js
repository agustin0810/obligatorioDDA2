import * as React from 'react';
import '../../styles/forms.css'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import '../../styles/general.css';
import '../../styles/forms.css';

export const CompraViaje = () =>{
    const [clientes, setClientes] = React.useState([]);
    const [planes, setPlanes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    const [alerta, setAlerta] = React.useState(false);
    const [alerta2, setAlerta2] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState(null);
    const [selectedPlan, setSelectedPlan] = React.useState(null);
    const [finalCost, setFinalCost] = React.useState(null); 
    const [compras, setCompras] = React.useState(null);
    const [comprasCI, setComprasCI] = React.useState([]);
    
    function deleteCompra(compraId) {
      fetch('http://localhost:8080/compras/delete?compraId='+compraId, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json', 
        },
      }).then(response =>{
          if(response.status==200){
              setAlerta2(true)
              getComprasCI()
          }
      })
      .catch(error => setErrorT(error))
  }
    function getComprasCI(){
      if(selectedClient!=null){
        fetch('http://localhost:8080/compras/getComprasCI?ci='+selectedClient.split(",")[0])
      .then(data => data.json())
      .then(compras => {
        setComprasCI(compras)
      })
      .catch(error => setErrorT(error))
      }
    }
    function cantComprasCI(){
        if(selectedPlan!=null && selectedClient!=null){
             
          fetch('http://localhost:8080/compras/cantComprasCI?ci='+selectedClient.split(",")[0])
          .then(data => data.json())
          .then(compras => {
            setCompras(compras)
            getFinalCost(compras);
          })
          .catch(error => setErrorT(error))
          
          }
    }
    function getFinalCost(compras){
        if(selectedPlan!=null && selectedClient!=null && compras!=null){
            
          fetch('http://localhost:8080/clients/getFinalCost?ci='+selectedClient.split(",")[0]+'&costoActual='+selectedPlan.split(",")[3], {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
        .then(cost => setFinalCost(cost))
        .catch(error => setErrorT(error))
        
        }
    }
    function listClients(){
        fetch('http://localhost:8080/clients')
        .then(response => response.json())
        .then(data => setClientes(data))
        .catch(error => setErrorT(error))
    
    }
    function listPlans(){
        fetch('http://localhost:8080/plans')
        .then(response => response.json())
        .then(data => setPlanes(data))
        .catch(error => setErrorT(error))
    }

    React.useEffect(() => {
        
      listClients()
      listPlans()
      cantComprasCI();
      getComprasCI()
    }, [selectedClient, selectedPlan, alerta])

    function checkFields(){
        if(selectedClient!=null && selectedPlan!=null){
            return true;
        }
        return false;
    }
    function handleSubmit(){
        if(checkFields()){
            
            fetch('http://localhost:8080/compras/add?cantCompras='+compras, {
                  method: 'POST',
                  body: JSON.stringify({"ci": selectedClient.split(",")[0], "id": selectedPlan.split(",")[0], "precioTotal": finalCost}),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => {
                    if(response.status==200){
                        setAlerta(true)
                        fetch('http://localhost:8080/clients/actualizarCliente?ci='+selectedClient.split(",")[0]+'&cantCompras='+compras, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            }
                          }).then(response => response.status==200?setAlerta(true): null)
                          .catch(error => setErrorT(error))
                }})
                .catch(error => setErrorT(error))
            
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
            value={selectedClient}
            onChange={(e) =>{
                
                setSelectedClient(e.target.value)
            }}
            label="Cliente"
            style={{position: 'relative', margin: "auto", width: "40vmin", backgroundColor: 'lightgray'}}
            >
                                    
            {clientes.map((aClient, i) => {
                return(
                    <MenuItem value={aClient.ci + ", " +aClient.name + ", " +aClient.lastName}>
                    <em>{aClient.ci + ", " +aClient.name + " " +aClient.lastName}</em>
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
            value={selectedPlan}
            onChange={(e) =>{
                setSelectedPlan(e.target.value)}}
            label="Plan de viaje"
            style={{position: 'relative', margin: "auto", width: "40vmin", backgroundColor: 'lightgray'}}
            >
            {planes.map((aPlan, i) => { 
                return(
                    <MenuItem value={aPlan.id + ", " +aPlan.destiny + ", " +aPlan.date + ", " + aPlan.cost}>
                    <em>{aPlan.id + ", " +aPlan.destiny + " " +aPlan.date}</em>
                    </MenuItem>

                )
            })}
            </Select>
        </FormControl>
        <h1>{finalCost!=null?"$"+finalCost:null}</h1>
        <div>
            <Button variant="outlined" color="success" className="addBtn" style={{top: '5vmin'}} onClick={handleSubmit}>Agregar</Button>            

        </div>
        {errorT!="" ? <Alert severity="error" className="alert">{"Error: " +errorT}</Alert>: ""}
        {alerta!=false ? <Alert severity="success" className="alert">{"Compra realizada con éxito"}</Alert>: ""}
        <div style={{border: "lightgray solid thin", margin: '5vmin', marginTop: '10vmin'}}>
            {comprasCI.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {comprasCI.map((compra, i) => { 
                      
                        return(

                            <ListItem className="itemList"
                            secondaryAction={
                              <IconButton aria-label="delete" onClick={(e) => deleteCompra(compra.idCompra)}>
                              <DeleteIcon />
                              </IconButton>
                            }
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={"Id compra: "+compra.idCompra + ", CI: " + compra.ci + ", ID plan: " + compra.id + ", Costo: $" + compra.precioTotal}
                            />
                            
                            </ListItem>


                        )
                    })}
                    </List>
                </div>
            : <h1>No hay planes ingresados para el cliente</h1>}
            </div>
            {alerta2!=false ? <Alert severity="success" className="alert">{"Compra eliminada con éxito"}</Alert>: ""}

      </div>


    </div>
    )
}
