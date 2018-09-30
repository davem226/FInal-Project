import React from "react";
import "./Form.css";

export const Button = ({ id, onClick, text }) => <button id={id} onClick={onClick}>{text}</button>