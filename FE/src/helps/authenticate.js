import { store } from "../app/store";
import {getData} from "./localStorage";
import base64 from 'react-native-base64';
import {userLogin} from "../app/service/user/userSlice";
import {adminLogin} from "../app/service/admin/adminSlice";
function getStatusLogin (){
    if(store.getState().auth.currentUser !== null){
        return 1;
    }
    if(store.getState().admin.currentUser !== null){
        return 2;
    }

}
function getIdUser (){
    // @ts-ignore
    return 1;
}
async function checkLogin (userCheck, dispatch, auth){
    let token = await getData( "user");
    if(token === null){
        token = await getData( "admin");
    }
    if(userCheck && token ){
        // @ts-ignore
        await dispatch(userLogin(userCheck));
        // @ts-ignore
        await dispatch(adminLogin(userCheck));
    }
    if(store.getState().admin.code === 200 ||store.getState().auth.code === 200 ){
        getData("user").then(r =>auth.setUser(r));
        getData("admin").then(r =>auth.setAdmin(r));
    }
}
async function getUser (){
    let token = await getData( "user");
    if(token === null){
        token = await getData( "admin");
    }
    if(token !== null){
        const encode = base64.decode(token).split(".");
        return  {
            username:encode[1],
            password:encode[2],
        };
    }
    return null
}
export {getStatusLogin,checkLogin,getUser,getIdUser};
