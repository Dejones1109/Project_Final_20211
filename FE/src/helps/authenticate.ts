import { store } from "../app/store";
import {getData} from "./localStorage";
function getStatusLogin (){
    return store.getState().auth.currentUser !== null;
}
function checkLogin (){
    const token = getData("user");
    console.log(token);
}
export {getStatusLogin,checkLogin};
