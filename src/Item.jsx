import { forwardRef } from "react";

const Item = forwardRef(
  (
    { id, withOpacity, isDragging, style, faded, index, images, ...props },
    ref
  ) => {
    const inlineStyles = {
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      //   opacity: withOpacity ? "0.5" : "1",
      opacity: faded ? "0.2" : "1",

      //   transformOrigin: "50% 50%",
      transformOrigin: "0 0",
      height: index === 0 ? "290px" : "140px",
      width: index === 0 ? "290px" : "140px",
      //   borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   color: "black",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "8px",
      backgroundImage: `url("${images?.img}")`,
      //   boxShadow: isDragging
      //     ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
      //     : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      //   transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    const inlineStyles2 = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      // transformOrigin: "-10% -10%",
      height: index === 0 ? "290px" : "140px",
      width: index === 0 ? "290px" : "140px",
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundImage: `url("${images?.img}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles2} {...props}>
        {/* {id} */}
      </div>
    );
  }
);

export default Item;
