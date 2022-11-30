import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import BorderColor from '@mui/icons-material/BorderColor';

export const ClientsModifyList = () =>{
    
    const [clientes, setClientes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    
    function goToClient(id){
        console.log(id)
        window.location.href='/clientes/modifyClient/'+id
    }

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
            <h1> Modificar cliente </h1>
            <div className="formContainer" >
                {clientes.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {clientes.map((aClient, i) => { 
                        return(

                            <ListItem className="itemList"
                            secondaryAction={
                                <IconButton aria-label="delete"onClick={(e) => goToClient(aClient.ci)}>
                                <BorderColor />
                                </IconButton>
                            }
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={aClient.ci + ", " + aClient.name + ", " + aClient.lastName + ", "+ aClient.email + ", " + aClient.tipo}
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