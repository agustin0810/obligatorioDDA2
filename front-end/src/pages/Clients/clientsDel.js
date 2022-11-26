import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert'

export const ClientsDel = () =>{
    const [clientes, setClientes] = React.useState([]);
    const [alerta, setAlerta] = React.useState(false);
    const [errorT, setErrorT] = React.useState("");

    function deleteClient(aClientId) {
        console.log(aClientId)
        fetch('http://localhost:8080/clients/delete?ci='+aClientId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
          },
        }).then(response =>{
            if(response.status==200){
                setAlerta(true)
                listClients()
            }
        })
        .catch(error => setErrorT(error.errorMsg))
    }
    
    function listClients(){
        fetch('http://localhost:8080/clients')
        .then(response => response.json())
        .then(data => setClientes(data))
        .catch(error => setErrorT(error.errorMsg))
    
    }

    React.useEffect(() => {
      listClients()
    }, [])
    

    return(
        <div className="App">
            <h1> Baja de clientes </h1>
            <div className="formContainer" >
                {clientes.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {clientes.map((aClient, i) => { 
                        return(

                            <ListItem className="itemList"
                            secondaryAction={
                                <IconButton aria-label="delete" onClick={(e) => deleteClient(aClient.ci)}>
                                <DeleteIcon />
                                </IconButton>
                            }
                            key={aClient.ci}
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={aClient.ci + ", " + aClient.name + ", " + aClient.lastName + ", "+ aClient.email + ", " + aClient.tipo }
                            />
                            </ListItem>
    

                        )
                     })}
                    </List> 
                    
                </div>
            : <h1>No hay clientes ingresados</h1>}
                {alerta!=false ? <Alert severity="success" className="alert">{"Baja realizada con éxito"}</Alert>: ""}

            </div>
        </div>
        )
}