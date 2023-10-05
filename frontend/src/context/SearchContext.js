import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  nigerianState: '',
  nigerianLga: '',
  category: '',
};

const searchReducer = (state, action) =>{
    switch(action.type){
        case 'NEW_SEARCH':
            return action.payload;
        case 'RESET_SEARCH':
            return INITIAL_STATE;
        default:
            return state
    }
}

export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        nigerianState: state.nigerianState,
        nigerianLga: state.nigerianLga,
        category: state.category,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
