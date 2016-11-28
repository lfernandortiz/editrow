<?php
     $opcion = $_GET["opcion"];

      $multiplo = 0;


     if($opcion == "editaregistro")
     {
          $valor = trim($_GET['nuevovalor']);  
          $multiplo = trim($_GET['multiplo']);  
          if(!$valor == ""){                
               echo calcularValor($valor);      
          }  
     }

     if($opcion == "globales")
     {
          $valor = trim($_GET['nuevovalor']);  
          $multiplo = trim($_GET['multiplo']);  
          if(!$valor == ""){                
               echo calcularValor($valor);      
          }  
     }


     if ($opcion == "recalcular") {
          $valor = trim($_GET['idregistro']);
          $multiplo = trim($_GET['multiplo']);
          if (!$valor == "") {
               echo calcularValor($valor);
          }
     }

    

    
    function calcularValor($inicial){
         global $multiplo ;
         $calculo = $inicial * $multiplo;
        return $calculo."";     
    } 
    
?>