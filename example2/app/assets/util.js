function insertMissingLogData (data){
	var keys = ['error', 'info', 'warn'];
	var contains = false;
	for (var k in keys){
		contains = false;
		jQuery.each(data, function(i, loglevel) {
			if(keys[k] == loglevel.key){
				contains = true;
				return;
			}
				
		});
		if (!contains) data.push({ 'key': keys[k], 'doc_count': 0});
	}

	return data;
}

function insertMissingData(data) {
    var keys = [ 'error', 'info', 'warn' ];
    var contains = false;
    for (var k in keys) {
        contains = false;
        jQuery.each(data, function(i, loglevel) {
            if (keys[k] == loglevel.key) {
                contains = true;
                return;
            }

        });
        if (!contains) data.push({
            'key' : keys[k],
            'hostname' : {
                'buckets' : []
            }
        });
    }

    return data;
}

function generateBarChart(values, hostnames, loglevel) {
    var c3ChartDefaults = $().c3ChartDefaults();


    var categories = hostnames;
    var columnsData = [ values ];

    var verticalBarChartConfig = $().c3ChartDefaults().getDefaultBarConfig(categories);
    verticalBarChartConfig.bindto = '#barchart-error';
    verticalBarChartConfig.axis = {
        x : {
            categories : categories,
            type : 'category'
        }
    };
    verticalBarChartConfig.color = {
        pattern : [ "#FC4A1A", "#D1D1D1" ]
    };
    verticalBarChartConfig.size = {
        height : 275
    }
    verticalBarChartConfig.data = {
        type : 'bar',
        columns : columnsData
    };
    var verticalBarChart = c3.generate(verticalBarChartConfig);

}

function generateLineChart (id, data){
	var splineChartConfig = $().c3ChartDefaults().getDefaultLineConfig();
	  splineChartConfig.bindto = '#'+id;

	  var xaxis = function (date){
		  var ini = new Date(new Date().setMinutes(0));
		  var fin = new Date(new Date().setHours(ini.getHours()+1));
		  fin = new Date(fin.setMinutes(0));
		  var dates = ['x'];
		  do{
			  var aux = new Date(ini.setMinutes(ini.getMinutes()+1));
			  dates.push(new Date(aux));
			  
		  }while(aux<fin);
		  
		  return dates;
	  }
	  var dates = xaxis(new Date());
	  data.push(dates);
	  splineChartConfig.data = {
			  	x: 'x',
			    columns: data,
			    type: 'spline'
			  };
	  
	  splineChartConfig.axis= {
		        x: {
		            type: 'timeseries',
		            tick: {
		                format: '%H:%M'
		            },
		            
		            max: dates[61]
		        },
		        y: {
		            min: 0
		          }
		    }
	 
	  splineChartConfig.color = {
				pattern : [ '#FC4A1A', '#4ABDAC', '#F7B733', '#B37D43', '#E24E42', '#E9B000', '#008F95', '#EB6E80',"#3f9c35","#EC7A08" ,'#07889b','#e37222', '#CD5360']
			};
	  c3.generate(splineChartConfig);
}

