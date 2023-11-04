// import PropTypes from "prop-types";
import { useReducer } from "react";
import galleryReducer from "./Reducer";
import { initialState } from "./State";
import { StateContext } from "./context";

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
