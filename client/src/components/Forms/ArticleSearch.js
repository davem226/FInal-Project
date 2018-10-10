import React from "react";
import { Input } from "./Subs/Input";

export const ArticleSearch = (props) => (
    <div id="search-div">
        <form id="article-search">
            <Input
                name="query"
                value={props.query}
                onChange={props.onchange}
                placeholder="Topic..."
            />
        </form>
        {props.children}
    </div>

);