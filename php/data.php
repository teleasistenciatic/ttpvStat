<?php

$tipos = array("botón" => 0,"contactos" => 0,"aviso" => 0,"sms" => 0);

$fila = 1;       
//$archivo = "ttpstats-20150526-103909.csv";     
$archivo = "../archivos/prueba.csv";
if (($gestor = fopen($archivo, "r")) !== FALSE) {
    while (($datos = fgetcsv($gestor, 1000, ";")) !== FALSE) {
        $numero = count($datos);
       // echo "<p> $numero de campos en la línea $fila: <br /></p>\n";
        $fila++;
       /* for ($c=0; $c < $numero; $c++) {
            echo $datos[$c] . "<br />\n";
			
			
        }*/
		foreach ($tipos as $k => $valor) {
			if($numero>1){
				$pos=strpos($datos[1],$k);
				if($pos!==false){
					$tipos[$k]++;
				}
			}
		}				
		
    }
    fclose($gestor);
}

$texto = array();
foreach($tipos as $k => $valor){
	$objeto=array();
	$objeto["tipo"] = $k;
	$objeto["valor"] = $valor;
	$texto[] = $objeto;
}





echo json_encode( $texto );



?>