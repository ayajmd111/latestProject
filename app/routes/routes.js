'use strict';
var admin = require('../controllers/admin_ctrl')
var user = require('../controllers/user_ctrl');
var product = require('../controllers/products_ctrl');
var electronic = require('../controllers/electronics_ctrl');
var vehical = require('../controllers/vehicals_ctrl');
var mobile = require('../controllers/mobiles_ctrl');
var car = require('../controllers/car_ctrl')
var file=require('../controllers/file_ctrl')
var multer = require('multer')
var upload = multer({ dest: './uploads' })
var validator = require('../lib/validators')

module.exports = function (app) {
    app.post('/api/userRegister', user.userRegister);
    app.post('/api/userLogin', user.userLogin);
    app.post('/api/nodemailer', user.nodemailertest);
    app.get('/api/findUser',user.findUser);
    app.post('/api/passwordChange', validator.verifyToken, user.passwordChage);
    app.post('/api/editProfile', validator.verifyToken, user.editProfile);
    app.post('/api/forgetPassword', user.forgetPassword);
    app.post('/api/saveProduct', product.productType);
    app.post('/api/electronicType', electronic.electronicType);
    app.post('/api/vehicalType', vehical.vehicalType);
    app.post('/api/mobileType', mobile.mobileType);
    app.post('/api/carType', car.carType)
    app.post('/api/adminLogin', admin.adminLogin);
    app.post('/api/removeUser',user.removeUser);
    app.post('/api/findUserById',user.findById);
    app.post('/api/createIndex',user.createIndex)
    app.post('/api/fileUpload/:id',upload.single('profileimage'),user.fileUpload)
    // app.get('/api/fileread',file.info)
    // app.get('/api/findUser', (req, res, next) => {
    //     if (req.query.key == '78942ef2c1c98bf10fca09c808d718 fa3734703e') {
    //         next();
    //     } else {
    //         res.status(401).send('You shall not pass!');

    //     }
    // }, user.findUser);


}