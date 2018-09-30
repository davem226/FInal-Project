import React from "react";
import "./Container.css";

const Container = ({ id, children }) => <div id={id} className="container">{children}</div>
export default Container;