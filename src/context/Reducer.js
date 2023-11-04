const arrayPositionMovingHandler = (prevArry, from, to) => {
  const newArray = prevArry.slice();
  if (to >= newArray.length) {
    let k = to - newArray.length + 1;
    while (k--) {
      newArray.push(undefined);
    }
  }
  newArray.splice(to, 0, newArray.splice(from, 1)[0]);
  // const updatedImages = [...prevArry];
  // const [draggedImage] = updatedImages.splice(from, 1);
  // updatedImages.splice(to, 0, draggedImage);
  return newArray;
};

const galleryReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_IMG_TOGGLE": {
      const { isSelected, id } = action.payload;
      return {
        ...state,
        imagesList: state.imagesList.map((img) =>
          img.id === id ? { ...img, isSelected: isSelected } : img
        ),
      };
    }
    case "UNSELECT_ALL_IMG": {
      return {
        ...state,
        imagesList: state.imagesList.map((img) => ({
          ...img,
          isSelected: false,
        })),
      };
    }
    case "DELETE_SELECETED_IMG": {
      return {
        ...state,
        imagesList: state.imagesList.filter((img) => !img?.isSelected),
      };
    }

    case "IMG_MOVING": {
      const movingArray = (prevArry) => {
        const oldIndex = prevArry.findIndex((item) => item.id == action.payload.activeId);
        const newIndex = prevArry.findIndex((item) => item.id == action.payload.overId);
        return arrayPositionMovingHandler(prevArry, oldIndex, newIndex);
      };
      const updateArray = movingArray([...state.imagesList])
      return {
        ...state, 
        imagesList: updateArray,
      }
    }
    case "ADD_IMG": {
      return {
        ...state,
        imagesList: [...state.imagesList, action.payload],
      };
    }
    default:
      return state;
  }
};
export default galleryReducer;
