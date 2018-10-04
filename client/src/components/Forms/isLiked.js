import React from "react";

export const IsLiked = ({ onClick }) => (
    <span className="is-liked">
        <p>Did you like this article?</p>
        <button onClick={onClick} id="yes" className="button">Yes</button>
        <button onClick={onClick} id="no" className="button">No</button>
    </span>
);