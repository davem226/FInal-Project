import React from "react";
import Message from "../Message";

export const IsLiked = ({ onYesClick, onNoClick }) => (
    <span className="is-liked">
        <Message id="is-liked" text="Did you like this article?"/>
        <button onClick={onYesClick} id="yes" className="button">Yes</button>
        <button onClick={onNoClick} id="no" className="button">No</button>
    </span>
);