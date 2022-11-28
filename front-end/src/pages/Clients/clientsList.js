import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CompareSharp } from '@mui/icons-material';

export const ClientsList = () =>{
    const [clientes, setClientes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");


    function listClients(){
        fetch('http://localhost:8080/clients')
        .then(response => response.json())
        .then(data => setClientes(data))
        .catch(error => setErrorT(error))
    
    }

    React.useEffect(() => {
      listClients()
    }, [])

    return(
        <div className="App">
            <h1> Lista de clientes </h1>
            <div className="formContainer" >
                {clientes.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {clientes.map((aClient, i) => { 
                        return(

                            <ListItem className="itemList"
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={aClient.ci + ", " + aClient.name + ", " + aClient.lastName + ", "+ aClient.email + ", "+ aClient.tipo}
                            />
                            </ListItem>


                        )
                    })}
                    </List>
                </div>
                : <h1>No hay clientes ingresados</h1>}

            </div>
        </div>
        )
}