const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8008,
    API_KEY: process.env.API_KEY || '',
};