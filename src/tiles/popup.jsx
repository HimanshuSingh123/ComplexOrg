import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import "./css/popup.css"

function PopUp(props){

    const title = props.title

    const [isOpen, setIsOpen] = useState(false);

    const [Description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);

    const openFunction = () => { 
        setIsOpen(!false)
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
                <textarea className="mainInput" placeholder="Add Information..." />
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