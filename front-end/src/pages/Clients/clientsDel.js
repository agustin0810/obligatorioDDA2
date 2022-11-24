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
    const [clientId, setClientId] = React.useState(null);
    const [alerta, setAlerta] = React.useState(false);

    
    function deleteClient(aClientId){
        const apiCall = async () => {
            const response = await fetch('http://localhost:5000/clients/delete/'+aClientId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.status==200?setAlerta(true): null)
    }
    }
    function listClients(){
        fetch('localhost:5000/clients')
        .then(data => {
            return data.json();
        })
        .then(client => {
            clientes.push(client)
        });
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
                                <IconButton edge="end" aria-label="delete" id={aClient.id} onClick={(e) => deleteClient(e.target.id)}>
                                <DeleteIcon />
                                </IconButton>
                            }
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={aClient.id + ", " + aClient.ci + ", " + aClient.name + ", " + aClient.lastname + ", "+ aClient.email}
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