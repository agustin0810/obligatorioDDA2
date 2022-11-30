
import { useParams } from "react-router-dom"
import * as React from 'react';
import '../../styles/forms.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import viaje1 from '../../images/viaje1.jpg'
import viaje2 from '../../images/viaje2.jpg'
import viaje3 from '../../images/viaje3.png'

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
                <Carousel style={{width: '100vmin', height: '60vmin', position: 'relative', margin: 'auto'}}>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={viaje1}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Grandes paseos por la montaña</h3>
                        <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={viaje2}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>Senderismo</h3>
                        <p></p>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={viaje3}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Paseos por la ciudad</h3>
                        <p></p>

                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>

                </div>
            </div>
            </div>
        )
}