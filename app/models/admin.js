'use strict';
let mongoose = require('mongoose');
let adminSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    
    },
    is_active: {
        type: Boolean, default: true
    },
    is_deleted: { type: Boolean, default: false },
    status: { type: Number, enum: [1, 2], default: 1 } // 1 - active, 2 - deactive
}, {
        timestamps: true
    });

module.exports = mongoose.model('admin', adminSchema);