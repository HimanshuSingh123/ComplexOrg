import { useEffect, useState, useRef } from "react"
import ReactDOM from 'react-dom'
import "./css/popup.css"
import { useTaskContent } from "../TaskContext"
import { use } from "react";
import ImageTile from "./popupTiles/imageTile";

function PopUp(props){

    const {appendImage, removeImage, appendLink, removeLink, masterList , getImagesForObject, getTask} = useTaskContent();

    const title = props.title

    const [isOpen, setIsOpen] = useState(false);

    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);

    const fileInputRef = useRef();

    const openFunction = () => { 
        setIsOpen(true);
    }

    
    useEffect(() => {
      const task = getTask(props.taskId);
      if(!task) return;
      console.log(getImagesForObject(props.task));
    }, [masterList]);

    useEffect(() => {
      const task = getTask(props.task);
      if(!task) return;
      setImages(getImagesForObject(props.task))
    }, [masterList])

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
                <div>
                <button onClick={() => fileInputRef.current.click()}>+</button>
                <input type="file" accept="image/*" onChange={e => appendImage(e, props.task)} style={{display : "none"}} ref={fileInputRef}></input>
                  <div className="popupImages">
                    <ul className="imageUl">
                      {images.map((image, index) => <li key={index} className="imageTile">
                        <ImageTile
                        task={props.task}
                        image={image}
                        />
                        </li>)}
                    </ul>
                  </div>
                </div>
                <div>
                  <button>+</button>
                  <div className="popupLinks">
                    {/* Links content here */}
                  </div>
                </div>
              </div>
          </div>
        </div>,
        document.getElementById('modal-root')
      );
}

export default PopUp;