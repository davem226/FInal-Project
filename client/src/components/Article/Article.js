import React from "react";

const Article = (props) => (
    <div className="article">
        <a href={props.link} target="_blank" alt="article">
            <h1>{props.title}</h1>
        </a>
        <p>{props.preview}</p>
        <div className="source">{props.source}</div>
        {props.children}
    </div>
);
export default Article;