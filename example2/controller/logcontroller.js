
var express = require('express'),
    router = express.Router(),
    services = require('../services/logservice'),
    connections =[],
    POLLING_INTERVAL = 5000;

router.get('/getTopHostNames', getTopHostNames);
router.get('/countByService', countByService);

module.exports.respond = respond;
module.exports.router = router;

function respond(args){
    if(args) connections = args;
    services.getRealTimeLogLevelService()
        .then(function(data) {
            if (data){
                setTimeout(respond, POLLING_INTERVAL);
                connections.forEach(function(tmpSocket) {
                    tmpSocket.volatile.emit('news', data);
                });
            }

        })
        .catch(function(err) {
            console.log(err);
        });
}

function getTopHostNames(req, res){

    services.getTopHostNames()
        .then(function(data) {
            if (data)
                res.send(data);
            else
                res.sendStatus(404);

        })
        .catch(function(err) {
            res.status(400).send(err);
        });

}

function countByService(req, res){

    services.countByService()
        .then(function(data) {
            if (data)
                res.send(data);
            else
                res.sendStatus(404);

        })
        .catch(function(err) {
            res.status(400).send(err);
        });

}




