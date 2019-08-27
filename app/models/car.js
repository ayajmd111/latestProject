'use strict';
let mongoose = require('mongoose');
var Schema = mongoose.Schema;
let carSchema = new mongoose.Schema({
    carName: {
        type: String,
    },
    model: {
        type: String,
    },
    price:{
        type: String
    },
    carId: { type: Schema.Types.ObjectId, ref: 'vehicals' },

    is_deleted: { type: Boolean, default: false },
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 - active, 2 - deactive
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('cars', carSchema);