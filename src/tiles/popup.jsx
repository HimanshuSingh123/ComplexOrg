import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import "./css/popup.css"
import { useTaskContent } from "../TaskContext"

function PopUp(props){

    const {appendImage, removeImage} = useTaskContent();

    const title = props.title

    const [isOpen, setIsOpen] = useState(false);

    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);

    const openFunction = () => { 
        setIsOpen(true);
    }

    const handleDesc = (task, text) => {
      props.descriptionFunc(task, text);
    }

    const retrieveDesc = () => {
      if(props.desc){
        return props.desc;
      } else {
        return '';
      }
    }

    useEffect(() => {
      openFunction();
    }, []);

    return ReactDOM.createPortal(
        isOpen && <div onClick={props.onClose} className="popupOverlay">
            <div className="popup" onClick={e => e.stopPropagation()}>
              <div className="navBar">
                <button onClick={props.onClose} >Ⓧ</button>
              </div>
        
              <div className="taskTitle">
                <h2>{title}</h2>
              </div>
        
              <div className="popupDescription">
                <textarea value={retrieveDesc()} onChange={e => handleDesc(props.task, e.target.value)} className="mainInput" placeholder="Add Information..." />
              </div>
        
              <div className="supportInput">
                <div className="popupImages">
                  {/* Image content here */}
                </div>
        
                <div className="popupLinks">
                  {/* Links content here */}
                </div>
              </div>
          </div>
        </div>,
        document.getElementById('modal-root')
      );
}

export default PopUp;