
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import '../../styles/general.css';
import '../../styles/forms.css';

export const ClientsAdd = () =>{
    function handleSubmit(){
        console.log("submit");
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
                id="outlined-required"
                label="Cédula de Identidad"
                />
                <TextField
                required
                id="outlined-required"
                label="Nombre"
                />
                <TextField
                required
                id="outlined-required"
                label="Apellido"
                />
                <TextField
                required
                id="outlined-required"
                label="Email"
                />
            </div>
            </Box>

            </div>
        </div>
    )
}