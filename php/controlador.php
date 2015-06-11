<?php
require_once 'Gestor.php';

//Inicio de sesión para tratar los archivos sólo una vez.
session_start();
$estagestor = -1;

if( !isset($_SESSION['migestor'] ) ){
	$estagestor = 0;
	$gest = new Gestor2();
	$_SESSION['migestor'] = serialize($gest);
	
}else{
	$estagestor = 1;
}
$gestor = unserialize( $_SESSION['migestor'] );

$accion = $_GET["accion"]; 
switch($accion){
	case "cuantosmoviles": //Indica la cantidad de moviles encontrada en los archivos.
		$cuantos = $gestor->getImeis();
		$objeto = array();
		$objeto["cuantos"]=count($cuantos);
		$objeto["gestor"] = $estagestor;	
		echo json_encode($objeto);
		break;	
		
	case "tiempouso":		//Indica el tiempo de uso de cada app en cada movil.
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
		$vector["gestor"] = $estagestor;		
		echo json_encode( $vector);
		break;
		
	case "smsgenerados": //Indica el número de sms generados por cada movil.
		$botones = $gestor->getSMSenviados();
		$total = array();
		$contador = 0;
		foreach($botones as $key => $valor){
			$objeto = array();
			$objeto["tipo"] = $key; //el movil
			$objeto["valor"] = $valor; $contador += $valor;
			$total[] = $objeto;
		}
		$vector = array();
		$vector["moviles"] = $total;
		$vector["total"] = $contador; //cantidad total de sms.
		$vector["media"] = $contador / count($botones);		
		$vector["gestor"] = $estagestor;			
		echo json_encode( $vector );
		break;
	
	case "mododuchatotal": //Indica el número de veces que se ha activado el modo ducha en total.
		$mododucha = $gestor->getModoDucha();		
		$contador = array(); 
		$contador["15"]=0;
		$contador["30"]=0;
		$contador["45"]=0;
		$contador["pe"]=0;
		foreach($mododucha as $key => $valor){
			 $contador["15"] += $valor["15"];
			 $contador["30"] += $valor["30"];
			 $contador["45"] += $valor["45"];
			 $contador["pe"] += $valor["pe"];		 	
		}		
		$cuanto = max($contador);
		$indice = array_search($cuanto,$contador); //averiguar cual es el más utilizado
		
		$total = array(); 
		foreach($contador as $key => $valor){
			$objeto["tipo"] = $key;
			$objeto["valor"] = $valor;
			$total[] = $objeto;
		}	
		$vector = array();
		$vector["moviles"] = $total;
		$vector["mas"] = $indice;
		echo json_encode( $vector );
		break;
		
	case "mododuchamovil": //Indica el número de veces que se ha activado el modo ducha por movil.
		$mododucha = $gestor->getModoDucha();	
		foreach($mododucha as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["15"] = $valor["15"]; 
			$objeto["30"] = $valor["30"]; 
			$objeto["45"] = $valor["45"]; 
			$objeto["pe"] = $valor["pe"];
			$total[] = $objeto;
		}	
		$vector = array();
		$vector["moviles"] = $total;		
		$vector["gestor"] = $estagestor;			
		echo json_encode( $vector );
		break;
		
	case "redneuronalmovil":   //Indica cuantos avisos de red neuronal se han generado por movil.
		$datos = $gestor->getAvisosRedNeuronal();
		$total = array(); 
		foreach($datos as $key => $valor){
			$objeto = array();
			$objeto["movil"] = $key;
			$objeto["sentado"] = $valor["sentado"]; 
			$objeto["golpe"] = $valor["golpe"];     
			$objeto["correr"] = $valor["correr"];  
			$objeto["caida"] = $valor["caida"];	   
			$total[] = $objeto;
		}							
		$vector = array();
		$vector["moviles"]=  $total;
		$vector["gestor"] = $estagestor;			
		echo json_encode( $vector );
		break;
		
	case "redneuronaltotal":	//Indica cuantos avisos de red neuronal se han generado en total.
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
		$vector["gestor"] = $estagestor;			
		echo json_encode( $vector );	
		break;
		
	case "botonrojo": //Indica cuantos avisos de alerta se han generado.
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
		$vector["avisos"] = $contador; //total de avisos.
		$vector["media"] = $contador/count($datos);
		$vector["gestor"] = $estagestor;	
		echo json_encode( $vector );
		break;
		
	case "botontranquilidad": //Indica cuantos avisos de tranquilidad se han generado.
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
		$vector["gestor"] = $estagestor;			
		echo json_encode( $vector );
		break;
		
	case "bateriabaja": //Indica cuantos avisos de batería baja se han generado.
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
		$vector["gestor"] = $estagestor;			
		echo json_encode( $vector );
		break;
		
	case "zonasegura":	 //Indica cuantos avisos de salida de la zona segura se han generado.
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
		$vector["gestor"] = $estagestor;
		echo json_encode( $vector );		
		break;
}




?>