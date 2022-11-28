
import { useParams } from "react-router-dom"
import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button'

export const PlanImages = () =>{
    const [images, setImages] = React.useState([]);
    const [errorT, setErrorT] = React.useState("");
    const { id } = useParams()

    function listImages(){
        fetch('http://localhost:8080/images/get?id='+id)
        .then(response => response.json())
        .then(data => {
            
            console.log(data)
            setImages(data)
        })
        .catch(error => setErrorT(error))
    }

    React.useEffect(() => {
      listImages()
    }, [])

    return(
        <div className="App">
            <h1> Lista de imágenes </h1>
            <div className="formContainer" >
                
                <div className="gridList">
                    <List className="itemsList">
                        

                           <img src={images.imageData} />

                    </List>
                </div>

            </div>
        </div>
        )
}