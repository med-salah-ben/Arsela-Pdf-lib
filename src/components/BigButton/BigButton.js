import React from "react";
import { primary45 } from "../../utils/colors";
import useHover from "../../hooks/useHover";

export function BigButton({
  title,
  onClick,
  customFillColor,
  style,
  id,
  small,
  disabled,
  logo
}) {
  const [hoverRef, isHovered] = useHover();

  let fillColor = customFillColor || primary45;


  if (disabled) {
    fillColor = "#ddd";
  }

  const styles = {
    container: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "137px",
      height: "40px",
      backgroundColor: "#5569F7",
      color: "white",
      borderRadius: 7,
      boxShadow: "inset 0px 0px 15px #FFFFFF91",
      padding: small ? "2px 4px" : "6px 8px",
      fontSize: small ? 14 : null,
      border: `1px solid ${fillColor}`,
      cursor: !disabled ? "pointer" : null,
      userSelect: "none",
      boxSizing: "border-box",
      marginLeft:title==="Text" ? "80px" : title==="Image" ? "80px" :title==="Export" ? "70%": 0 ,
    },
    logo:{
      width:"20px",
      color:"white",
      marginRight:"10px"
    }
  };

  return (
    <div
      id={id}
      ref={hoverRef}
      style={{ ...styles.container, ...style }}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      {!logo ? <></> : <img src={logo} style={{ ...styles.logo, ...style }}  alt="logo" />} {title}
    </div>
  );
}
