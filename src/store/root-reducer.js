import {combineReducers} from 'redux';
import {appData} from "./app-data/app-data";
import {user} from "./user/user";
import {appProcess} from "./app-process/app-process";

export const NameSpace = {
  DATA: `DATA`,
  PROCESS: `PROCESS`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.USER]: user,
  [NameSpace.PROCESS]: appProcess,
});
