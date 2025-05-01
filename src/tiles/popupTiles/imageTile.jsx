import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import '../css/imageTile.css'
import '../css/linkTile.css'
import { useTaskContent } from "../../TaskContext";

function ImageTile(props) {
    const {removeImage} = useTaskContent();

    const shortenImageName = (filename) => {
        return filename.length > 15 ? `${filename.slice(0, 12)}...` : filename;
    }

    return (
        <div class="linkTile">
        <div class="Icon">
            <img class="image" src={props.image.url}></img>
        </div>
        <div className="">{shortenImageName(props.image.filename)}</div>
        <div class="remove">
            <button onClick={() => {removeImage(props.task, props.image.id)}}>
            X
            </button>
        </div>
        </div>
    )
}

export default ImageTile