"use client";

import { useState } from "react";

const BetterButton = ({ text, href }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <text
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        window.open(href);
      }}
      style={{
        zIndex: "11",
        textDecorationLine: isHover ? "underline" : "none",
        textUnderlineOffset: "5px",
        color: "white",
        position: "absolute",
        cursor: isHover ? "pointer" : "default",
        right: "0px",
        marginRight: "30px",
        marginTop: "30px",
        color: "#5a5757",
        fontSize: "24px",
      }}
    >
      {text}
    </text>
  );
};

export default BetterButton;
