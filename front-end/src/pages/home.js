import '../styles/general.css';
import MainButton from '../components/mainButton'
import {GoClientsHome, GoPlansHome} from '../functions/mainFunctions'
import clienteImg from '../images/cliente.png'
import plandeviajeImg from '../images/plandeviaje.png'

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
      </header>
    
    </div>
  );
}

export default Home;