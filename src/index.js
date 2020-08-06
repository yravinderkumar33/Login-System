const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const mountApp = require('./routes');
const path = require('path');

dotenv.config();

const db = require('./helpers/dbConnection');

db.on('error', err => {
    console.log(err);
    process.exit(1);
});

db.once('open', () => {
    console.log('Connected to the DB...');
    app.use(morgan('dev'));
    app.use(express.json());
    mountApp(app);
});


process.on('unhandledRejection', (reason, p) => console.log('Unhandled Rejection', p, reason));
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception', err)
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})