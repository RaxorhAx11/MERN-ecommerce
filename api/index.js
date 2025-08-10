const serverless = require('serverless-http');
const app = require('../server');   // path to your Express app file
module.exports = serverless(app);