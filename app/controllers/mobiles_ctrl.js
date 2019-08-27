var mobile = require('mongoose').model('mobile');
var mongoose =require('mongoose')
module.exports={
mobileType:mobileType
}
async function mobileType(req,res){
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.mobileId)) {
            res.json({
                code: 400,
                message: "Please enter proper objectId"
            })
        }{
            let newMobile= new mobile(req.body)
            newMobile.save().then((results) => {
                res.json({
                    code: 200,
                    msg: "mobile saved successfully."
                })

            }).catch((err) => {

            })
        }
    }catch(err){
        console.log(err)
        res.json({
            code: 400,
            msg: "something went occur."
        })
    }
}