import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, fetchUsersReducer } from "./reducers/usersReducers";


const reducer = combineReducers({
  fetchUsersData: fetchUsersReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.stringify(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userInfo: userInfoFromStorage },
  fetchUsersData: {}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;