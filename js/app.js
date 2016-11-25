$(document).foundation()

//objeto XMLHttpRequest (Ajax)
var asyncRequest;
var idGlobal;

function iniciar(){
	var x = document.getElementById("tabla").rows.length;
	for(var i = 0; i < x; i++){
		document.getElementById("valor"+(i+1)).addEventListener("blur", recalcular, false);
	}
}

function recalcular(e){
	var url = "modules/processform.php?";
	idGlobal = e.target.parentNode.parentNode.getAttribute("id");
	console.log("Id de la fila: " + idGlobal);
	url += "nuevovalor=" + e.target.value; 	
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


window.addEventListener("load",iniciar,false);
