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
        const apiCall = async () => {
            const response = await fetch('http://localhost:8080/plans/delete/'+aPlanId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.status==200?setAlerta(true): null)
        .catch(error => setErrorT(error.errorMsg))
    }
    }
    function listPlans(){
        fetch('localhost:8080/plans')
        .then(data => {
            return data.json();
        })
        .then(plan => {
            plans.push(plan)
        })
        .catch(error => setErrorT(error.errorMsg))
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
                                <IconButton aria-label="delete" id={aPlan.id} onClick={(e) => deletePlan(e.target.id)}>
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