<?php

     $valor = trim($_GET['nuevovalor']);     
     if(!$valor == ""){
          $calculo = $valor *2;
          echo $calculo." Precio Total Producto";      
     }
    
?>