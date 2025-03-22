const express = require('express');
const { dbConnection } = require('./db/mongo');
const router = require('./routes/webhook');
const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.BASE_URL || 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use('/api', router);

dbConnection();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${URL}:${PORT}`);
});
