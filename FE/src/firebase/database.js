import {database } from './config';
class Database {
    timeStamp (date){
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime +' | '+ date.getDate()+ '/' + (date.getMonth()+ 1) + '/'+ + date.getFullYear() ;
    }
    // set data single
    async send (path, data){
        try {
            await  database.ref(path).set(data);
        }
        catch(e){
            return 0;
        }
    }
    // get data
    async listen (path, type,action){
        try {
            return await database.ref(path).orderByKey().limitToLast(30).on(type,action);
        }
        catch(e){
            alert(e);
            return 0;
        }


    }
    // listen 1 value at last
    async listenLast (path, type,action){
        try {
            return await database.ref(path).orderByKey().limitToLast(1).on(type,action);
        }
        catch(e){
            alert(e);
            return 0;
        }


    }
    // add data and key
    async push (path,data,){
        try {
            await database.ref(path).push(data).then((snap)=>{
                    const key = snap.key;
                    this.send (`${path}/${key}/key`, key
                    );
                }
            );
        }
        catch(e){
            alert(e);
            return 0;
        }
    }
    // update base on key
    async update  (path,key,data){
        try {
            await this.send(`${path}/${key}`, data
            );
        }
        catch(e){
            alert('error');
            return 0;
        }

    }
    // update 1 object
    async update_pro (path,data){
        try {
            await database.ref(path).update(data);
        }
        catch(e){
            alert(e);
            return 0;
        }
    }
}
export default new  Database();
