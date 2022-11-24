import '../../styles/general.css';
import MainButton from '../../components/mainButton'
import {GoPlansAdd, GoPlansDel, GoPlansModify, GoPlansList} from '../../functions/mainFunctions'
import addImg from '../../images/add.png'
import deleteImg from '../../images/delete.png'
import modifyImg from '../../images/modify.png'
import listImg from '../../images/list.png'

export const MainPlans = () =>{
    return(
        <div className="App">
          
        <div className='title'>
            Planes
        </div>
        <header className="App-header">
            <MainButton value="Alta" onPress={GoPlansAdd} img={addImg}/>
            <MainButton value="Baja" onPress={GoPlansDel} img={deleteImg}/>
            <MainButton value="Modificar" onPress={GoPlansModify} img={modifyImg}/>
            <MainButton value="Listado" onPress={GoPlansList} img={listImg}/>
        </header>
          
        </div>
    )
}