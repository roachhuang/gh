// set NODE_ENV environment variable at cmd prompt. e.g., set NODE_ENV = development
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
