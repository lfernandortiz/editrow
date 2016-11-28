
//1 registro de los disparadores de evento
var nroDeFilas;


//Establezco la variableglobal nro de Filas, pasando como argumento el id de la tabla
function establecerTabla(nombreTabla){
	nroDeFilas = document.getElementById(nombreTabla).rows.length;
	console.log(nroDeFilas);
}


//Usada para establecer los elementos que dispara los eventos en la fila
//y cuales son los elementos que despliegan la respuesta, el segundo elemento
//es un array de objetos Elements. El tercero debe ser la url que atiende 
//la llamada ajax.
function establecerTriggerDeFila(idTrigger){
	for(var i = 0; i < nroDeFilas; i++){
		var tdElem = document.getElementById(idTrigger + (i+1));
		establecerEventosTrigger(tdElem);
	}	
}


function establecerEventosTrigger(tdElem){
	tdElem.addEventListener("click", function(){cambiarElemento(tdElem, "click", event);},false);
	tdElem.addEventListener("blur", function(){cambiarElemento(tdElem, "blur", event);},false);
}


//interacciona entre input text y el contenido de la celda
function cambiarElemento(tdElem, evento, e){	
	var valor = tdElem.textContent;
	try{
		if (evento == "click" && e.target.firstChild.nodeType == 3) {
			var nodoInput = nuevoNodo(valor);
			console.log(nodoInput);
			tdElem.innerHTML = "";
			tdElem.appendChild(nodoInput);
			// nodoInput.value = nodoInput.value;	
			nodoInput.focus();
			nodoInput.addEventListener("blur",function(){reestablecerValor(tdElem, event);},false);
			nodoInput.addEventListener("keypress",function(){reestablecerValorEnter(tdElem, event);},false);
			
		} //fin del if
	}catch(exception){
	}
	
}


function reestablecerValor(tdElem, e){
	console.log("perdi el foco");
	var valorActual = formatoMiles(e.target.value.replace(",",""));
	if("NaN" == valorActual){
		alert("El valor ingresado no es valido");		
	}else{
		tdElem.innerHTML = "";
		tdElem.appendChild(document.createTextNode(valorActual));
	}	
}

//reestablece el valor al oprimir la techa enter
function reestablecerValorEnter(tdElem, e){
	if (e.keyCode == 13) {
		var valorActual = formatoMiles(e.target.value.replace(",",""));
		if ("NaN" == valorActual) {
			alert("El valor ingresado no es valido");
		} else {
			tdElem.innerHTML = "";
			tdElem.appendChild(document.createTextNode(valorActual));
		}
	}//fin if principal
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
	establecerTriggerDeFila("producto");
}
window.addEventListener("load",iniciar,false);