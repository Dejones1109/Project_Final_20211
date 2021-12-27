function check  (data:Array<any>):number{
    let flag:number =-1 ;
    data.forEach(item =>{
        if(item.status === "pending" ){
            flag = -1;
        }
        else if(item.status === "rejected"){
            flag = 0;
        }
        else {
            flag= 1;
        }
    })
    return flag;
}
export {check};
