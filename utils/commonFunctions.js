const moment = require("moment");

const convertArrayOfObjectsToObject = (arrayOfObjects,key)=>{
  let result = arrayOfObjects.reduce((accumultor, obj)=>{
    if(obj && obj[key]){
      accumultor[obj[key]]=obj;
      return accumultor;
    }
    else{
      return accumultor;
    }
  },{})
  console.log("result",result)
  return result;
}

const addTimeStamps = (obj)=>{
  let momentObj = moment();
  obj.createdAt = momentObj.toDate();
  obj.createdAtUnixTime = momentObj.valueOf();
  obj.createdAtStr = momentObj.format()
  return obj;
}

exports.convertArrayOfObjectsToObject = convertArrayOfObjectsToObject;
exports.addTimeStamps = addTimeStamps;