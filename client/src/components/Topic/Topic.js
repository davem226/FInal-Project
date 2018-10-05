import React from "react";

const Topic = ({ onclick, topic }) => <button onClick={onclick} className="topic">{topic}</button>
export default Topic;