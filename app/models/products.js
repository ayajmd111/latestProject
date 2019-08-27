'use strict';
let mongoose = require('mongoose');
let productSchema = new mongoose.Schema({
    productType: {
        type: String,
    },
    is_deleted: { type: Boolean, default: false },
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 - active, 2 - deactive
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('product', productSchema);