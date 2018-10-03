import React from "react";
import { Input } from "./Subs/Input";

export const ArticleSearch = (props) => (
    <form>
        <Input
            name="query"
            value={props.query}
            onChange={props.handleInputChange}
            placeholder="Enter topic..."
        />
        {props.children}
    </form>
);