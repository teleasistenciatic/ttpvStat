<?php
require_once 'Gestor.php';

$gestor = new Gestor();

$accion = $_GET["accion"];

switch($accion){
	case "cuantosmoviles": 
		$cuantos = $gestor->getImeis();
		$objeto = array();
		$objeto["cuantos"]=count($cuantos);
		echo json_encode($objeto);
		break;	
	case "tiempouso":
		//tiempo de uso de cada app en cada movil.
		$tiempos = $gestor->getUsoDiario();
		$total = array();		
		$contador = 0;
		foreach($tiempos as $key => $valor){
			$objeto = array();
			$objeto["tipo"] = $key;
			$objeto["valor"] = $valor;
			$total[] = $objeto; //añado dato de movil y tiempo			
			$contador += $valor; //sumo los tiempos para calcular la media 
		}
		$vector = array();
		$vector["tiempomedio"] = $contador/count($tiempos); //añado valor medio 
		$vector["moviles"] = $total;		
		echo json_encode( $vector);
		break;
		
	case "smsgenerados":
		$botones = $gestor->getSMSenviados();
		$total = array();
		$contador = 0;
		foreach($botones as $key => $valor){
			$objeto = array();
			$objeto["tipo"] = $key;
			$objeto["valor"] = $valor; $contador += $valor;
			$total[] = $objeto;
		}
		$vector = array();
		$vector["moviles"] = $total;
		$vector["total"] = $contador;
		$vector["media"] = $contador / count($botones);		
		
		echo json_encode( $vector );
		break;
		
	case "mododucha":
		$mododucha = $gestor->getModoDucha();
		$total = array();
		$contador = array(); //almacena cuantas veces se ha tocado el botón en total.
		$contador["15"]=0;
		$contador["30"]=0;
		$contador["45"]=0;
		foreach($mododucha as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["15"] = $valor["15"]; $contador["15"]+=$valor["15"];
			$objeto["30"] = $valor["30"]; $contador["30"]+=$valor["30"];
			$objeto["45"] = $valor["45"]; $contador["45"]+=$valor["45"];
			$total[] = $objeto;
		}
		$cuanto = max($contador);
		$indice = array_search($cuanto,$contador); //averiguar cual es el más utilizado
	
		$vector = array();
		$vector["moviles"] = $total;
		$vector["mas"] = $indice;
		
		echo json_encode( $vector );
		break;
		
	case "redneuronal":  
		$datos = $gestor->getAvisosRedNeuronal();
		$total = array(); 
		$contador = array();
		$contador["sentado"]=0; $contador["golpe"]=0;  $contador["correr"]=0; $contador["caida"]=0; 
		foreach($datos as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["sentado"] = $valor["sentado"]; $contador["sentado"]+=$valor["sentado"];
			$objeto["golpe"] = $valor["golpe"];     $contador["golpe"]+=$valor["golpe"];
			$objeto["correr"] = $valor["correr"];   $contador["correr"]+=$valor["correr"];
			$objeto["caida"] = $valor["caida"];	    $contador["caida"]+=$valor["caida"];
			$total[] = $objeto;
		}
		$medias["sentado"] = $contador["sentado"] / count($datos);
			$medias["golpe"] = $contador["golpe"] / count($datos);
				$medias["correr"] = $contador["correr"] / count($datos);
					$medias["caida"] = $contador["caida"] / count($datos);
					
		$vector = array();
		$vector["moviles"]=  $total;
		$vector["total"] =  $contador;
		$vector["media"] =  $medias;
		
		echo json_encode( $vector );
		break;
		
	case "redneuronal2":	
		$datos = $gestor->getAvisosRedNeuronal();
		$contador = array(); $contador["sentado"]=0; $contador["golpe"]=0;  $contador["correr"]=0; $contador["caida"]=0; 
		foreach($datos as $key => $valor){ //cuento cuantos avisos de cada tipo hay.
			$contador["sentado"]+=$valor["sentado"];
		    $contador["golpe"]+=$valor["golpe"];
			$contador["correr"]+=$valor["correr"];
		    $contador["caida"]+=$valor["caida"];			
		}
		$medias["sentado"] = $contador["sentado"] / count($datos);
		$medias["golpe"] = $contador["golpe"] / count($datos);
		$medias["correr"] = $contador["correr"] / count($datos);
		$medias["caida"] = $contador["caida"] / count($datos);
		
		$total = array(); 
		foreach($contador as $key => $valor){
			$objeto["tipo"] = $key;
			$objeto["valor"] = $valor;
			$total[] = $objeto;
		}	
		$vector = array();
		$vector["moviles"] = $total;
		$vector["total"] =  $contador;
		$vector["media"] =  $medias;
		
		echo json_encode( $vector );	
		break;
		
	case "botonrojo":
		$datos = $gestor->getAvisoAlerta();
		$total = array();
		$contador = 0;
		foreach($datos as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["aviso"] =  $valor;
			$total[] = $objeto;
			$contador += $valor; //suma de todos los avisos
		}
		$vector = array();
		$vector["moviles"] = $total;
		$vector["avisos"] = $contador;
		$vector["media"] = $contador/count($datos);
		
		echo json_encode( $vector );
		break;
		
	case "botontranquilidad":
		$datos = $gestor->getAvisoTranquilidad();
		$total = array();
		$contador = 0;
		foreach($datos as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["aviso"] =  $valor;
			$total[] = $objeto;
			$contador += $valor; //suma de todos los avisos
		}
		$vector = array();
		$vector["moviles"] = $total;
		$vector["avisos"] = $contador;
		$vector["media"] = $contador/count($datos);
		
		echo json_encode( $vector );
		break;
		
	case "bateriabaja":
		$datos = $gestor->getAvisosBateria();
		$total = array();
		$contador = 0;
		foreach($datos as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["aviso"] =  $valor;
			$total[] = $objeto;
			$contador += $valor; //suma de todos los avisos
		}
		$vector = array();
		$vector["moviles"] = $total;
		$vector["avisos"] = $contador;
		$vector["media"] = $contador/count($datos);
		
		echo json_encode( $vector );
		break;
	case "zonasegura":	
		$datos = $gestor->getZonaSegura();
		$total = array();
		$contador = 0;
		foreach($datos as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["aviso"] = $valor;
			$total[] = $objeto;
			$contador += $valor; //suma de todos los avisos
		}
		$vector = array();
		$vector["moviles"] = $total;
		$vector["avisos"] = $contador;
		$vector["media"] = $contador/count($datos);
		
		echo json_encode( $vector );		
		break;
}




?>