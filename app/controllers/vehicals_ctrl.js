var vehical = require('mongoose').model('vehicals');
var mongoose = require('mongoose');
module.exports={
    vehicalType:vehicalType
}
async function vehicalType(req,res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.productId)) {
            res.json({
                code: 400,
                message: "Please enter proper objectId"
            })
        }{
            let newVehical = new vehical(req.body)
            newVehical.save().then((results) => {
                res.json({
                    code: 200,
                    msg: "vehical data saved successfully."
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