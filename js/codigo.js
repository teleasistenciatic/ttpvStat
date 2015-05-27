$(document).ready(function() {
		
	$.ajax({
		url: "http://10.0.0.71/estadisticas/php/data.php",
		dataType: "json"
	}).then( function(data) {
		graficoBarras(data);
		graficoCurvo(data);
		graficoLinea(data);
		graficoBarras2(data);
	});
	
});

  function graficoBarras(datos){
		var chart = new AmCharts.AmSerialChart();
		chart.dataProvider = datos;
		chart.categoryField = "tipo";
		
		var graph = new AmCharts.AmGraph();
		graph.valueField = "valor";
		graph.type = "column";
		graph.fillAlphas = 0.8;
		graph.balloonText = "[[category]]: <b>[[value]]</b>";
		
		chart.addGraph(graph);
		
		chart.angle = 30;
		chart.depth3D = 15;
		
		
		var categoryAxis = chart.categoryAxis;
		categoryAxis.autoGridCount  = false;
		categoryAxis.gridCount = datos.length;
		categoryAxis.gridPosition = "start";
		categoryAxis.labelRotation = 45;
		
		chart.write('chartdiv');
	}
	
	function graficoCurvo(datos){
	
		var chart2 = AmCharts.makeChart("chartdiv2",{
			"type" : "pie",
			"theme" : "light",
			"titleField" : "tipo",
			"valueField" : "valor",
			"legend" : { align : "right",
						 markerType : "circle",
						 "position" : "right"
					   },
			"dataProvider" : datos
	    });
	}
	
	function graficoLinea(datos){
		var chart3 = AmCharts.makeChart("chartdiv3",{
			"type" : "serial",
			
			"categoryField" : "tipo",
			"categoryAxis" : {
				"gridPosition" : "start"
				},
			"graphs" : [
				{
				"title" : "Eventos",
				"valueField" : "valor"			
				}
				],
				
		    "valueAxes": [ { "title": "Número de pulsaciones"} ],
			"legend": { "useGraphSettings": true },
			"titles": [ { "size": 15, "text": "Gráfico de lineas" }],
			"dataProvider": datos
			
			
		});		
	}  
	
	function graficoBarras2(datos){
		var char4 = AmCharts.makeChart("chartdiv4",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start" },
			"graphs" : [ { "title" : "Eventos",	
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 },
						 { "title" : "Eventos 2",
						   "type" : "line",
						   "valueField" : "valor"		   
					     }
					   ],
			"valueAxes" : [ { "title" : "Número de pulsaciones" } ],
			"legend" : { "useGraphSettings" : true },
			"titles" : [ { "size" : 15, "text" : "Gráfico de barras" } ],
			"depth3D" : 15,
			"angle" :  30,
			"dataProvider" : datos
		});
	}
	