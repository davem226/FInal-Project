import React from "react";

const Article = (props) => (
    <div className="article">
        <a src={props.link} alt="article">
            <title>{props.title}</title>
        </a>
        <source>{props.source}</source>
    </div>
);
export default Article;