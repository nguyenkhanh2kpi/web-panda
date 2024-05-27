
import {
    legacy_createStore,
    combineReducers,
    compose,
    applyMiddleware,
  } from "redux";
import thunk from "redux-thunk";
import { Authreducer } from "./Auth/auth.reducer";
import {JobReducer} from "./Job-posting/Reducer";
import { JobDetailReducer } from "./JobDetail/Reducer";
import {RoomReducer} from "./Room/Reducer";
import {RoomIdJobReducer} from "./Room/Reducer";
import {InterviewerReducer} from "./Interviewer/Reducer";
import {UserInfoReducer} from "./UserInfo/Reducer";
import {UserManageReducer} from "./UserManage/Reducer";
import { FileReducer } from "./SendFile/Reducer";
const rootReducer = combineReducers({
    AuthManager: Authreducer,
    job:JobReducer,
    jobDetail:JobDetailReducer,
    room:RoomReducer,
    interviewer:InterviewerReducer,
    userInfo:UserInfoReducer,
    allUser:UserManageReducer,
    roomIdJob:RoomIdJobReducer,
    File:FileReducer
  });
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  export const store = legacy_createStore(
    rootReducer,
    composer(applyMiddleware(thunk))
  );
