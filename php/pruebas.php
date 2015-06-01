<?php
require_once 'Gestor.php';

$gestor = new Gestor();

//cuantos moviles diferentes hay.
echo "Cuantos moviles ";
$losimeis = $gestor->getImeis();
echo count($losimeis); 

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//cuantos dias de uso en total. ? 
echo "Cuantos días de uso total ";
$losimeisydias = $gestor->getImeisDia();
echo count($losimeisydias);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";
	
//tiempo de uso de cada app en cada movil por día.
echo "Tiempo de uso de cada app por movil y dia <br/>" ;
$tiempos = $gestor->getUsoDiario();
print_r($tiempos);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//botones pulsados en cada movil por día.
echo "Botones pulsados en cada movil por día.<br/>";
$botones = $gestor->getBotonesPulsados();
print_r($botones);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//avisos de red neuronal en cada movil y día.
echo "Avisos de red neuronal por movil y dia <br/>";
$avisosred = $gestor->getAvisosRedNeuronal();
print_r($avisosred);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//SMS generados por cada movil
echo "avisos de sms generados por cada movil <br/>";
$sms = $gestor->getSMSenviados();
print_r($sms);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//avisos de tranquilidad
echo "avisos de tranquilidad <br/>";
$tranqui = $gestor->getAvisoTranquilidad();
print_r($tranqui);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//avisos de alerta
echo "avisos de alerta <br/>";
$alerta = $gestor->getAvisoAlerta();
print_r($alerta);

echo "<br/><br/>";
echo "<br/><br/>";
echo "<br/><br/>";

//avisos de l modo ducha
echo "Modoo ducha <br/>";
$ducha = $gestor->getModoDucha();
print_r($ducha);


?>