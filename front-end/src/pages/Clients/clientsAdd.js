
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import '../../styles/general.css';
import '../../styles/forms.css';
import { useState, useEffect } from 'react';

export const ClientsAdd = () =>{

    const [name, setName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [ci, setCI] = useState(null);
    const [errorT, setErrorT] = useState("");
    const [alerta, setAlerta] = useState(false);
    const [repeated, setRepeated] = useState(false);

    function checkFields(){
        console.log("checking")
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
        else if((String(ci).length>8 || String(ci).length<7) || !(String(ci).match(/^\d+$/))){
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
    const checkRepeated = async () =>{
        console.log("checkrep")
        
        if(checkFields()){
        fetch('http://localhost:8080/clients/checkRepeated?ci='+ci, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
            },
        }).then(response => response.json())
        .then(res=>{
            if(res==false){
                apiCall()
            }
            else{
                setErrorT("La CI ya se encuentra ingresada")
                setAlerta(false)
            } 
        })
        }
    }
    const apiCall = async () => {
        setErrorT("")
        setAlerta(false)
            
                await fetch('http://localhost:8080/clients/add', {
                  method: 'POST',
                  body: JSON.stringify({ci: ci, lastName: lastname, name: name, email: email}),
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }).then(response => {
                    console.log("a")
                    if(response.status==200){
                        setErrorT("")
                        setAlerta(true);
                    }
                })
                .catch(error => setErrorT(error))

    }
    return(
        <div className="App">
            <h1> Alta de clientes </h1>
            <div className="formContainer" >
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
                id="ci"
                label="Cédula de Identidad"
                style={{width: '40vmin'}}
                onChange={(e)=>setCI(parseInt(e.target.value))}
                />
                <TextField
                required
                id="name"
                label="Nombre"
                style={{width: '40vmin'}}
                onChange={(e)=>setName(e.target.value)}
                />
                <TextField
                required
                id="lastname"
                label="Apellido"
                style={{width: '40vmin'}}
                onChange={(e)=>setLastName(e.target.value)}
                />
                <TextField
                required
                id="email"
                label="Email"
                style={{width: '40vmin'}}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
            <Button variant="outlined" color="success" className="addBtn" style={{top: '5vmin'}} onClick={checkRepeated}>Agregar</Button>            

            </div>
            {/*Manejo de errores FRONT-END*/}
            {errorT!="" ? <Alert severity="error" className="alert">{"Error: " +errorT}</Alert>: ""}
            {alerta!=false ? <Alert severity="success" className="alert">{"Alta realizada con éxito"}</Alert>: ""}
            </Box>

            </div>
        </div>
    )
}