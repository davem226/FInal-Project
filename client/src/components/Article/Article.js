import React from "react";

const Article = (props) => (
    <div id={props.id} className="article">
        <div className="color-bar"></div>
        <a href={props.link} target="_blank" alt="article">
            <h2 onClick={props.onclick}>{props.title}</h2>
        </a>
        <div className="source">{props.source}</div>
        <p>{props.preview}</p>
        {props.children}
    </div>
);
export default Article;