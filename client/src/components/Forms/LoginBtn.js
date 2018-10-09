import React from "react";

export const LoginBtn = ({ onclick }) => (
    <button
        id="login"
        className="button"
        onClick={onclick}
    >
        LOG IN
    </button>
);