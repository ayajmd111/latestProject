'use strict';
let mongoose = require('mongoose');
var Schema = mongoose.Schema;
let electronicSchema = new mongoose.Schema({
    electronicType: {
        type: String,
    },
    productId: { type: Schema.Types.ObjectId, ref: 'products' },

    is_deleted: { type: Boolean, default: false },
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 - active, 2 - deactive
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('electronics', electronicSchema);