$(document).ready(function() {
	
	for( index = 0; index < acciones.length; index++){ //para cada acción hacer una petición ajax.		
		$.ajax({ data:{"accion":acciones[index]},
			url:laurl,
			type:"get",
			async:false,
			dataType:"json"
		}).then( function (data) {
			crearGrafico(index,data);
		});		
	}
	
});

var laurl ="./php/controlador.php";  
var acciones = ["cuantosmoviles","tiempouso","smsgenerados","mododuchamovil","mododuchatotal","redneuronalmovil","redneuronaltotal","botonrojo","botontranquilidad","bateriabaja","zonasegura"];

var d = new Date();
var nue = d.getTime(); //tiempo inicial de procesamiento.
var fin = 0;	 //tiempo final del procesamiento.
var diff = 0 ; //diferencia de tiempo.
	
//Función llamada por la petición ajax donde se reciben los datos en formato json. 
//Según la acción llamada se pinta un gráfico u otro. 
function crearGrafico(indice, datos){
	var accion = acciones[indice];
	switch(accion){
		case "cuantosmoviles":
			$("#datosunicos").append("<p>Total de usuarios que han utilizado la app : "+datos.cuantos+" </p>");		
			break;
		case "tiempouso":
			var longitud = datos.length;
		
			//conversion de segundos a minutos....
			var minutos =Math.floor( datos.tiempomedio / 60 );
			var segundos = datos.tiempomedio % 60 ;
		
			$("#tiempo").append("<p>Tiempo medio de uso de la App : "+minutos+" minutos y "+segundos+" segundos </p>");
			pintaTiempoUso(datos);
			break;
		case "smsgenerados":
				$("#sms").append("<p>Total de SMS´s enviados : "+datos.total+"</p>");
				$("#sms").append("<p>Media de SMS´s enviados : "+datos.media+"</p>");	
				pintaSmsGenerados(datos);
			break;
		case "mododuchamovil": 
			pintaDuchaMovil(datos);
			break;
		case "mododuchatotal":
		    $("#duchaTotal").append("<p>Total de modos de ducha utilizados: "+datos.total+"</p>");
			$("#duchaTotal").append("<p>Media de modos de ducha utilizados: "+datos.media+"</p>");
			$("#duchaTotal").append("<p>Tiempo de ducha más utilizado : "+datos.mas+" minutos </p>");	
			pintaDuchaTotal(datos);
			break;
		case "redneuronalmovil": 
			pintaRedMovil(datos);
			break;
		case "redneuronaltotal": 
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
			pintaRedTotal(datos);	
			break;
		case "botonrojo": 
			$("#botonrojo").append("<p>Total de avisos de tipo alerta (botón rojo) : "+datos.avisos+"</p>");
			$("#botonrojo").append("<p>Media de avisos de tipo alerta (botón rojo) : "+datos.media+"</p>");	
			pintaBotonRojo(datos);	
			break;
		case "botontranquilidad": 
			$("#botonverde").append("<p>Total de avisos de tipo tranquilidad (botón verde) : "+datos.avisos+"</p>");
			$("#botonverde").append("<p>Media de avisos de tipo tranquilidad (botón verde) : "+datos.media+"</p>");	
			pintaTranquilidad(datos);	
		break;
		case "bateriabaja":
			$("#bateria").append("<p>Total de avisos de batería baja : "+datos.avisos+"</p>");
			$("#bateria").append("<p>Media de avisos de batería baja : "+datos.media+"</p>");	
			pintaBateria(datos);
			break;
		case "zonasegura": 
			$("#zonasegura").append("<p>Total de avisos de zona segura : "+datos.avisos+"</p>");
			$("#zonasegura").append("<p>Media de avisos de zona segura : "+datos.media+"</p>");	
			pintaZonaSegura(datos);
			break;
	}
	
	/* Para estudio de tiempos de procesamiento de archivos. */
	//calculaTiempo();
	//$("#datosunicos").append("<p>Gestor "+datos.gestor+"</p>");
	
}

//Función que pinta el gráfico de tiempo de uso de la app.
function pintaTiempoUso(datos){
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
}

//Función que pinta el gráfico de número de sms´s generados.
function pintaSmsGenerados(datos){
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
						   "topRadius":1,
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
}
	
//Función que pinta el gráfico de uso del modo ducha. Muestra los valores totales de cada tipo.
function pintaDuchaTotal(datos){
	var chart = AmCharts.makeChart("chartdiv22",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "Modo ducha totales"	,
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" :[  { "title" : "Modo ducha cantidad " } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Modo ducha totales" } ],
			"depth3D" : 15,
			"angle" :  30,
			"startDuration":2,
			"dataProvider" : datos.moviles
		});
}

//Función que pinta el gráfico de uso del modo ducha. Muestra los valores para cada movil.
function pintaDuchaMovil(datos){
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
			"valueAxes" : [ { "title" : "Modo ducha cantidad",
							  "stackType":"regular"
							} ],			
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"titles" : [ { "size" : 15, "text" : "Modo ducha por movil" } ],
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
}
	
//Función que pinta el gráfico de eventos de red neuronal. Muestra los valores para cada movil.
function pintaRedMovil(datos){
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
			"valueAxes" : [ { "title" : "Eventos red neuronal",
							  "stackType":"regular"
							} ],			
			"categoryField" : "movil",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"depth3D" : 15,
			"angle" :  30,
			"titles" : [ { "size" : 15, "text" : "Red neuronal por movil" } ],
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
	
//Función que pinta el gráfico de eventos de red neuronal. Muestra los totales de cada tipo.
function pintaRedTotal(datos){
	var chart = AmCharts.makeChart("chartdiv3",{
			"type" : "serial",
			"theme" : "light",
			"categoryField" : "tipo",
			"categoryAxis" : { "gridPosition" : "start","labelRotation" : 15},
			"graphs" : [ { "title" : "Eventos red neuronal"	,
			               "type" : "column", 
						   "valueField" : "valor",
						   "fillAlphas" : 1,
						   "balloonText" : "[[category]]: <b>[[value]]</b>"
						 }
					   ],				
					
			"valueAxes" :[  { "title" : "Eventos red neuronal " } ],
			"legend" : { "useGraphSettings" : true,
						 "position": "right",			},
			"titles" : [ { "size" : 15, "text" : "Red neuronal totales" } ],
			"depth3D" : 15,
			"angle" :  30,
			"startDuration":2,
			"dataProvider" : datos.moviles
		});
}

//Función que pinta el gráfico de avisos de alerta. 
function pintaBotonRojo(datos){
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
}

//Función que pinta el gráfico de avisos de tranquilidad.
function pintaTranquilidad(datos){
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
}

//Función que pinta el gráfico de avisos de batería baja.
function pintaBateria(datos){
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
}

//Función que pinta el gráfico de uso de zona segura.
function pintaZonaSegura(datos){
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
}

//Función para estudiar el tiempo que se tarda en ejecutar el tratamiento de los ficheros. 
function calculaTiempo(){
	var x = new Date();
	var cuanto = x.getTime();
	if(cuanto > fin ){
		fin = cuanto;
		diff = fin-nue;
	}
	$("#datosunicos").append("<p>Tiempos "+nue+" "+fin+" "+cuanto+" "+diff+" </p>");
}
