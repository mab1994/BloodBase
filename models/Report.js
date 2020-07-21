const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    donor: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'donor' 
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'center' 
     },
    demand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'demand' 
    },
    freeDonation: {
        type: Boolean,
     },
    isAccepted: {
        type: Boolean,
        required: true
     },
    isUsed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('report', ReportSchema);