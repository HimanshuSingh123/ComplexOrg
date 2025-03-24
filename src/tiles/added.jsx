import { useState } from 'react'
import { use } from 'react'
import React from 'react';
import "./css/added.css";

function Tile(props){

let buttonSection;
let buttonSection2;
console.log(props.type)
if(props.type === 1){
    buttonSection = (
    <div className='checkButton'>
        <button className='checkB' onClick={
            () => {
            props.addToDoneList(props.object);
            props.removeFromTodoList(props.object);
            }
        }>✔</button>
    </div>
    );
    buttonSection2 = (
        <div className='removeButton'>
            <button className='removeB' onClick={
                () => {
                    props.removeFromTodoList(props.object);
                }
            }>✘</button>
        </div>
    );
} 
else if(props.type === 2){
    buttonSection = (
        <div className='undoButton'>
            <button className='undoB' onClick={
                () => {
                    props.addToTodoList(props.object);
                    props.removeFromDoneList(props.object);
                }
            }>↑</button>
        </div>
    );
    buttonSection2 = (
        <div className='removeButton'>
            <button className='removeB' onClick={
                () => {
                    props.removeFromDoneList(props.object);
                }
            }>✘</button>
        </div>
    );
}

return(
<div className='Tile'>
    <div className='task'>
        {props.object.text}
    </div>
    <div className='buttons'>
        {buttonSection}
        {buttonSection2}
    </div>
</div>
);

}

export default Tile;