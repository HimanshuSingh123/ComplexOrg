import { useState } from 'react'
import { use } from 'react'
import React from 'react';
import "./css/added.css";
import PopUp from './popup';

function Tile(props){

let buttonSection;
let buttonSection2;
const [showPopup, setShowPopup] = useState(false);


const onClose = () =>{
    setShowPopup(false);
}

console.log(props.object.completed)
if(props.object.completed === false){
    buttonSection = (
    <div className='checkButton'>
        <button className='checkB' onClick={
            () => {
            props.switchListFunc(props.object);
            }
        }>✔</button>
    </div>
    );
    buttonSection2 = (
        <div className='removeButton'>
            <button className='removeB' onClick={
                () => {
                    props.removeTask(props.object.id);
                }
            }>✘</button>
        </div>
    );
} 
else if(props.object.completed === true){
    buttonSection = (
        <div className='undoButton'>
            <button className='undoB' onClick={
                () => {
                    props.switchListFunc(props.object);
                }
            }>↑</button>
        </div>
    );
    buttonSection2 = (
        <div className='removeButton'>
            <button className='removeB' onClick={
                () => {
                    props.removeTask(props.object.id);
                }
            }>✘</button>
        </div>
    );
}

return(
<>
    <div className='Tile'>
        <div onClick={() => setShowPopup(true)} className='task'>
            {props.object.text}
        </div>
        <div className='buttons'>
            {buttonSection}
            {buttonSection2}
        </div>
    </div>
    { showPopup && <PopUp title={props.object.text} onClose={onClose} descriptionFunc={props.updateDescription} desc={props.object.description} task={props.object}/>}
</>
);
}

export default Tile;