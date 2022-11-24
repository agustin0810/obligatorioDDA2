import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const ClientsList = () =>{
    const [clientes, setClientes] = React.useState([]);

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