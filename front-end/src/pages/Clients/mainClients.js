import '../../styles/general.css';
import MainButton from '../../components/mainButton'
import {GoClientsAdd, GoClientsDel, GoClientsModify, GoClientsList} from '../../functions/mainFunctions'
import addImg from '../../images/add.png'
import deleteImg from '../../images/delete.png'
import modifyImg from '../../images/modify.png'
import listImg from '../../images/list.png'

export const MainClients = () =>{
    return(
        <div className="App">
      
        <div className='title'>
          Clientes
        </div>
        <header className="App-header">
          <MainButton value="Alta" onPress={GoClientsAdd} img={addImg}/>
          <MainButton value="Baja" onPress={GoClientsDel} img={deleteImg}/>
          <MainButton value="Modificar" onPress={GoClientsModify} img={modifyImg}/>
          <MainButton value="Listado" onPress={GoClientsList} img={listImg}/>
        </header>
      
      </div>
    )
}
