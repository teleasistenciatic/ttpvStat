﻿$(document).ready(function() {

	$.ajax({ data:{"accion":"cuantosmoviles"},
		url:"./php/controlador.php",		
		type:"get",
		dataType: "json"
	}).then( function(data){
		mostrarMoviles(data);
	});
	
	$.ajax({ data:{"accion":"tiempouso"},	   
		url: "./php/controlador.php",
		type: "get",
		dataType: "json"
	}).then( function(data) {
		graficoTiempoUso(data);
	});
	
	$.ajax({ data:{"accion":"smsgenerados"},
		url:"./php/controlador.php",		
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoSms(data);
	});
	
	$.ajax({ data:{"accion":"mododucha"},
		url:"http://10.0.0.71/estadisticas/php/controlador.php",	
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoDucha(data);
	});
	
	$.ajax({ data:{"accion":"redneuronal"},
		url:"./php/controlador.php",		
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoRedNeuronal(data);
	});
	
	$.ajax({ data:{"accion":"redneuronal2"},
		url:"./php/controlador.php",		
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoRedNeuronal2(data);
	});
	
	$.ajax({ data:{"accion":"botonrojo"},
		url:"http://10.0.0.71/estadisticas/php/controlador.php",		
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoBotonRojo(data);
	});
	
	$.ajax({ data:{"accion":"botontranquilidad"},
		url:"http://10.0.0.71/estadisticas/php/controlador.php",		
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoBotonTranquilidad(data);
	});
	
	$.ajax({ data:{"accion":"bateriabaja"},
		url:"http://10.0.0.71/estadisticas/php/controlador.php",		
		type: "get",
		dataType:"json"
	}).then( function(data){
		graficoBateriaBaja(data);
	});
	
});

	function mostrarMoviles(datos){
		$("#datosunicos").append("<p>Total de usuarios que han utilizado la app : "+datos.cuantos+" </p>");
	}

	function graficoTiempoUso(datos){
		var longitud = datos.length;
		$("#datosunicos").append("<p>Tiempo medio de uso de la App : "+datos.tiempomedio+" segundos </p>");
		var chart2 = AmCharts.makeChart("chartdiv5",{
			"type" : "pie",
			"theme" : "light",
			"titleField" : "tipo",
			"valueField" : "valor",
			"legend" : { align : "right",
						 markerType : "circle",
						 "position" : "bottom"
					   },
			"dataProvider" : datos.moviles
	    });
	}
	
	function graficoSms(datos){
		$("#datosunicos").append("<p>Total de SMS´s enviados : "+datos.total+"</p>");
		$("#datosunicos").append("<p>Media de SMS´s enviados : "+datos.media+"</p>");	
	
		var chart = AmCharts.makeChart("chartdiv",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "sms´s",	
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" : [ { "title" : "sms generados" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de Sms" } ],
			"depth3D" : 15,
			"angle" :  30,
			
			"dataProvider" : datos.moviles
		});
	}
	
	function graficoDucha(datos){
		$("#datosunicos").append("<p>Tiempo de ducha más utilizado : "+datos.mas+" minutos </p>");
		var chart = AmCharts.makeChart("chartdiv2",{
			"type":"serial",
			"theme":"light",
			"legend": {
				"horizontalGap": 10,
				"maxColumns": 1,
				"position": "right",
				"useGraphSettings": true,
				"markerSize": 10
			},
			dataProvider : datos.moviles,
			"valueAxes" : [ { "title" : "botones modo ducha",
							  "stackType":"regular"
							} ],			
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"titles" : [ { "size" : 15, "text" : "Gráfico modo ducha" } ],
			"graphs" : [ { "title" : "15",	
			               "type" : "column", 
						   "valueField" : "15",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 },
						 {
							"title" : "30",	
			               "type" : "column", 
						   "valueField" : "30",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 },
						 {
							"title" : "45",	
			               "type" : "column", 
						   "valueField" : "45",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],	
			
		});
	}
		
	//muestra datos por movil
	function graficoRedNeuronal(datos){
		var texto ="<p>Total de eventos de red neuronal generados ";
		texto +="<ul><li>Sentado "+datos.total.sentado+" </li>"
		texto +="    <li>Golpe "+datos.total.golpe+"</li>";
	    texto +="    <li>Correr "+datos.total.correr+"</li>";
		texto +="    <li>Caida "+datos.total.caida+"</li>";		
		$("#datosunicos").append(texto+"</ul></p>");
		
		var texto2 = "<p>Media de eventos de red neuronal generados ";
		texto2 +="<ul><li>Sentado "+datos.media.sentado+" </li>"
		texto2 +="    <li>Golpe "+datos.media.golpe+"</li>";
	    texto2 +="    <li>Correr "+datos.media.correr+"</li>";
		texto2 +="    <li>Caida "+datos.media.caida+"</li>";			
		$("#datosunicos").append(texto2+" </ul></p>");	
	
		var chart = AmCharts.makeChart("chartdiv33",{
			"type":"serial",
			"theme":"light",
			"legend": {
				"horizontalGap": 10,
				"maxColumns": 1,
				"position": "right",
				"useGraphSettings": true,
				"markerSize": 10
			},
			dataProvider : datos.moviles,
			"valueAxes" : [ { "title" : "eventos red neuronal",
							  "stackType":"regular"
							} ],			
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"depth3D" : 15,
			"angle" :  30,
			"titles" : [ { "size" : 15, "text" : "Gráfico red neuronal" } ],
			"graphs" : [ { "title" : "sentado",	
			               "type" : "column", 
						   "valueField" : "sentado",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 },
						 {
							"title" : "golpe",	
			               "type" : "column", 
						   "valueField" : "golpe",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 },
						 {
							"title" : "correr",	
			               "type" : "column", 
						   "valueField" : "correr",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 },
						 {
							"title" : "caida",	
			               "type" : "column", 
						   "valueField" : "caida",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],	
			
		});
	}	
	
	//muestra totales
	function graficoRedNeuronal2(datos){
		var texto ="<p>Total de eventos de red neuronal generados ";
		texto +="<ul><li>Sentado "+datos.total.sentado+" </li>"
		texto +="    <li>Golpe "+datos.total.golpe+"</li>";
	    texto +="    <li>Correr "+datos.total.correr+"</li>";
		texto +="    <li>Caida "+datos.total.caida+"</li>";		
		$("#datosunicos").append(texto+"</ul></p>");
		
		var texto2 = "<p>Media de eventos de red neuronal generados ";
		texto2 +="<ul><li>Sentado "+datos.media.sentado+" </li>"
		texto2 +="    <li>Golpe "+datos.media.golpe+"</li>";
	    texto2 +="    <li>Correr "+datos.media.correr+"</li>";
		texto2 +="    <li>Caida "+datos.media.caida+"</li>";			
		$("#datosunicos").append(texto2+" </ul></p>");	
		
		var chart = AmCharts.makeChart("chartdiv3",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "avisos botón verde"	,
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" :[  { "title" : "Avisos de botón verde" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de tranquilidad" } ],
			"depth3D" : 15,
			"angle" :  30,
			
			"dataProvider" : datos.moviles
		});
		
		
	}
	
	function graficoBotonRojo(datos){
		$("#datosunicos").append("<p>Total de avisos de tipo alerta (botón rojo) : "+datos.avisos+"</p>");
		$("#datosunicos").append("<p>Media de avisos de tipo alerta (botón rojo) : "+datos.media+"</p>");	
		
		var chart = AmCharts.makeChart("chartdiv4",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "avisos botón rojo",	
			               "type" : "column", 
						   "valueField" : "aviso",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" : [ { "title" : "Avisos de botón rojo" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de botón rojo" } ],
			"depth3D" : 15,
			"angle" :  30,
			
			"dataProvider" : datos.moviles
		});
	}
	
	function graficoBotonTranquilidad(datos){
		$("#datosunicos").append("<p>Total de avisos de tipo tranquilidad (botón verde) : "+datos.avisos+"</p>");
		$("#datosunicos").append("<p>Media de avisos de tipo tranquilidad (botón verde) : "+datos.media+"</p>");	
		
		var chart = AmCharts.makeChart("chartdiv6",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "avisos botón verde"	,
			               "type" : "column", 
						   "valueField" : "aviso",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" : [ { "title" : "Avisos de botón verde" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de tranquilidad" } ],
			"depth3D" : 15,
			"angle" :  30,
			
			"dataProvider" : datos.moviles
		});
	}
	
	function graficoBateriaBaja(datos){
		$("#datosunicos").append("<p>Total de avisos de batería baja : "+datos.avisos+"</p>");
		$("#datosunicos").append("<p>Media de avisos de batería baja : "+datos.media+"</p>");	
		var chart = AmCharts.makeChart("chartdiv7",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "avisos batería baja"	,
			               "type" : "column", 
						   "valueField" : "aviso",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" : [ { "title" : "Avisos de batería baja" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de batería baja" } ],
			"depth3D" : 15,
			"angle" :  30,
			
			"dataProvider" : datos.moviles
		});
	}

	
	/*
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

	*/