
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import '../../styles/general.css';
import '../../styles/forms.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const ClientModify = () =>{

    const [name, setName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [ci, setCI] = useState(null);
    const [errorT, setErrorT] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [cliente, setCliente] = useState(null);
    const [tipo, setTipo] = useState(null);

    const { id } = useParams()
    
    useEffect(() => {
        
        fetch('http://localhost:8080/clients/'+id)
        .then(data => {
            return data.json();
        })
        .then(client => {
            setCliente(client)
            setName(client.name)
            setLastName(client.lastName)
            setEmail(client.email)
            setTipo(client.tipo)
            setCI(client.ci)
        })
        .catch(error => setErrorT(error))
    }, [])
    
    function checkFields(){

        //Errores de filling
        if(name==null || lastname==null || email==null || ci==null){

            var error = "falta ";
            if(name == null){
                error = error + " nombre "
            }
            if(lastname == null){
                error = error + " apellido "
            }
            if(email == null){
                error = error + " email "
            }
            if(ci == null){
                error = error + " CI "
            }
            
            setErrorT(error)
            return false;
        }
        else if((ci.length>8 && ci.length<7) || !ci.match(/^\d+$/)){
            setErrorT("Error: ingrese CI válida (7 u 8 dígitos, no '.' ni ',')")
            return false
        }
        else if(name.length>30){
            setErrorT("Error: el nombre no puede tener más de 30 caracteres")
            return false
        }
        else if(lastname.length>30){
            setErrorT("Error: el apellido no puede tener más de 30 caracteres")
            return false
        }
        else if(email.length>30){
            setErrorT("Error: el email no puede tener más de 30 caracteres")
            return false
        }
        else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))){
            setErrorT("Error: ingrese un email válido")
            return false
        }

        return true;
    }
    const handleSubmit = () => {
        if(checkFields){
            console.log("in")
            fetch('http://localhost:8080/clients/modify', {
                method: 'POST',
                body: JSON.stringify({"ci": ci, "name": name, "lastName": lastname, "email": email, "tipo": tipo}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.status==200?setAlerta(true): null)
            .catch(error => setErrorT(error))
            
        }
    }
    
    
    return(
        <div className="App">
            <h1> Modificación de clientes </h1>
            <div className="formContainer" >
            {console.log(cliente)}
            {cliente!=null ? 
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 4, width: '33ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                disabled
                id="ci"
                label="Cédula de Identidad"
                style={{width: '40vmin'}}
                value={ci}
                onChange={(e)=>setCI(e.target.value)}
                />
                <TextField
                required
                id="name"
                label="Nombre"
                style={{width: '40vmin'}}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <TextField
                required
                id="lastname"
                label="Apellido"
                style={{width: '40vmin'}}
                value={lastname}
                onChange={(e)=>setLastName(e.target.value)}
                />
                <TextField
                required
                id="email"
                label="Email"
                style={{width: '40vmin'}}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label" style={{position: 'relative', margin: "auto"}}>Tipo</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) =>setTipo(e.target.value)}
                    value={tipo}
                    label="Tipo"
                    style={{position: 'relative', margin: "auto", width: "40vmin"}}
                    >  
                        <MenuItem value={"STANDARD"}>
                        <em>{"STANDARD"}</em>
                        </MenuItem>

                        <MenuItem value={"PREMIUM"}>
                        <em>{"PREMIUM"}</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
            <Button variant="outlined" color="success" className="addBtn" style={{top: '5vmin'}} onClick={handleSubmit}>Modificar</Button>            

            </div>
            {/*Manejo de errores FRONT-END*/}
            {errorT!="" ? <Alert severity="error" className="alert">{"Error: " +errorT}</Alert>: ""}
            {alerta!=false ? <Alert severity="success" className="alert">{"Modificación realizada con éxito"}</Alert>: ""}
            </Box>
            : <h1>No se encontró el cliente</h1>}

            </div>
        </div>
    )
}