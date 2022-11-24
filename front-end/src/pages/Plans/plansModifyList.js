import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import BorderColor from '@mui/icons-material/BorderColor';

export const PlansModifyList = () =>{
    const [planes, setPlanes] = React.useState([]);
    
    function goToPlan(id){
        window.location.href('/planes/modifyPlan/'+id)
    }

    function listPlans(){
        fetch('localhost:5000/plans')
        .then(data => {
            return data.json();
        })
        .then(plan => {
            planes.push(plan)
        });
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
                                <IconButton edge="end" aria-label="delete" id={aPlan.id} onClick={(e) => goToPlan(e.target.id)}>
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