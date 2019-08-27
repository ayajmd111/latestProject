'use strict';
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var userRegSchema = require('mongoose').model('Users');
var validator = require('../lib/validators');
var nodemailer = require('nodemailer');

module.exports = {
    userRegister,
    userLogin,
    passwordChage,
    editProfile,
    forgetPassword,
    findUser,
    removeUser,
    nodemailertest,
    findById,
    createIndex,
    fileUpload,
    division
}
async function userRegister(req, res) {
    try {
        if (req.body.firstName && req.body.lastName && validator.isEmail(req.body.email) && req.body.password) {
            let result = await userRegSchema.findOne({ email: req.body.email.toLowerCase() });
            if (result) {
                res.json({
                    code: 400,
                    msg: "email already exits"
                })
            } else {
                bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                    let data = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    }
                    let newUser = new userRegSchema(data)
                    newUser.save().then((results) => {
                        res.json({
                            code: 200,
                            msg: "User Register successfully.",
                        })

                    }).catch((err) => {
                        console.log('err', err)
                        res.json({
                            code: 400,
                            msg: "Something went wrong during registration. Please try again later"
                        })
                    })
                })
            }
        } else {
            res.json({
                code: 400,
                msg: "please provide proper information"
            })
        }
    }
    catch{
        res.json({
            code: 500,
            msg: "Internal Server Error"
        })
    }
}
async function userLogin(req, res) {
    console.log('req.body======>', req.body)
    try {
        if (validator.isEmail(req.body.email) && req.body.password) {
            let result = await userRegSchema.findOne({ email: req.body.email })
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
                    let token = jwt.sign({ id: result._id }, jwt_secrect, {
                        expiresIn: 60 * 60 * 8 * 1
                    });
                    res.json({
                        code: 200,
                        msg: "user login successfully",
                        token: token,
                        data:result
                    })

                } else {
                    res.json({
                        code: 404,
                        msg: "wrong password"
                    })
                }
            } else {
                res.json({
                    code: 404,
                    msg: "Inavalid email address."
                })
            }
        } else {
            res.json({
                code: 400,
                message: "please provide proper information"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            code: 500,
            msg: "Internal Server Error"
        })
    }
}
async function findUser(req, res) {
    let limit = req.body.limit || 10;
    let total = await userRegSchema.count()
    if (total) {
        // var result = await userRegSchema.find({email: { '$regex': req.body.search, '$options': 'i' }}).sort({ createdAt: -1 })
        // .limit(limit);
        var result = await userRegSchema.find({}).sort({ email: -1 })

        if (result) {
            res.json({
                code: 200,
                message: "user data get successfully.",
                data: result
            })
        }

    }

}
async function createIndex(req,res){
   var limit=req.body.limit
    // var result = await userRegSchema.find({gender:{$eq:"male"}}
    // var result= await userRegSchema.find({$or:[{gender:{$eq:"male"}},{age:{$eq:"25"}}]})
    // var result = await userRegSchema.aggregate([{$group:{_id:"$gender",total:{$sum:1}}}])
    var result = await userRegSchema.find({ age: { $in: [ 25, 22 ] } })
    
    console.log(result)
            result.toArray(function(err,result){
                console.loh('result',result);
            })

    if(result){
        res.json({
            data:result
        })
    }
}
async function removeUser(req, res) {
    console.log('req.body', req.body)
    userRegSchema.remove({ _id: req.body.userId }).then((result) => {
        res.json({
            code: 200,
            msg: "user removed successfully."
        })

    }).catch((error) => {
        console.log(error)
    })

}
async function findById(req, res) {
    console.log('req.body=====>',req.body)
    userRegSchema.findById(req.body.userId).then((result) => {
        console.log('result====>',result)

        res.json({
               code:200,
               msg:"get user successfully.",
               data:result
        })
    }).catch((err) => {
     res.json({
         code:400,
         msg:"Please try again later."
     })
    })
}
async function passwordChage(req, res) {
    try {
        if (validator.isEmail(req.body.email) && req.body.oldPassword && req.body.newPassword) {
            let result = await userRegSchema.findOne({ email: req.body.email })
            if (result) {
                if (bcrypt.compareSync(req.body.oldPassword, result.password)) {
                    bcrypt.hash(req.body.newPassword, saltRounds).then((hash) => {
                        userRegSchema.findOneAndUpdate({ password: hash }).then((results) => {
                            res.json({
                                code: 200,
                                messaage: "password changed successfully"
                            })
                        })
                    })
                } else {
                    res.json({
                        code: 420,
                        message: "Password not matched"
                    })
                }
            } else {
                res.json({
                    code: 404,
                    msg: "Inavalid email address."
                })
            }
        }
        else {
            res.json({
                code: 400,
                message: "please provide proper information"
            })
        }
    } catch{
        res.json({
            code: 500,
            msg: "Internal Server Error"
        })
    }

}
async function editProfile(req, res) {
    try {
        if (mongoose.Types.ObjectId.isValid(req.body.userId)) {
            let condition = {
                $set: req.body
            }
            userRegSchema.findOneAndUpdate(condition).then((results) => {
                console.log(results)
                res.json({
                    code: 200,
                    messaage: "user dataupdated successfully"
                })

            }).catch((err) => {
                res.json({
                    code: 200,
                    messaage: "user dataupdated failed"
                })

            })
        } else {
            res.json({
                code: "400",
                message: "wrong objectId"
            })
        }
    } catch{
        res.json({
            code: 500,
            msg: "Internal Server Error"
        })
    }
}
async function nodemailertest(req, res) {
    try {
        if (validator.isEmail(req.body.email)) {
            let result = await userRegSchema.findOne({ email: req.body.email })
            if (result) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'journalapp.sdn@gmail.com',
                        pass: 'Password@rk01'
                    }
                });

                var mailOptions = {
                    from: 'journalapp.sdn@gmail.com',
                    to: result.email,
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    console.log('mailoption', mailOptions)
                    if (error) {
                        console.log('error====>', error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            } else {
                res.json({
                    code: 404,
                    msg: "Inavalid email address."
                })
            }
        } else {
            res.json({
                code: 400,
                msg: "Please enter properinformation."
            })
        }
    } catch{
        res.json({
            code: 400,
            msg: "something went wrong."
        })
    }

}
async function forgetPassword(req, res) {

}
function fileUpload(req,res){
    console.log('req.body====>',req.body)
    console.log('req.body====>',req.file)
    // let image ={
    //     fileName:req.body.filename
    // }
    let condition={
        image:req.body.path
    }
    console.log('req.params.id===>',req.params.id)
        userRegSchema.updateOne({ $set: req.params.id }, condition, { new: true },function (err, results) {
            if (results) {
                res.json({
                    code: 200,
                    messaage: "userdata updated successfully"
                })
            } else {
                res.json({
                    code: 400,
                    messaage: "userdata updated unsuccessfullly"
                })
            }
        })

   
  
    // upload(req, res,  function (err,results) {
    //     if(results){
    //         res.json({
    //             code:200,
    //             message:"file uploaded successfully"
    //         })
    //     }
    //   }) 
}
function division(value){
    return (value%2)===0;

    
}


// db.users.find({},{"firstName":1,"_id":0}).limit(6).skip(2)
// db.users.find({age:{$lte:"25"}},{"firstName":1,"_id":0}).pretty()
// db.users.find({},{"firstName":1,"_id":0}).sort({"firstName":1})
// db.users.aggregate([{$group:{_id:"$gender",total:{$sum:1}}}])
// db.users.aggregate([{$group:{_id:"$gender",maxAge:{$min:"$age"}}}])