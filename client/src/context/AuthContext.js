import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user:JSON.parse(localStorage.getItem("user")) || null,
  user:{
_id: "6216ac8c910245720c505cf5",
username:"jane",
email:"jane@gmail.com",
password:"$2b$10$dc42yggYRDQcdGjym5pPnuW6baHAd6csn4NeYChqHQVhetcvyhEy2",
profilePicture:"",
coverPicture:"",
followers:[],
followings:[],
isAdmin:true,
  },
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

