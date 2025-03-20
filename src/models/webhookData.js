const mongoose = require('mongoose');

const webhookDataSchema = new mongoose.Schema({
    payload: {
        type: Object,
        required: true
    },
    receiveAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WebhookData', webhookDataSchema);