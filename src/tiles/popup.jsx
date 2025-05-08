import { useEffect, useState, useRef, isValidElement } from "react"
import ReactDOM from 'react-dom'
import "./css/popup.css"
import { useTaskContent } from "../TaskContext"
import { use } from "react";
import ImageTile from "./popupTiles/imageTile";
import LinkTile from "./popupTiles/linkTile";


function PopUp(props){

    const {appendImage, appendLink, masterList , getImagesForObject, getLinksForObject, getTask} = useTaskContent();

    const title = props.title

    const [isOpen, setIsOpen] = useState(false);

    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);
    const [value, setValue] = useState('');
    const [image, setImage] = useState('');
    const [openImage, setOpenImage] = useState(false);

    const fileInputRef = useRef();

    const openFunction = () => { 
        setIsOpen(true);
    }

    useEffect(() => {
      if(image){
        setOpenImage(true);
      } else {
        setOpenImage(false)
      }
    }, [image])

    
    useEffect(() => {
      const task = getTask(props.taskId);
      if(!task) return;
      console.log(getImagesForObject(props.task));
    }, [masterList]); //OPTIMIZE THESE USEEFFECTS!

    useEffect(() => {
      const task = getTask(props.task);
      if(!task) return;
      setImages(getImagesForObject(props.task))
    }, [masterList]);

    useEffect(() => {
      const task = getTask(props.task);
      if (!task) return;
      console.log(getLinksForObject(props.task));
    }, [masterList]);

    useEffect(() => {
      const task = getTask(props.task);
      if(!task) return;
      setLinks(getLinksForObject(props.task));
      setValue('');
    }, [masterList]);

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

    const isValidURL = (text) => {
      let url;
      try{
        url = new URL(text);
      } catch {
        return false;
      }
      return true;
    }

    useEffect(() => {
      openFunction();
    }, []);

    return ReactDOM.createPortal(
        isOpen && <div onClick={props.onClose} className="popupOverlay">
          
            <div className="popup" onClick={e => e.stopPropagation()}>
              <div style={openImage ? {marginRight: '30px'} : {}}>
              <div className="navBar">
                <button onClick={props.onClose} >Ⓧ</button>
              </div>
        
              <div className="taskTitle">
                <h2>{title}</h2>
              </div>
        
              <div className="popupDescription">
                <textarea value={retrieveDesc()} onChange={e => handleDesc(props.task, e.target.value)} className="mainInput" placeholder="Add Information..." />
              </div>
        
              <div className="supportInput" style={openImage ? {marginRight: '50px'} : {}}>
                <div>
                <button onClick={() => fileInputRef.current.click()}>+</button>
                <input type="file" accept="image/*" onChange={e => appendImage(e, props.task)} style={{display : "none"}} ref={fileInputRef}></input>
                  <div className="popupImages">
                    <ul className="imageUl">
                      {images.map((image, index) => <li key={index} className="imageTile">
                        <ImageTile
                        task={props.task}
                        image={image}
                        setImage={setImage}
                        />
                        </li>)}
                    </ul>
                  </div>
                </div>
                <div className="linkDivSupport">
                  <input type="text" 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={
                    (e) => {
                        if(e.key === "Enter"){
                          if(value === ''){
                            console.log('needs to be of some value for now...');
                            return;
                          }
                          isValidURL(value) ? appendLink(value, props.task) : alert('invalid link!');
                        }
                      }
                    } 
                    className="linkInput"></input>
                  <button onClick={() => {
                    if(value === ''){
                      console.log('needs to be of some value for now...');
                      return;
                    }
                    isValidURL(value.trim()) ? appendLink(value, props.task) : alert('invalid link!');
                  }}>+</button>
                  <div className="popupLinks">
                    <ul className="linkUl">
                      {links.map((link, index) => <li key={index}><LinkTile link={link} task={props.task}/></li>)}
                    </ul>
                  </div>
                </div>
              </div>
              </div>
              {openImage && 
                <div className="imagePopup">
                  <img className="selectedImage" src={image}/>
                  <div className="closeImagePopupDiv">
                    <button onClick={() => {setImage('')}} className="closeImagePopup">X</button>
                    </div>
                </div>
              }
          </div>
        </div>,
        document.getElementById('modal-root')
      );
}

export default PopUp;