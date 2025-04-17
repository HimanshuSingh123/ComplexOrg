import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import '../css/imageTile.css'

function imageTile(props) {

    return (
        <div class="imageTile">
        <div class="Icon">
            <img class="image" src=""></img>
        </div>
        <div class="remove">
            <button>
            X
            </button>
        </div>
        </div>
    )
}