const mongoose = require('mongoose');

const CenterSchema = mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'users' 
    },
    name: {
        type: String,
        required: true
    },
    ownership: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    governorate: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('center', CenterSchema);