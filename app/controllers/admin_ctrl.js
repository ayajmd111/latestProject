'use strict';
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var admin = require('mongoose').model('admin');
var validator = require('../lib/validators');

module.exports = {
    adminLogin
   
}
async function adminLogin(req, res) {
    console.log('req.body======>',req.body)
    try {
        if (validator.isEmail(req.body.email) && req.body.password) {
            let result = await admin.findOne({ email: req.body.email })
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
                    let token = jwt.sign({ id: result._id }, jwt_secrect, {
                        expiresIn: 60 * 60 * 8 * 1
                    });
                    res.json({
                        code: 200,
                        msg: "admin login successfully",
                        token: token
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

// function division(value){
//     return (value%2)===0;

    
// }