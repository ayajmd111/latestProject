var electronic = require('mongoose').model('electronics');
var mongoose = require('mongoose');
module.exports={
    electronicType:electronicType
}
async function electronicType(req,res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.productId)) {
            res.json({
                code: 400,
                message: "Please enter proper objectId"
            })
        }{
            let newElectronic = new electronic(req.body)
            newElectronic.save().then((results) => {
                res.json({
                    code: 200,
                    msg: "electronic data saved successfully."
                })

            }).catch((err) => {
                res.json({
                    code:400,
                    message:"Something Went wrong,Please Try again later"
                })

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