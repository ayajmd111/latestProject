'use strict';
let mongoose = require('mongoose');
let userRegSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
        index:false,
        sparse:true
    }, lastName: {
        type: String,
        required: true,
        unique: false,
        index:false
    }, email: {
        type: String,
    },
   image: {
type:String    },
    password: {
        index: true,
        type: String,
        required: true
    },
    is_active: {
        type: Boolean, default: true
    },
    is_deleted: { type: Boolean, default: false },
    status: { type: Number, enum: [1, 2], default: 1 } // 1 - active, 2 - deactive
}, {
        timestamps: true
    });

module.exports = mongoose.model('Users', userRegSchema);