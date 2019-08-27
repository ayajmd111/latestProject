var product = require('mongoose').model('product');
module.exports={
    productType:productType
}
async function productType(req,res){
    try {
        let newProducts = new product(req.body)
        newProducts.save().then((result) => {
            res.json({
                code: 200,
                msg: "product saved successfully."
            })

        }).catch((err) => {
            res.json({
                code: 401,
                msg: "something went wrong,During save Producttype."
            })
        })

    } catch{
        res.json({
            code: 400,
            msg: "something went occur."
        })
    }
}