
function check  (data:Array<any>):number{
    let flag:number =-1 ;
    let arrStatus:Array<string> =['fulfilled'];
    data.forEach(item=>{
        arrStatus.push(item.status);
    })
    flag = arrStatus.every((val)=>val === arrStatus[0]) ? 1 :0;
    return flag;
}
export {check};
