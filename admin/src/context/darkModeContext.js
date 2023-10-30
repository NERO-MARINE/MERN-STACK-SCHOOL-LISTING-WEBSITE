import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  darkMode: false,
};

// u can put CODES in the "darkModeReducer.js" file here. Its not compulsory you seperate it.

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
