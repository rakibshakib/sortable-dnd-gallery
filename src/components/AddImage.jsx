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

  function handleFileSelect(files) {
    const newImages = [];
    files.forEach((file, index) => {
      const newImageObj = {
        img: URL.createObjectURL(file),
        id:
          imagesList.length > 0
            ? Math.max(...imagesList.map((obj) => obj.id)) + 1 + index
            : 1 + index,
        isSelected: false,
      };

      newImages.push(newImageObj);
    });
    if (newImages.length > 0) {
      dispatch({
        type: "ADD_IMG",
        payload: newImages,
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
            const files = Array.from(e.target.files);
            if (files.length > 0) {
              handleFileSelect(files);
            }
          }}
          multiple
        />
      </div>
    </div>
  );
};

export default AddImage;
