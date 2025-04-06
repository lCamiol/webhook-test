const webhookData = require('../models/webhookData');

const getDataWebhook = async (req, res) => {
    console.log("🚀 ~ getDataWebhook ~ req:", req)
    console.log("🔍 Headers:", req.headers);
    console.log("🔍 Content-Type:", req.headers["content-type"]);
    console.log("🔍 Body:", req.body);

    let data = req.body;
    console.log("🚀 ~ getDataWebhook ~ data:", data);

    try {
        const dataToSave = new webhookData({ payload: data, contentType: req.headers["content-type"] });
        await dataToSave.save();
        res.status(201).send({ message: 'Data saved', data: dataToSave });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error saving data' });
    }
}

module.exports = {
    getDataWebhook
}