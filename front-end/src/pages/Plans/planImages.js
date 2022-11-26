import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import '../../styles/general.css';
import '../../styles/forms.css';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from "react-router-dom"

import '../../styles/general.css';
import '../../styles/forms.css';

export const PlanImages = () =>{
    const [images, setImages] = useState([])
    const { id } = useParams()
    const [errorT, setErrorT] = React.useState("");

    const getImages =()=>{
        fetch('localhost:8080/images/'+id)
        .then(data => {
            return data.json();
        })
        .then(image => {
            setImages(image)
        })
        .catch(error => setErrorT(error.errorMsg))
    }
    useEffect(() => {
      getImages()
    }, [])

    return(
        <div className="App">
        {images.length!=0 ? 
        <div className="formContainer" >
        {images.map((anImage, i) => {
            <img src={"../../images/"+anImage.filename} />})}
        </div>
        : <h1> No se encontraron imágenes </h1>}
        </div>
    )
}
