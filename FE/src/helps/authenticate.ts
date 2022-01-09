import { store } from "../app/store";
import {getData} from "./localStorage";
function getStatusLogin (){
    return store.getState().auth.currentUser !== null || store.getState().admin.currentUser !== null;
}
function getIdUser (){
    // @ts-ignore
    return 1;
}
async function checkLogin (){
    const token =await getData("user");
    console.log(token);
}
async function getUser (){
    const token = await getData("admin" || "user");
    console.log("t",token);
    return token
}
export {getStatusLogin,checkLogin,getUser,getIdUser};
