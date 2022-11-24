import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const PlansList = () =>{
    const [planes, setPlanes] = React.useState([]);

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
            <h1> Lista de planes </h1>
            <div className="formContainer" >
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