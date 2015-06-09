<?php

/* Esta clase es la responsable de acceder a los archivos en texto plano y procesar su información. */
class Gestor {
	
	private $path="../archivos";	//direccion a la carpeta que contiene los archivos.
	private $losnombres = array();	 //array de nombres de los archivos.
	
	function __construct() {
       $this->losnombres = $this->getNombres();
    }
		
	
	//Devuelve el tiempo de uso de la app por movil y día.
	function getUsoDiario(){
		$losimeis = $this->getImeis();
		$vectortiempoImei = array(); //vector de tiempos.
		foreach($losimeis as $key => $valor){
			$vectortiempoImei[$valor] = 0;
		}
		//recorrer el directorio para analizar cada archivo
		$directorio2 = opendir($this->path);
		while ($archivo2 = readdir($directorio2)){  //obtenemos un archivo y luego otro sucesivamente
			if (is_dir($archivo2)){}else{  //verificamos si es o no un directorio
		
				$tiempoInicio=0;
				$tiempoFin=0;		
				$pathArchivo = "../archivos/".$archivo2;
				if( ($gestor = fopen($pathArchivo, "r") ) !== FALSE){
					while( ($datos = fgetcsv($gestor,1000,";") ) !== FALSE){			
						if( $tiempoInicio == 0) $tiempoInicio =substr( $datos[0] , 1);
						$tiempoFin = substr( $datos[0] ,1);
					}
					fclose($gestor);
				}	
				
				$date1 = DateTime::createFromFormat('Y-m-d_H-i-s',$tiempoInicio);
				$date2 = DateTime::createFromFormat('Y-m-d_H-i-s',$tiempoFin);
		
				$diff = $date2->diff($date1);			
				$indice = substr($archivo2,0,15); //capturo valor de imei 
				$vectortiempoImei[$indice] += $diff->s;
			}	
		}
		closedir($directorio2);
		return $vectortiempoImei;
	}
	
	/**
	 * Devuelve un array con el uso de los botones para cada movil y dia
	 */
	function getBotonesPulsados(){
		$losimeisydias = $this->getImeisDia();
		$vectorPulsacionBoton = array(); //vector de veces que se pulsa boton.
		foreach($losimeisydias as $key => $valor){
			$vectorPulsacionBoton[$valor] = array();
		}
		
		//para cada fichero buscar datos de boton.
		foreach($this->losnombres as $nombre){
			$direc = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($direc); //contiene toda la informacion de un fichero como array. 
			$indice = substr($nombre,0,26); //capturo valor de imei y dia
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea				
				if( $datoscsv[$i][1]== "boton" ){
					$vectorPulsacionBoton[$indice][] = $datoscsv[$i][2]; //almaceno en un array cada tipo de pulsacion. Dentro de su imei y dia.
				}				
			}		
		}
		
		foreach($vectorPulsacionBoton as $key => $valor){
			$res = array_count_values($vectorPulsacionBoton[$key]); //cuento cuantos hay de cada tipo para cada imei y dia
			$vectorPulsacionBoton[$key] = $res ;
		}
		
		return $vectorPulsacionBoton;
	}
	
	/**
	 * Devuelve un array con los avisos relacionados con la red neuronal 	 
	 */
	 function getAvisosRedNeuronal(){
		$losimei = $this->getImeis();
		$vectorred=array(); //vector para guardar los datos de avisos de red neuronal
		$contador = array();
		$contador["caida"]=0;
		$contador["sentado"]=0;
		$contador["golpe"]=0;
		$contador["correr"]=0;
		foreach($losimei as $key => $valor ){ 		
			$vectorred[$valor] = $contador;
		}
		
		//para cada fichero buscar datos de avisos. de los 4 tipos.
		foreach($this->losnombres as $nombre){
		
			$direc = $this->path."/".$nombre;

			$datoscsv = $this->getArchivo($direc); //contiene toda la informacion de un fichero como array. 
			$indice = substr($nombre,0,15); //capturo valor de imei y dia
		    for($i=0;$i<count($datoscsv);$i++){ //para cada linea		
				if( $datoscsv[$i][2] == "caida" ){
					$vectorred[$indice]["caida"]++;
				}
				if( $datoscsv[$i][2] == "correr" ){
					$vectorred[$indice]["correr"]++;
				}
				if( $datoscsv[$i][2] == "golpe" ){
					$vectorred[$indice]["golpe"]++;
				}
				if( $datoscsv[$i][2] == "sentado" ){
					$vectorred[$indice]["sentado"]++;
				}
			}		
		}
		return $vectorred;		
	 }
	 
	 /**
	  * Devuelve los sms enviados por cada movil 
	  */
	 function getSMSenviados(){
		 $losimei = $this->getImeis();
		 $vectorSMS=array();
		 foreach($losimei as $key => $valor){
			$vectorSMS[$valor] = 0;
		 }	

		 //para cada fichero cuento cuantos sms se han enviado y los guardo donde corresponda.
		 foreach($this->losnombres as $nombre){
			$direc = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($direc); 
			$indice=substr($nombre,0,15);
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea
				if( $datoscsv[$i][1] == "SMS" ){
					$pos = strpos($datoscsv[$i][2],"enviado");
					if( $pos === false){
						//no es enviado
					}else{
						$vectorSMS[$indice]++;
					}
				}
			}
		}
		return $vectorSMS;	 
	 }
	 
	 /**
	  * Devuelve los avisos de tranquilidad generados por cada movil 
	  */
	 function getAvisoTranquilidad(){
		 $losimei = $this->getImeis();
		 $vectorTranquilidad=array();
		 foreach($losimei as $key => $valor){
			$vectorTranquilidad[$valor] = 0;
		 }	

		 //para cada fichero cuento cuantos avisos de tranquilidad se han enviado y los guardo donde corresponda.
		 foreach($this->losnombres as $nombre){
			$direc = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($direc); 
			$indice=substr($nombre,0,15); //para cada movil
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea
				if( $datoscsv[$i][1] == "aviso" && $datoscsv[$i][2]=="tranquilidad" ){
					$vectorTranquilidad[$indice]++;
				}
			}			
		}
		return $vectorTranquilidad;
	 }
	 
	 /**
	  * Devuelve los avisos de alerta generados por cada movil -> envios de sms de boton rojo
	  */
    function getAvisoAlerta(){
		 $losimei = $this->getImeis();
		 $vector=array();
		 foreach($losimei as $key => $valor){
			$vector[$valor] = 0;
		 }	

		 //para cada fichero cuento cuantos avisos de alerta se han enviado y los guardo donde corresponda.
		 foreach($this->losnombres as $nombre){
			$direc = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($direc); 
			$indice=substr($nombre,0,15); //para cada movil
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea
				if( $datoscsv[$i][1] == "aviso" && $datoscsv[$i][2]=="alerta" ){
					$vector[$indice]++;
				}
			}			
		}
		return $vector;
	  }

	  /**
	   * Devuelve los avisos de modo ducha activado segun tiempo y para cada movil.
	   */
    function getModoDucha(){
	   	  $losimei = $this->getImeis();
		  $vector=array();
		  $contador = array();
		  $contador["15"]=0;
		  $contador["30"]=0;
		  $contador["45"]=0;
		  foreach($losimei as $key => $valor){
			$vector[$valor] = $contador;
		  }

		  //para cada fichero buscar datos de modo ducha.
		  foreach($this->losnombres as $nombre){
			$direc = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($direc); //contiene toda la informacion de un fichero como array. 
			$indice = substr($nombre,0,15); //capturo valor de imei 
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea				
				if( $datoscsv[$i][1]== "modo ducha" ){
					$pos15 = strpos( $datoscsv[$i][2],"15");
					if( $pos15 !== false) $vector[$indice]["15"]++;
					$pos30= strpos( $datoscsv[$i][2],"30");
					if( $pos30 !== false) $vector[$indice]["30"]++;
					$pos45 = strpos( $datoscsv[$i][2],"45");
					if( $pos45 !== false) $vector[$indice]["45"]++;			
				}
			}
          }
			return $vector; 
	   }
	
	// Devuelve los eventos de notificación de batería baja.
	function getAvisosBateria(){
		$losimei = $this->getImeis();
		$vector = array();
		foreach($losimei as $key => $valor){
			$vector[$valor]=0; //inicio cada movil a 0
		}
		
		//para cada fichero cuento cuantas notificaciones de batería baja se han enviado y los guardo.
		foreach($this->losnombres as $nombre){
			$dire = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($dire);
			$indice = substr($nombre,0,15); //para cada moivl
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea
				if( $datoscsv[$i][1]=="bateria" && $datoscsv[$i][2]=="notificacion bateria baja" ){
					$vector[$indice]++;
				}
			}
		}
		return $vector;		
	}
	
	/* Devuelve los avisos de zona segura
	 */
	function getZonaSegura(){
		$vector = $this->dameVectordemovilesacero();
		
		foreach($this->losnombres as $nombre){
			$dire = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($dire);
			$indice = substr($nombre,0,15); //para cada movil
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea
				if( $datoscsv[$i][1]=="aviso" && $datoscsv[$i][2]=="zona segura" ){
					$vector[$indice]++;
				}
			}
		}
		return $vector;
	}
	
	
	
	/***  métodos privados ***/
	
	
	private function dameVectordemovilesacero(){
		$losimei = $this->getImeis();
		$vector = array();
		foreach($losimei as $key => $valor){
			$vector[$valor]=0; //inicio cada movil a 0
		}
		return $vector;
	}
	
	/**
	 * Devuelve un array con todas las lineas de un fichero.
	 */
	private function getArchivo($pathYnombre){
		$datosfichero = array();
		if( ($gestor = fopen($pathYnombre, "r") )!==FALSE ){
			while( ($datos = fgetcsv($gestor , 1000, ";" ) ) !== FALSE ){
				$datosfichero[] = $datos;
			}
			fclose($gestor);
		}
		return $datosfichero;
	}
	
	/**
	 * Devuelve un array con los identificadores de los distintos moviles.
	 */
	private function getImeis(){
		$imei = array(); //array con todos los numeros 
		foreach($this->losnombres as $valor){
			$imei[] = substr($valor,0,15);	 //capturo los primeros elementos que se corresponden con el imei.	
		}
		$res = array_unique($imei);
		return $res;
	}
	
	/**
	 * Devuelve un array con los identificadores de moviles y día. 
	 * Cada dato indica un archivo de 1 movil y 1 día. 
	 */
	private function getImeisDia(){
		$imeydia = array();
		foreach($this->losnombres as $valor){
			$imeiydia[] = substr($valor,0,26); //capturo valor de imei y dia
		}
		$res2 = array_unique($imeiydia);
		return $res2;	
	}
	
	//Devuelve los nombres de todos los archivos existentes.
	private function getNombres(){
		$directorio = opendir($this->path); //ruta actual
		$nombres = array();
		while( $archivo = readdir($directorio) ){
			if( is_dir($archivo) ){}else{ $nombres[] = $archivo; }
		}		
		closedir($directorio);		
		return $nombres;
	}
}


?>


	