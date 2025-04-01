import { useState } from "react"

function popUp(props){

    const title = props.title

    const [isOpen, setIsOpen] = useState(false);

    const [Description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);

    const openFunction = () => { 
        setIsOpen(!false)
    }

    return (
        <div className="popup">
          <div className="navBar">
            <button>Ⓧ</button>
          </div>
    
          <div className="taskTitle">
            <h2>Title1</h2>
          </div>
    
          <div className="popupDescription">
            {/* Description content here */}
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
      );
}