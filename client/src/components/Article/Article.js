import React from "react";

const Article = (props) => (
    <div className="article">
        <a href={props.link} target="_blank" alt="article">
            <h2>{props.title}</h2>
        </a>
        <p>{props.preview}</p>
        <div className="source">{props.source}</div>
        {props.children}
    </div>
);
export default Article;