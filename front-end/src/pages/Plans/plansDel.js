import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert'

export const PlansDel = () =>{
    const [plans, setPlans] = React.useState([]);
    const [planId, setPlanId] = React.useState(null);
    const [alerta, setAlerta] = React.useState(false);
    const [errorT, setErrorT] = React.useState("");

    
    function deletePlan(aPlanId){
        fetch('http://localhost:8080/plans/delete?id='+aPlanId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
              },
            }).then(response =>{
                
            console.log(response.text)
                if(response.status==200){
                    setAlerta(true)
                    listPlans()
                }
            })
            .catch(error => setErrorT(error))
    }
    
    function listPlans(){
        fetch('http://localhost:8080/plans')
        .then(response => response.json())
        .then(data => setPlans(data))
        .catch(error => setErrorT(error))
    }

    React.useEffect(() => {
      listPlans()
    }, [])
    

    return(
        <div className="App">
            <h1> Baja de planes </h1>
            <div className="formContainer" >
                {plans.length!=0 ? 
                <div className="gridList">
                    <List className="itemsList">
                    {plans.map((aPlan, i) => { 
                        return(

                            <ListItem className="itemList"
                            secondaryAction={
                                <IconButton aria-label="delete" id={aPlan.id} onClick={(e) => deletePlan(aPlan.id)}>
                                <DeleteIcon />
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
                {alerta!=false ? <Alert severity="success" className="alert">{"Baja realizada con éxito"}</Alert>: ""}

            </div>
        </div>
        )
}