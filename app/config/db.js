var mongoose =require('mongoose');
 require('../models/user');
 require('../models/products');
 require('../models/electronics');
 require('../models/vehicals');
 require('../models/mobile');
 require('../models/car');
 require('../models/admin');
mongoose.connect('mongodb://localhost:27017/myProject').then(() => {
    console.log("Database connected successfully");
    
   }).catch((error) => {
       console.log("Error in connecting to Database");
   });
