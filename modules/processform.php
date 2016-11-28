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
          $id = trim($_GET['id']);
          $cantidad = trim($_GET['cantidad']);
          if (!$cantidad == "") {
               $valor = $cantidad * 1000;
               $total = $valor *2;
               echo "".$valor.",".$total."";
               // echo "".$valor."";
          }else{
               echo "invalid";
          }
     }

    
    
    function calcularValor($inicial){
         global $multiplo ;
         $calculo = $inicial * $multiplo;
        return $calculo."";     
    } 
    
?>