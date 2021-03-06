
//1 registro de los disparadores de evento
var nroDeFilas;
var tabla;
var currentNodeInput;


//Establezco la variableglobal nro de Filas, pasando como argumento el id de la tabla
function establecerTabla(nombreTabla){
	tabla = document.getElementById(nombreTabla);
	nroDeFilas = tabla.tBodies[0].rows.length;
	console.log(nroDeFilas);
}


//Usada para establecer los elementos que dispara los eventos en la fila
//los parametros son:
//1 Columna o celda de la fila que dispara el evento
//2 Arreglo con las demas celdas que recibel el resultado en el orden de la respuesta del servidor
//3 url - proceso del lado del servidor que procesa la solicitud
function establecerTriggerDeFila(idTrigger, resultados, url){
	for(var i = 0; i < nroDeFilas; i++){
		var tdElem = tabla.querySelector('#'+idTrigger + (i+1));
		establecerEventosTrigger(tdElem, resultados, url, idTrigger);
	}	
}


function establecerEventosTrigger(tdElem, resultados, url, trigger){
	tdElem.addEventListener("click", function(){cambiarElemento(tdElem, "click", event, resultados, url, trigger);},false);
	// tdElem.addEventListener("blur", function(){cambiarElemento(tdElem, "blur", event, resultados, url);},false);
}


//interacciona entre input text y el contenido de la celda
function cambiarElemento(tdElem, evento, e, resultados, url, trigger){	
	var valor = tdElem.textContent;
	try{//si el evento es click y el hijo del td es un nodo de texto (type=3)
		if (evento == "click" && e.target.firstChild.nodeType == 3) {
			var nodoInput = nuevoNodo(valor);
			tdElem.innerHTML = "";
			tdElem.appendChild(nodoInput);
			//descomente la siguiente linea si desea que el cursor quede al final
			// nodoInput.value = nodoInput.value;	
			nodoInput.focus();
			nodoInput.addEventListener("blur",function(){reestablecerValor(tdElem, event, resultados, url, trigger);},false);
			nodoInput.addEventListener("keypress",function(){reestablecerValorEnter(tdElem, event);},false);			
		} //fin del if
	}catch(exception){
	}	
}


//reestablece el valor en la celda al oprimir la tecla enter
function reestablecerValorEnter(tdElem, e){	
	if (e.keyCode == 13) {
		console.log("Evento Teclado");
		var valorActual = formatoMiles(e.target.value.replace(",",""));
		if ("NaN" == valorActual || 0 == valorActual) {
			e.target.className += " errorInput";
		} else {			
			tdElem.innerHTML = "";
			tdElem.appendChild(document.createTextNode(valorActual));
		}
	}//fin if principal
}

//reestablece el valor en la celda al perder el foco
//Solamente este metodo hace la llamda asincronica
function reestablecerValor(tdElem, e, resultados, url, campo){
	console.log("Evento Blur");
	var valorActual = formatoMiles(e.target.value.replace(",",""));
	console.log("valor actual: "+ valorActual);
	if ("NaN" == valorActual || 0 == valorActual) {
		e.target.className += " errorInput";
	} else {
		var id = e.target.parentNode.parentNode.getAttribute("data-value");/// esto cambiarlo por un iput hidden
		var fila = e.target.parentNode.parentNode.getAttribute("id");
		url += id+"&"+campo+"="+valorActual.replace(",","");//quitamos las comas
		console.log("*Async Request* " + url);
		actualizarRegistros(fila, resultados, url, tdElem);
		tdElem.innerHTML = "";
		tdElem.appendChild(document.createTextNode(valorActual));		
	}
}

//metodo Ajax
function actualizarRegistros(fila, resultados, url, tdElem){
	var fila = fila;
	try {
			asyncRequest = new XMLHttpRequest();
			asyncRequest.addEventListener("readystatechange",function(){stateChange(fila,resultados, tdElem)}, false);
			asyncRequest.open("GET", url, true);
			asyncRequest.send(null);
	} catch (excepcion){		
	}	
}
	
function stateChange(fila,resultados, tdElem) {
	var tdelement = tdElem;
	if(asyncRequest.readyState >= 1 &&	asyncRequest.readyState <= 3 ){
		console.log(tdelement.className.includes(" spinner"));
		if( !tdelement.className.includes(" spinner") ){
			tdelement.className += " spinner";
			tdelement.parentNode.className = "";
		}
		
	}
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {		
		var response = asyncRequest.responseText.split(',');		
		var resultados = resultados.split(',');	
		console.log(response);	
		if (response != "invalid") {
			//valido que la respuesta contenga el mismo nro de element de resultados	
			if (resultados.length == response.length) {
				for (var i = 0; i < resultados.length; i++) {
					document.getElementById(resultados[i] + fila).innerHTML="";
					document.getElementById(resultados[i] + fila).appendChild(
												document.createTextNode(response[i]));					
				}
				console.log(tdelement);
				tdelement.className = "";
				tdelement.parentNode.className += "highlight";
			} else {
				console.error("La respuesta recibida no coincide con el nro de campos de la fila");
			}
		} //fin del if interno		
	}//end if principal 
} 


function nuevoNodo(contenido){
	var input = document.createElement("input");
	input.type = "text";
	input.value = contenido;
	input.focus();
    input.setSelectionRange(0,(contenido.length+1));
	return input;	
}

function formatoMiles(n, dp) {
	var s = '' + (Math.floor(n)),
		d = n % 1,
		i = s.length,
		r = '';
	while ((i -= 3) > 0) {
		r = ',' + s.substr(i, 3) + r;
	}
	return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10, dp || 2)) : '');
}


//simula la actividad del programador
function iniciar(){

	establecerTabla("tabla");	
	//Parametros: celda trigger | campos que se alteran en orden a la rpta del serv | url
	establecerTriggerDeFila("cantidad", "valor,total", "modules/processform.php?opcion=recalcular&id=");

}
window.addEventListener("load",iniciar,false);


