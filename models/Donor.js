const mongoose = require('mongoose');

const DonorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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
    donations: [
        {
            governorate: {
                type: String,
                // required: true
            },
            center: {
                type: String,
                // required: true
            },
            date: {
                type: String,
                required: true
            },
            after: {
                type: String
            },
            next: {
                type: String,
                required: true
            }
        }
    ],
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