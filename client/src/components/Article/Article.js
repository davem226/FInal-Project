import React from "react";

const Article = (props) => (
    <div className="article">
        <a src={props.link} target="_blank" alt="article">
            <title>{props.title}</title>
        </a>
        <source>{props.source}</source>
        {props.children}
    </div>
);
export default Article;