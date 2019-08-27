'use strict';
let mongoose = require('mongoose');
var Schema = mongoose.Schema;
let mobileSchema = new mongoose.Schema({
    mobileName: {
        type: String,
    },
    model: {
        type: String,
    },
    price:{
        type: String
    },
    mobileId: { type: Schema.Types.ObjectId, ref: 'electronics' },

    is_deleted: { type: Boolean, default: false },
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 - active, 2 - deactive
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('mobile', mobileSchema);