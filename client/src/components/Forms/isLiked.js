import React from "react";

export const isLiked = ({ onClick }) => (
    <span className="isLiked">
        <p>Did you like this article?</p>
        <button onClick={onClick} id="yes" className="button">Yes</button>
        <button onClick={onClick} id="no" className="button">No</button>
    </span>
);