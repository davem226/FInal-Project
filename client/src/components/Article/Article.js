import React from "react";

const Article = (props) => (
    <div className="article">
        <div className="color-bar"></div>
        <a href={props.link} target="_blank" alt="article">
            <h2>{props.title}</h2>
        </a>
        <div className="source">{props.source}</div>
        <p>{props.preview}</p>
        {props.children}
    </div>
);
export default Article;