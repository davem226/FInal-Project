import React from "react";
import { Input } from "./Subs/Input";

export const ArticleSearch = (props) => (
    <form id="article-search">
        <Input
            name="query"
            value={props.query}
            onChange={props.onchange}
            placeholder="Topic..."
        />
        {props.children}
    </form>
);