const async = require("async")
const mongodb = require("../mongodb");
const {ObjectId} = require("mongodb")
const jwt = require("jsonwebtoken")
const moment = require("moment")


const signup = (req, callback)=>{
    let reqBody = req.body;
    let userId = new ObjectId();
    let userInfo = {
        firstName:"",
        lastName:"",
        email:"",
        avatarInfo:{},
        _id:userId,
        userId:userId.toHexString()
    }    
    if(reqBody.email){
        async.waterfall([
            function(triggerCallback){
                mongodb.user.findOne({email:userInfo.email},function(err, response){
                    if(err){
                        triggerCallback(true,{
                            status:"error",
                            message:"Error occurred while fetching user data",
                            error:err
                        })
                    }
                    else{
                        if(response){
                            triggerCallback(true,{
                                status:"error",
                                message:"User exists with the given email. Please Login"
                            })
                        }
                        else{
                            triggerCallback(null,{})
                        }
                    }
                })
            },
            function(prevResponse, triggerCallback){
                Object.assign(userInfo,reqBody);
                mongodb.user.insertOne(userInfo,function(err, result){
                    if(err){
                        triggerCallback(true,{
                            status:"error",
                            message:"Error occurred while signup. Please try again",
                            error:err
                        })
                    }
                    else{
                        triggerCallback(null,{
                            status:"success",
                            message:"You are successfully registered. Now you can explore the app"
                        })
                    }
                })
            }
          ],
          function(err, result){
            callback(err, result)
        })
    }
    else{
        callback(true,{
            status:"error",
            message:"Please provide valid details"
        })
        return;
    }
}

const login = (req, callback)=>{
    let reqBody = req.body;
    let criteria = {};
    if(reqBody.email){
        console.log("reqBody",req.body);
        async.waterfall([
            function(triggerCallback){
                criteria["email"] = reqBody.email;
                mongodb.user.findOne(criteria,function(err, response){
                    if(err){
                        triggerCallback(true,{
                            status:"error",
                            message:"Error occurred while fetching user data",
                            error:err
                        })
                    }
                    else{
                        if(response && response.email){
                            triggerCallback(null, response)
                        }
                        else{
                            triggerCallback(true,{
                                status:"error",
                                message:"User record not found for the given email. Please register"
                            })
                        }
                    }
                })
            },
            function(userData, triggerCallback){
                let minimalUserInfo = JSON.stringify({
                    userId:userData.userId || "",
                    createdAtUnixTime:moment().valueOf()
                })
                const token = jwt.sign(minimalUserInfo,process.env.SECRET_KEY)
                triggerCallback(null,{
                    status:"success",
                    message:"Verification completed.Please explore the app",
                    token:token,
                    userData:{
                        userId:userData.userId || "",
                        avatarInfo:userData.avatarInfo || "",
                        firstName:userData.firstName || "",
                        lastName:userData.lastName || ""
                    }
                })
            }
        ],
        function(err, result){
            callback(err, result)
        }
    )
    }
    else{
        callback(true,{
            status:"error",
            message:"Please provide valid details"
        })
    }
}

exports.signup = signup;
exports.login = login;
