var cars = require('mongoose').model('cars');
var mongoose =require('mongoose')
module.exports={
carType:carType
}
async function carType(req,res){
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.carId)) {
            res.json({
                code: 400,
                message: "Please enter proper objectId"
            })
        }{
            let newCar= new cars(req.body)
            newCar.save().then((results) => {
                res.json({
                    code: 200,
                    msg: "car saved successfully."
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