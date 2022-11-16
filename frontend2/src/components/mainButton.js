import '../styles/general.css';

const MainButton = (props) =>{
    
    return(
        <div className="mainButton" onClick={props.onPress}>
            <img src={props.img} className="imgBtn" />
            <input type="button" value={props.value} className="textBtn"/>
        </div>
    )
}

export default MainButton;