import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import BorderColor from '@mui/icons-material/BorderColor';

export const ClientsModifyList = () =>{
    
    const [clientes, setClientes] = React.useState([]);
    
    function goToClient(id){
        window.location.href('/clientes/modifyClient/'+id)
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
            <h1> Modificar cliente </h1>
            <div className="formContainer" >
                {clientes.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {clientes.map((aClient, i) => { 
                        return(

                            <ListItem className="itemList"
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" id={aClient.id} onClick={(e) => goToClient(e.target.id)}>
                                <BorderColor />
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

            </div>
        </div>
        )
}