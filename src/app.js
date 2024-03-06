const express = require('express');
const dotenv = require('dotenv');

const { PORT } = require('./config/config');


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// const sampleRoutes = require('./routes/sampleRoutes');
const filteredResponsesRoute = require('./routes/filteredResponses');
// app.use('/api/sample', sampleRoutes);
app.use('/api/', filteredResponsesRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});