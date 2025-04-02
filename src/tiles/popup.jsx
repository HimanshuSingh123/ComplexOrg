import { useEffect, useState } from "react"

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

    return (
        isOpen && <div className="popup">
          <div className="navBar">
            <button>Ⓧ</button>
          </div>
    
          <div className="taskTitle">
            <h2>{title}</h2>
          </div>
    
          <div className="popupDescription">
            <input type="text" placeholder="Add Information..." />
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

export default PopUp;