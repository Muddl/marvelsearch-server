require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Route Import
const searchRoutes = require('./routes/search-routes');

const app = express();

const corsConfig = {
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept']
};

app.use(cors(corsConfig));

app.use(express.json());

// Route Bindings
app.use('/v1/api/search/', searchRoutes);

app.use((error, req, res, next) => {
    if (req.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error has occured!" });
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});