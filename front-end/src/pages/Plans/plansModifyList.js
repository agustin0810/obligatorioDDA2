import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import BorderColor from '@mui/icons-material/BorderColor';

export const PlansModifyList = () =>{
    const [planes, setPlanes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    
    function goToPlan(id){
        window.location.href='/planesdeviaje/modifyPlan/'+id
    }

    function listPlans(){
        fetch('http://localhost:8080/plans')
        .then(response => response.json())
        .then(data => setPlanes(data))
        .catch(error => setErrorT(error))
    }

    React.useEffect(() => {
      listPlans()
    }, [])

    return(
        <div className="App">
            <h1> Modificar plan </h1>
            <div className="formContainer" >
                {planes.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {planes.map((aPlan, i) => { 
                        return(

                            <ListItem className="itemList"
                            secondaryAction={
                                <IconButton aria-label="delete" id={aPlan.id} onClick={(e) => goToPlan(aPlan.id)}>
                                <BorderColor />
                                </IconButton>
                            }
                            >
                            <ListItemText style={{wordWrap: 'break-word'}} 
                            primary={aPlan.id + ", " + aPlan.destiny + ", " + aPlan.date + ", " + aPlan.modality + ", "+ aPlan.cost}
                            />
                            </ListItem>


                        )
                    })}
                    </List>
                </div>
                    : <h1>No hay planes ingresados</h1>}

            </div>
        </div>
        )
}