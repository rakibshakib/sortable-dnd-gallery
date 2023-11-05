import { forwardRef, useState } from "react";
import { useStateContext } from "../context/context";

const SingleImage = forwardRef((props, ref) => {
  const {
    style,
    faded,
    index,
    images,
    withOpacity,
    someoneIsDragging,
    ...rest
  } = props;
  const { dispatch } = useStateContext();

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
    width: "100%",
    height: "100%",
    backgroundImage: `url("${images?.img}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
  };
  const checkBoxOpacity = {
    opacity: isDraggableContainerHover || images?.isSelected ? 1 : 0,
  };

  const handleMouseEnter = (isContainer = false) => {
    if (isContainer) {
      setDraggableContainerHover(true);
    } else {
      setCheckBoxHover(true);
    }
  };

  const handleMouseLeave = (isContainer = false) => {
    if (isContainer) {
      setDraggableContainerHover(false);
    } else {
      setCheckBoxHover(false);
    }
  };

  let containerClassName = "";
  if (someoneIsDragging) {
    containerClassName = "";
  } else if (isCheckBoxHover && !images?.isSelected) {
    containerClassName = "checkBoxHover";
  } else {
    containerClassName = images?.isSelected
      ? "boxContainerSelected"
      : "boxContainer";
  }

  return (
    <div
      ref={ref}
      style={draggableContainerStyle}
      onMouseEnter={() => handleMouseEnter(true)}
      onMouseLeave={() => handleMouseLeave(true)}
    >
      {someoneIsDragging ? (
        <></>
      ) : (
        <input
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          style={checkBoxOpacity}
          className="imageCheckBox"
          type="checkbox"
          name="isSelected"
          id="isSelected"
          value={images?.isSelected}
          checked={images?.isSelected}
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
      )}
      <div className={containerClassName} style={bgImageStyle} {...rest} />
    </div>
  );
});

export default SingleImage;
