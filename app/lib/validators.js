'use strict';
var jwt = require('jsonwebtoken');
(function() {


    module.exports = {
       
        isEmail: isEmail,
        verifyToken: verifyToken,
        division:division
    
    }

    function isEmail(email) {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
    }

    function verifyToken(req, res, next){
        const token = req.headers['x-access-token'];
        if (token) {
            var jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa"
            jwt.verify(token, jwt_secrect, function(err, result) {
                if(err){
                    res.json({
                        code: 400,
                        messaage: "invalid token"
                    })
                }else{
                    next()
                }
            })
        }else{
            res.json({
                code: 400,
                messaage: "Please provide access token"
            })
        }
    }
    function division(value){
    return (value%2)===0;

    
}

   
})();