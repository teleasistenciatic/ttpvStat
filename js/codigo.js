$(document).ready(function() {

	var laurl ="./php/controlador2.php"; 
	/*controlador.php o controlador2.php El primero trata todos los archivos en cada llamada. 
	El segundo utiliza session para guardar	el gestor y solo llamar 1 vez a todos los archivos. */
	
	
	$.ajax({ data:{"accion":"cuantosmoviles"},
		url:laurl,		
		type:"get",
		async:false,
		dataType: "json"
	}).then( function(data){
		mostrarMoviles(data);		
	});
	
	$.ajax({ data:{"accion":"tiempouso"},	   
		url:laurl,
		type: "get",
		async:false,
		dataType: "json"
	}).then( function(data) {
		graficoTiempoUso(data);
	});
	
	$.ajax({ data:{"accion":"smsgenerados"},
		url:laurl,		
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoSms(data);
	});
	
	$.ajax({ data:{"accion":"mododucha"},
		url:laurl,	
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoDucha(data);
	});
	
	$.ajax({ data:{"accion":"redneuronal"},
		url:laurl,		
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoRedNeuronal(data);
	});
	
	$.ajax({ data:{"accion":"redneuronal2"},
		url:laurl,		
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoRedNeuronal2(data);
	});
	
	$.ajax({ data:{"accion":"botonrojo"},
		url:laurl,		
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoBotonRojo(data);
	});
	
	$.ajax({ data:{"accion":"botontranquilidad"},
		url:laurl,		
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoBotonTranquilidad(data);
	});
	
	$.ajax({ data:{"accion":"bateriabaja"},
		url:laurl,		
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoBateriaBaja(data);
	});
	
	$.ajax({ data:{"accion":"zonasegura"},
		url:laurl,
		type: "get",
		async:false,
		dataType:"json"
	}).then( function(data){
		graficoZonaSegura(data);
	});

});

/*	var d = new Date();
	var nue = d.getTime();
	var fin = 0;	
	var diff = 0 ;
	
	

	function calculaTiempo(){
		var x = new Date();
		var cuanto = x.getTime();
		if(cuanto > fin ){
			fin = cuanto;
			diff = fin-nue;
		}
		$("#datosunicos").append("<p>Tiempos "+nue+" "+fin+" "+cuanto+" "+diff+" </p>");
	}*/

	function mostrarMoviles(datos){
		$("#datosunicos").append("<p>Total de usuarios que han utilizado la app : "+datos.cuantos+" </p>");		
		
      /*calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>");*/
	}

	function graficoTiempoUso(datos){
		var longitud = datos.length;
		$("#tiempo").append("<p>Tiempo medio de uso de la App : "+datos.tiempomedio+" segundos </p>");
		var chart2 = AmCharts.makeChart("chartdiv5",{
			"type" : "pie",
			"theme" : "light",
			"titleField" : "tipo",
			"valueField" : "valor",
			"legend" : { align : "right",
						 markerType : "circle",
						 "position" : "bottom"
					   },
		    "startDuration":2,
			"dataProvider" : datos.moviles
	    });
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
	
	function graficoSms(datos){
		$("#sms").append("<p>Total de SMS´s enviados : "+datos.total+"</p>");
		$("#sms").append("<p>Media de SMS´s enviados : "+datos.media+"</p>");	
	
		var chart = AmCharts.makeChart("chartdiv",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"startDuration": 2,
			"graphs" : [ { "title" : "sms´s",	
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "fillColors" : "#ae85c9",
						   "balloonText" : "[[category]]: <b>[[value]]</b>",
						   "topRadius":0.5,
						 }
					   ],	
			"valueAxes" : [ { "title" : "sms generados" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de Sms" } ],
			"depth3D" : 25,
			"angle" :  40,
			
			"dataProvider" : datos.moviles
		});
		
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
	
	function graficoDucha(datos){
		$("#ducha").append("<p>Tiempo de ducha más utilizado : "+datos.mas+" minutos </p>");
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
			"startDuration":2,
			dataProvider : datos.moviles,
			"valueAxes" : [ { "title" : "botones modo ducha",
							  "stackType":"regular"
							} ],			
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"titles" : [ { "size" : 15, "text" : "Gráfico modo ducha" } ],
				"depth3D" : 15,
			"angle" :  30,
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
						 },
						 {
							"title" : "Personalizado",
							"type" : "column",
							"valueField": "pe",
							"fillAlphas" : 1,
							"ballonText" : "[[category]]: <b>[[value]]</b>"
						 }						 
					   ],	
			
		});
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
		
	//muestra datos por movil
	function graficoRedNeuronal(datos){
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
			"startDuration": 2,
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
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}	
	
	//muestra totales
	function graficoRedNeuronal2(datos){
		var texto ="<p>Total de eventos de red neuronal generados ";
		texto +="<ul><li>Sentado "+datos.total.sentado+" </li>"
		texto +="    <li>Golpe "+datos.total.golpe+"</li>";
	    texto +="    <li>Correr "+datos.total.correr+"</li>";
		texto +="    <li>Caida "+datos.total.caida+"</li>";		
		$("#red").append(texto+"</ul></p>");
		
		var texto2 = "<p>Media de eventos de red neuronal generados ";
		texto2 +="<ul><li>Sentado "+datos.media.sentado+" </li>"
		texto2 +="    <li>Golpe "+datos.media.golpe+"</li>";
	    texto2 +="    <li>Correr "+datos.media.correr+"</li>";
		texto2 +="    <li>Caida "+datos.media.caida+"</li>";			
		$("#red").append(texto2+" </ul></p>");	
		
		var chart = AmCharts.makeChart("chartdiv3",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "Eventos de red neuronal"	,
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" :[  { "title" : "Eventos de red neuronal" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Eventos de red neuronal" } ],
			"depth3D" : 15,
			"angle" :  30,
			"startDuration":2,
			"dataProvider" : datos.moviles
		});
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
	
	function graficoBotonRojo(datos){
		$("#botonrojo").append("<p>Total de avisos de tipo alerta (botón rojo) : "+datos.avisos+"</p>");
		$("#botonrojo").append("<p>Media de avisos de tipo alerta (botón rojo) : "+datos.media+"</p>");	
		
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
			"startDuration":2,
			"dataProvider" : datos.moviles
		});
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
	
	function graficoBotonTranquilidad(datos){
		$("#botonverde").append("<p>Total de avisos de tipo tranquilidad (botón verde) : "+datos.avisos+"</p>");
		$("#botonverde").append("<p>Media de avisos de tipo tranquilidad (botón verde) : "+datos.media+"</p>");	
		
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
			"startDuration":2,
			"dataProvider" : datos.moviles
		});
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
	
	function graficoBateriaBaja(datos){
		$("#bateria").append("<p>Total de avisos de batería baja : "+datos.avisos+"</p>");
		$("#bateria").append("<p>Media de avisos de batería baja : "+datos.media+"</p>");	
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
			"startDuration":2,
			"dataProvider" : datos.moviles
		});
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}

	function graficoZonaSegura(datos){
		$("#zonasegura").append("<p>Total de avisos de zona segura : "+datos.avisos+"</p>");
		$("#zonasegura").append("<p>Media de avisos de zona segura : "+datos.media+"</p>");	
		var chart = AmCharts.makeChart("chartdiv8",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "avisos zona segura"	,
			               "type" : "column", 
						   "valueField" : "aviso",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" : [ { "title" : "Avisos de Zona Segura" } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Avisos de Zona Segura" } ],
			"depth3D" : 15,
			"angle" :  30,	
			"startDuration":2,			
			"dataProvider" : datos.moviles
		});
		
	/*	calculaTiempo();
		$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>"); */
	}
		
	