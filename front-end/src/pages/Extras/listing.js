import * as React from 'react';
import TextField from '@mui/material/TextField';
import '../../styles/forms.css'
import '../../styles/general.css'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const Listing = () =>{
    const [clientes, setClientes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    const [alerta, setAlerta] = React.useState(false);
    const [selectedClientCI, setSelectedClientCI] = React.useState(null);
    const [date, setDate] = React.useState(Date.now);
    const [planes, setPlanes] = React.useState([]);
    
    function listClients(){
        fetch('localhost:8080/clients')
        .then(data => {
            return data.json();
        })
        .then(client => {
            clientes.push(client)
        })
        .catch(error => setErrorT(error.errorMsg))
    }
    function goToImages(id){
        window.location.assign("/planImages/"+id)
    }
    function handleSubmit(){
        fetch('localhost:8080/plans?' + new URLSearchParams({selectedClientCi: selectedClientCI, selectedDate: date}))
        .then(data => {
            return data.json();
        })
        .then(plan => {
            planes.push(plan)
        })
        .catch(error => setErrorT(error.errorMsg))
    }
    
    React.useEffect(() => {
        listClients()
      }, [])

    return(
    <div className="App">
        <h1>Listados adicionales</h1>

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
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="A partir de:"
                    value={date}
                    onChange={(newValue) => {
                    setDate(newValue);
                    }}
                    renderInput={(params) => <TextField 
                        style={{width: '40vmin', position: 'relative', margin: 'auto', marginTop: '5vmin', marginBottom: '5vmin'}} {...params} />}
                />
            </LocalizationProvider>
            <div>
                <Button variant="outlined" color="success" onClick={handleSubmit}>Listar</Button>            

            </div>
            <div style={{border: "lightgray solid thin", margin: '5vmin'}}>
            {planes.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {planes.map((aPlan, i) => { 
                        return(

                            <ListItem className="itemList"
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={aPlan.id + ", " + aPlan.destiny + ", " + aPlan.date + ", " + aPlan.modality + ", "+ aPlan.cost}
                            />
                            
                            <Button id={aPlan.id} onClick={(e)=>goToImages(e.target.id)}>Ir a imágenes</Button>
                            </ListItem>


                        )
                    })}
                    </List>
                </div>
            : <h1>No hay planes ingresados para el cliente</h1>}
            </div>
        </div>
    </div>
    )
}
