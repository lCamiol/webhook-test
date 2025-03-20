const webhookData = require('../models/webhookData');

const getDataWebhook = async (req, res) => {
    const data = req.body;
    console.log("🚀 ~ getDataWebhook ~ data:", data);
    try {
        const dataToSave = new webhookData({payload: data});
        await dataToSave.save();
        res.status (201).send({message: 'Data saved', data: dataToSave});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error saving data'});
    }
}

module.exports = {
    getDataWebhook
}