<?php

/* Esta clase es la responsable de acceder a los archivos en texto plano y procesar su información. */
class Gestor2 {
	
	private $path="../archivos";	//direccion a la carpeta que contiene los archivos.
	private $losnombres = array();	 //array de nombres de los archivos.
	
	private $vectorTiempos = array(); //uso diario.
	private $vectorSMS = array(); //sms enviados
	private $vectorDucha = array(); //modo ducha.
	private $vectorAlerta = array(); //avisos de boton rojo.
	private $vectorTranquilidad = array(); //avisos de boton verde.
	private $vectorBateria = array(); //avisos de bateria baja.
	private $vectorZona = array(); //avisos de zona segura.
	private $vectorRed = array(); //avisos de red neuronal.
	
	function __construct() {
       $this->losnombres = $this->getNombres();
	   
	   /* inicia los vectores para guardar la información. */
	   $this->vectorTiempos = $this->preparaVectores();
	   $this->vectorSMS = $this->preparaVectores();
	   
	   $contador = array(); //modo ducha.
	   $contador["15"]=0;
	   $contador["30"]=0;
	   $contador["45"]=0;	   
	   $contador["pe"]=0;
	   $this->vectorDucha = $this->preparaVectores();
	   foreach($this->vectorDucha as $key => $valor){
			$this->vectorDucha[$key] = $contador;
	   }
	   
	   $this->vectorAlerta = $this->preparaVectores();
	   $this->vectorTranquilidad = $this->preparaVectores();
	   $this->vectorBateria = $this->preparaVectores();
	   $this->vectorZona = $this->preparaVectores();
	   
	   
	   $cont = array(); //red neuronal.
	   $cont["caida"]=0;
	   $cont["sentado"]=0;
	   $cont["golpe"]=0;
	   $cont["correr"]=0;
	   $this->vectorRed = $this->preparaVectores();
	   foreach($this->vectorRed as $key => $valor ){ 		
			$this->vectorRed[$key] = $cont;
	   }
	 
	   
	   //procesa los archivos.
	   $this->procesaArchivos();
    }
	
	/**
	 * Devuelve un array con los identificadores de los distintos moviles.
	 */
	function getImeis(){
		$imei = array(); //array con todos los numeros 
		foreach($this->losnombres as $valor){
			$imei[] = substr($valor,0,15);	 //capturo los primeros elementos que se corresponden con el imei.	
		}
		$res = array_unique($imei);
		return $res;
	}
	
	function getUsoDiario(){
		return $this->vectorTiempos;
	}
	
	function getSMSenviados(){
		return $this->vectorSMS;
	}
	
	function getModoDucha(){
		return $this->vectorDucha;
	}
	
	function getAvisoAlerta(){
		return $this->vectorAlerta;
	}
	
	function getAvisoTranquilidad(){
		return $this->vectorTranquilidad;
	}
	
	function getAvisosBateria(){
		return $this->vectorBateria;
	}
	
	function getZonaSegura(){
		return $this->vectorZona;
	}
	
	function getAvisosRedNeuronal(){
		return $this->vectorRed;
	}

	
	/*************************************/
	
	/* procesa todo los archivos guardando los datos obtenidos en los parámetros correspondientes.
	*/
	private function procesaArchivos(){	 
		foreach($this->losnombres as $nombre){	//para cada archivo ...
			$direc = $this->path."/".$nombre;
			$datoscsv = $this->getArchivo($direc);
			$indice = substr($nombre,0,15); //indicador del imei sacado de nombre del archivo.
			$tiempoInicio=0; //para calcular uso diario.
			$tiempoFin=0;	
//echo "archivo ".$indice."<br/>";
			for($i=0;$i<count($datoscsv);$i++){ //para cada linea				
				if( count($datoscsv[$i]) == 3 ){ //si tiene los 3 elementos que tiene que tener cada linea
					
					//usodiario.
					if( $tiempoInicio == 0) $tiempoInicio =substr( $datoscsv[$i][0] , 1);
					$tiempoFin = substr( $datoscsv[$i][0] ,1);	
					
					
					switch( $datoscsv[$i][1] ){
						case "SMS": //sms enviados.	
							$pos = strpos($datoscsv[$i][2],"enviado");
							if( $pos === false){
								//no es enviado
							}else{
								$this->vectorSMS[$indice]++;
							}
							break;
						case "modo ducha": 
							$pos15 = strpos( $datoscsv[$i][2],"15");
							$pos30 = strpos( $datoscsv[$i][2],"30");
							$pos45 = strpos( $datoscsv[$i][2],"45");
							$posPE = strpos( $datoscsv[$i][2],"iniciado con minutos");							
							if( $pos15 !== false ){
								$this->vectorDucha[$indice]["15"]++;
							}else if( $pos30 !== false){
								$this->vectorDucha[$indice]["30"]++;
							}else if( $pos45 !== false){
								$this->vectorDucha[$indice]["45"]++;		
							}else if( $posPE !== false){
								$this->vectorDucha[$indice]["pe"]++;
							}
							break;
						case "aviso": 							
							switch($datoscsv[$i][2]){ //para cada tipo distinto de aviso.
								case "alerta": 									
									$this->vectorAlerta[$indice]++;									
									break;
								case "tranquilidad":
									$this->vectorTranquilidad[$indice]++;
									break;
								case "notificacion bateria baja":
									$this->vectorBateria[$indice]++;
									break;
								case "zona segura":
									$this->vectorZona[$indice]++;
									break;
								case "caida": 
									$this->vectorRed[$indice]["caida"]++;
									break;
								case "correr": 
									$this->vectorRed[$indice]["correr"]++;
									break;
								case "golpe": 
									$this->vectorRed[$indice]["golpe"]++;
									break;
								case "sentado":
									$this->vectorRed[$indice]["sentado"]++;
									break;
							}							
							break;
					}		
				
				}else{
					//no hago nada. Puede ser un error, o un salto de carro.
				}
			} // fin archivo	
			$date1 = DateTime::createFromFormat('Y-m-d_H-i-s',$tiempoInicio);
			$date2 = DateTime::createFromFormat('Y-m-d_H-i-s',$tiempoFin);
			$diff = $date2->diff($date1);			
		
			$this->vectorTiempos[$indice] += $diff->s;
					
		}
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
	
	//inicia los vectores con el indice como imei de los moviles y el valor a cero.
	private function preparaVectores(){
		$losimeis = $this->getImeis();
		$vector = array();
		foreach($losimeis as $key => $valor){
			$vector[$valor]=0; //inicio cada movil a 0
		}
		return $vector;
	}
	
	
	
}
?>