import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button'

export const PlansList = () =>{
    const [planes, setPlanes] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    function listPlans(){
        fetch('http://localhost:8080/plans')
        .then(response => response.json())
        .then(data => setPlanes(data))
        .catch(error => setErrorT(error))
    }
    function goToImages(id){
        window.location.assign("/planImages/"+id)
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
                            <Button id={aPlan.id} onClick={(e)=>goToImages(e.target.id)}>Ir a imágenes</Button>
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