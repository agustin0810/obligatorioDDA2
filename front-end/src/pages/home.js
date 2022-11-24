import '../styles/general.css';
import MainButton from '../components/mainButton'
import {GoClientsHome, GoPlansHome, GoPlansPurchasing, GoListing} from '../functions/mainFunctions'
import clienteImg from '../images/cliente.png'
import plandeviajeImg from '../images/plandeviaje.png'
import compraPlanesImg from '../images/compraPlanes.png'
import listingImg from '../images/list.png'

import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()


  return (
    <div className="App">
      
      <div className='title'>
        Agencia de viajes
      </div>
      
      <header className="App-header">
        <MainButton value="Clientes" onPress={GoClientsHome} img={clienteImg}/>
        <MainButton value="Planes de viaje" onPress={GoPlansHome} img={plandeviajeImg}/>
        <MainButton value="Compra plan de viaje" onPress={GoPlansPurchasing} img={compraPlanesImg}/>
        <MainButton value="Listados adicionales" onPress={GoListing} img={listingImg}/>

      </header>
    
    </div>
  );
}

export default Home;