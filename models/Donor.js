const mongoose = require('mongoose');

const DonorSchema = mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'users' 
    },
    name: {
        type: String,
        required: true
     },
    surname: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    blood: {
        type: String,
        required: true
    },
    rhesus: {
        type: String,
        required: true
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report'
    }],
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
    infectiousDiseases: {
        type: [String],
    },
    hematologicalDiseases: {
        type: [String],
    },
    otherDiseases: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('donor', DonorSchema);