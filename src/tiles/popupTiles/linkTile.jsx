import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import '../css/linkTile.css'
import { useTaskContent } from "../../TaskContext";
import Linkify from 'linkify-react';
import linkImage from '../../images/linkSymbol.jpg'

function LinkTile(props) {
    const {removeLink} = useTaskContent();

      const shortenDecoratedText = (text) => {
        return text.length > 12 ? `${text.slice(0, 12)}...` : text;
      };
      
      const options = {
        target: '_blank',
        rel: 'noopener noreferrer',
        format: (value, type) => {
          // This changes the text that gets displayed
          return shortenDecoratedText(value);
        }
      };
      
      const linkify = (text) => {
        return (
          <Linkify options={options}>
            {text}
          </Linkify>
        );
      };

    return (
        <div class="linkTile">
            <div class="Icon">
                <img class="image" src={linkImage}></img>
            </div>
                <div className="linkText">{linkify(props.link.url)}</div>
                <div class="remove">
                    <button className="x-remove" onClick={() => {removeLink(props.task, props.link.id)}}>
                    X
                    </button>
                </div>
        </div>
    )
}

export default LinkTile