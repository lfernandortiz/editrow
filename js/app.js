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
	for (var i = 0; i < x; i++) {
		makeRequest(document.getElementById("valor" + (i + 1)), globalValor)
			.then(function(datums) {
				document.getElementById("total"+i).value = datums;
				document.getElementById("j1").value = "Todos los valores de la tabla actualizados.";
			})
			.catch(function(err) {
				console.error('Augh, there was an error!', err.statusText);
			});
	}//fin del for
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
				console.log(response_);
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
}
















window.addEventListener("load",iniciar,false);
