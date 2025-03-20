const { Router } = require('express');
const  { getDataWebhook } = require('../controller/webhookController');

const router = Router();

router.post('/webhook', getDataWebhook); 

module.exports = router;