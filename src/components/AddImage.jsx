import { useRef } from "react";
import addPhotoIcon from "../assets/images/add-photo-icon.png";
import { useStateContext } from "../context/context";

const AddImage = ({ imgListLength }) => {
  const inputFile = useRef(null);
  const {
    state: { imagesList },
    dispatch,
  } = useStateContext();
  const onButtonClick = () => {
    inputFile.current.click();
  };

  function handleFileSelect(file) {
    const newImageObj = {
      id: imagesList.length + 1,
      img: URL.createObjectURL(file),
      isSelected: false,
    };
    if (newImageObj.id > 0) {
      dispatch({
        type: "ADD_IMG",
        payload: newImageObj,
      });
    }
  }
  const addImageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: imgListLength === 0 ? "295px" : "140px",
    width: imgListLength === 0 ? "295px" : "140px",
    cursor: "pointer",
    outline: "2px dotted rgb(203, 203, 203)",
    borderRadius: "8px",
  };

  return (
    <div style={addImageStyle} onClick={onButtonClick}>
      <div className="add_img_container">
        <img src={addPhotoIcon} alt="add images icon" />
        <p>Add Images</p>
        <input
          type="file"
          id="fileInput"
          accept={"image/png, image/jpeg, image/jpg"}
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AddImage;
