const mongoose = require('mongoose');

const DemandSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    received: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('demand', DemandSchema);