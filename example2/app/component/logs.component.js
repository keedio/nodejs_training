

'use strict';

var app = angular.module('logsComponent', [
	'ngRoute',
	'LogsService'
]);

app.component('logsComponent', {
	templateUrl : 'component/logs.template.html',
	controller : [ 'LogsService','socket',
		function (LogsService, socket) {
			var self = this;
            self.totalService1 = 0;
            self.totalService2 = 0;

            socket.on('news', function (data) {
                var flume = parseData(data);
                generateLineChart('log-linechart', [ [ 'error' ].concat(flume[0]), [ 'info' ].concat(flume[1]), [ 'warn' ].concat(flume[2]) ]);
            });


			self.getHostNames = function (){
				LogsService.GetTopHostNames().then( data => {
                    var buckets = data.aggregations.loglevel.buckets.length != 3 ? insertMissingData(data.aggregations.loglevel.buckets) : data.aggregations.loglevel.buckets;
					var total = data.hits.total;
					var values = ['data1'];
					var hostnames = [];
					jQuery.each(buckets, function(i, loglevel) {
						jQuery.each(loglevel.hostname.buckets, function(j,hostname){
							values.push(hostname.doc_count);
							hostnames.push(hostname.key);
						});
						if(loglevel.key == 'error')generateBarChart(values, hostnames, loglevel.key);
						values = ['data1'];
						hostnames = [];
                	});
				});
			};

			self.getTotalByService = function(){
				LogsService.GetTotalByService().then(data =>{
					self.totalService1 = data[0].count;
					self.totalService2 = data[1].count;
				});
			};
			function parseData(data) {
				var buckets = data.aggregations.loglevel.buckets.length != 3 ? insertMissingLogData(data.aggregations.loglevel.buckets) : data.aggregations.loglevel.buckets;
				var values = [ [ 0 ], [ 0 ], [ 0 ] ];


				jQuery.each(buckets, function(i, loglevel) {
					if (loglevel.service_level_interval != undefined && loglevel.service_level_interval.buckets != undefined) {
						jQuery.each(loglevel.service_level_interval.buckets, function(j, service_level_interval) {
							var k = loglevel.key == 'info' ? 1 : loglevel.key == 'error' ? 0 : 2

							if (j == 0)
								values[k][0] = service_level_interval.doc_count;
							else values[k].push(service_level_interval.doc_count);

						});

					}
				});

				return values;
			}

		} ]
});