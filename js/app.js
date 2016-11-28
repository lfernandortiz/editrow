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
			document.getElementById("j1").value = "Actualizado los registros en la fila: " + idGlobal;
		}			 
	}//end if principal 
}


//***procesamientdo de campos globales***//

function actualizarRegistros(){
	var globalValor = document.getElementById('multiplo').value;
	var x = document.getElementById("tabla").rows.length;
	var promises = [];	
	for (var i = 0; i < x; i++) {
		promises.push(makeRequest(document.getElementById("valor" + (i + 1)), globalValor));		
	}//fin del for
	Promise.all(promises).then(function(response) {
		var responses = response;
		for(var i = 0; i < response.length; i++){
			document.getElementById("total"+ (i+1)).value = responses[i];
		}
	}, function(err) {
		// error occurred
	});
	document.getElementById("j1").value = "Todos los valores de la tabla actualizados.";
}


function makeRequest(element, nuevoValor) {
	return new Promise(function(resolve, reject) {
		var url = "modules/processform.php?opcion=globales";
		var rowidGlobal = element.parentNode.parentNode.getAttribute("id");		
		url += "&nuevovalor=" + element.value +"&multiplo=" + nuevoValor; 
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onload = function() {
			if (this.status == 200 && this.readyState == 4 ) {
				var response_ = xhr.response;
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function() {
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send();
	});
}// fin del metodo makeRequest
















window.addEventListener("load",iniciar,false);
