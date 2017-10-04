/**
 * Created by davidsantamaria on 3/10/17.
 */

var client = require('./../elasticsearch.config.js');

var service = {};

service.getRealTimeLogLevelService = getRealTimeLogLevelService;
service.getTopHostNames = getTopHostNames;
service.countByService = countByService;
module.exports = service;



function getRealTimeLogLevelService() {

    var from = new Date();
    var to = new Date(new Date().setHours(from.getHours()+1));
       var promise = new Promise(function (resolve, reject){
           client.search({
               index : 'logs',
               type : 'flume',
               body : {
                   "aggs" : {
                       "loglevel" : {
                           "terms" : {
                               "field" : "level",
                               "min_doc_count" : 0
                           },
                           "aggs" : {
                               "service_level_interval" : {
                                   "date_histogram" : {
                                       "field" : "datetime",
                                       "interval" : "1m",
                                       "format" : "yyyy-MM-dd HH:mm:ss",
                                       "min_doc_count" : 0,
                                       "extended_bounds" : {
                                           "min" : from.secondFormated(),
                                           "max" : to.secondFormated()

                                       }
                                   }
                               }
                           }
                       }
                   },
                   "query" : {
                       "range" : {
                           "datetime" : {
                               "gte" : from.hourFormated(),
                               "format" : "yyyy-MM-dd HH"
                           }
                       }
                   }
               }
           }, function(err, response) {
               resolve(response);
           });
       });
    return promise;
}


function getTopHostNames() {
    var from = new Date().setHours(new Date().getHours() - 6);
    from =  new Date(from).secondFormated();
    var to = new Date().secondFormated();
    var promise = new Promise (function (resolve, reject){
        client.search({
            index : 'logs',
            type : 'flume',
            body : {
                "aggs" : {
                    "loglevel" : {
                        "terms" : {
                            "field" : "level"
                        },
                        "aggs" : {
                            "hostname" : {
                                "terms" : {
                                    "field" : "hostname"
                                }
                            }
                        }
                    }
                },

                "query" : {
                    "range" : {
                        "datetime" : {
                            "gte" : from,
                            "lte" : to,
                            "format" : "yyyy-MM-dd HH:mm:ss"
                        }
                    }
                }
            }
        }, function(err, response) {
            setTimeout(() => { resolve(response);}, 5000);
        });
    });
    return promise;
};

function countByService(){


    function callback(service){
        var promise = new Promise (function (resolve, reject){
            client.count({
                index : 'logs',
                type : service
            }, function(err, response) {
                resolve(response);
            });
        });
        return promise;
    }

    return Promise.all([callback('flume'), callback('zookeeper')]);
}

Date.prototype.hourFormated = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    var HH = this.getHours();
    return [ this.getFullYear(), '-',
        (mm > 9 ? '' : '0') + mm, '-',
        (dd > 9 ? '' : '0') + dd, ' ',
        (HH > 9 ? '' : '0') + HH
    ].join('');
};

Date.prototype.secondFormated = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    var HH = this.getHours();
    var MM = this.getMinutes();
    var ss = this.getSeconds();
    return [ this.getFullYear(), '-',
        (mm > 9 ? '' : '0') + mm, '-',
        (dd > 9 ? '' : '0') + dd, ' ',
        (HH > 9 ? '' : '0') + HH, ':00:00',
    ].join('');
};