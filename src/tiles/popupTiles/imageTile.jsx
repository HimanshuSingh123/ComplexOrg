import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import '../css/imageTile.css'
import '../css/linkTile.css'
import { useTaskContent } from "../../TaskContext";

function ImageTile(props) {
    const {removeImage} = useTaskContent();

    const shortenImageName = (filename) => {
        return filename.length > 10 ? `${filename.slice(0, 8)}...` : filename;
    }

    return (
        <div className="imageTile" onClick={(e) => {props.setImage(props.image.url)}}>
        <div className="Icon">
            <img class="image" src={props.image.url}></img>
        </div>
        <div className="textArea">{shortenImageName(props.image.filename)}</div>
        <div className="remove">
            <button onClick={(e) => { e.stopPropagation(); props.setImage(''); removeImage(props.task, props.image.id)}}>
            X
            </button>
        </div>
        </div>
    )
}

export default ImageTile