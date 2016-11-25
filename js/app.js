$(document).foundation()

//objeto XMLHttpRequest (Ajax)
var asyncRequest;
var idGlobal;

function iniciar(){
	var x = document.getElementById("tabla").rows.length;
	for(var i = 0; i < x; i++){
		document.getElementById("valor"+(i+1)).addEventListener("blur", recalcular, false);
	}


	//campo global
	document.getElementById('multiplo').addEventListener("blur", actualizarRegistros, false);
}

function recalcular(e){
	var url = "modules/processform.php?opcion=editaregistro";
	idGlobal = e.target.parentNode.parentNode.getAttribute("id");
	url += "&nuevovalor=" + e.target.value +"&multiplo=" + 
							document.getElementById('multiplo').value; 	
	try {
			asyncRequest = new XMLHttpRequest();
			asyncRequest.addEventListener("readystatechange", stateChange, false);
			asyncRequest.open("GET", url, true);
			asyncRequest.send(null);
	} catch (excepcion){		
	}	
}
	
function stateChange() {
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {		
		var response = asyncRequest.responseText;		
		if(response != "invalid"){
			document.getElementById("total"+idGlobal).value = response;
			document.getElementById("j1").value = response;
		}			 
	}//end if principal 
}


//***procesamientdo de campos globales***//

function actualizarRegistros(){
	var globalValor = document.getElementById('multiplo').value;
	var x = document.getElementById("tabla").rows.length;
	
	for(var i = 0; i < x; i++){
		recalcularGlobal(document.getElementById("valor"+(i+1)), globalValor);
	}
}

function recalcularGlobal(element, nuevoValor) {
	var url = "modules/processform.php?opcion=globales";
	var rowidGlobal = element.parentNode.parentNode.getAttribute("id");
	console.log("Id de la fila--: " + rowidGlobal);
	url += "&nuevovalor=" + element.value +"&multiplo=" + nuevoValor; 
	try {
		asyncRequest = new XMLHttpRequest();		
		asyncRequest.addEventListener("readystatechange", function(){stateChangeGlobal(rowidGlobal) }, false);
		asyncRequest.open("GET", url, true);
		asyncRequest.send(null);
	} catch (excepcion) {
		//console.log(excepcion);
	}
}

function stateChangeGlobal(row) {
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {		
		var response = asyncRequest.responseText;		
		if(response != "invalid"){
			console.log("Id de la fila Procesada----> " + row);
			document.getElementById("total"+row).value = response;
			document.getElementById("j1").value = "Todos los valores de la tabla actualizados.";
		}			 
	}//end if principal 
}











window.addEventListener("load",iniciar,false);
