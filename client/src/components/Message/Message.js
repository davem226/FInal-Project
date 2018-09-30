import React from "react";
import "./Message.css";

const Message = ({ id, text }) => <div id={id} className="message">{text}</div>
export default Message;