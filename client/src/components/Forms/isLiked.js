import React from "react";
import Message from "../Message";

export const IsLiked = ({ onClick }) => (
    <span className="is-liked">
        <Message id="is-liked" text="Did you like this article?"/>
        <button onClick={onClick} id="yes" className="button">Yes</button>
        <button onClick={onClick} id="no" className="button">No</button>
    </span>
);