require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./server/routes');

const PORT = process.env.PORT || "4000";

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();
