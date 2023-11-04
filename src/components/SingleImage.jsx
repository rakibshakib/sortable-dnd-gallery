import { forwardRef, useState } from "react";
import { useStateContext } from "../context/context";

const SingleImage = forwardRef(
  (
    props, // id, isDragging,
    ref
  ) => {
    const {
      style,
      faded,
      index,
      images,
      withOpacity,
      isDraggingOverlay,
      ...rest
    } = props;
    const { dispatch } = useStateContext();

    //   const inlineStyles = {
    //     gridRowStart: index === 0 ? "span 2" : null,
    //     gridColumnStart: index === 0 ? "span 2" : null,
    //     //   opacity: withOpacity ? "0.5" : "1",
    //     opacity: faded ? "0.2" : "1",

    //     //   transformOrigin: "50% 50%",
    //     transformOrigin: "0 0",
    //     height: index === 0 ? "290px" : "140px",
    //     width: index === 0 ? "290px" : "140px",
    //     //   borderRadius: "10px",
    //     cursor: isDragging ? "grabbing" : "grab",
    //     backgroundColor: "#ffffff",
    //     //   display: "flex",
    //     //   justifyContent: "center",
    //     //   alignItems: "center",
    //     //   color: "black",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     borderRadius: "8px",
    //     backgroundImage: `url("${images?.img}")`,
    //     //   boxShadow: isDragging
    //     //     ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
    //     //     : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
    //     //   transform: isDragging ? "scale(1.05)" : "scale(1)",
    //     ...style,
    //   };

    const [isDraggableContainerHover, setDraggableContainerHover] =
      useState(false);
    const [isCheckBoxHover, setCheckBoxHover] = useState(false);

    const draggableContainerStyle = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      outline: "1px solid rgb(203, 203, 203)",
      height: index === 0 ? "295px" : "140px",
      width: index === 0 ? "295px" : "140px",
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      cursor: withOpacity ? "move !important" : "pointer !important",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      position: "relative",
      ...style,
    };
    const bgImageStyle = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      width: "100%",
      height: "100%",
      backgroundImage: `url("${images?.img}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "8px",
    };
    const checkBoxOpacity = {
      opacity: withOpacity
        ? 0
        : isDraggableContainerHover || images?.isSelected
        ? 1
        : 0,
    };
    // console.log({ checkBoxOpacity });

    const handleMouseEnter = (isContainer = false) => {
      if (isContainer) {
        setDraggableContainerHover(true);
      } else {
        setCheckBoxHover(true);
      }
    };

    const handleMouseLeave = (isContainer = false) => {
      if (isContainer) {
        setDraggableContainerHover(true);
      } else {
        setCheckBoxHover(true);
      }
    };
    // console.log({ isDraggableContainerHover, isDragging });
    // console.log({ propos: props, withOpacity });
    // console.log({isDraggingOverlay})
    console.log({withOpacity})
    return (
      <div
        ref={ref}
        style={draggableContainerStyle}
        onMouseEnter={() => handleMouseEnter(true)}
        onMouseLeave={() => handleMouseLeave(true)}
      >
        <input
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          style={checkBoxOpacity}
          className="imageCheckBox"
          type="checkbox"
          name="isSelected"
          id="isSelected"
          value={images?.isSelected}
          onChange={(e) => {
            dispatch({
              type: "SELECT_IMG_TOGGLE",
              payload: {
                id: images?.id,
                isSelected: e.target.checked,
              },
            });
          }}
        />
        <div
          className={
            isCheckBoxHover ? "boxContainer" :
            images?.isSelected ? "boxContainerSelected" : "boxContainer"
          }
          style={bgImageStyle}
          {...rest}
        />
      </div>
    );
  }
);

export default SingleImage;
