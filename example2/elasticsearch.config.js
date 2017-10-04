var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'elastic:changeme@localhost:9200'
});


module.exports = client;