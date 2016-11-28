
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


function cambiarElemento(tdElem, evento, e){	
	var valor = tdElem.textContent;
	try{
		if (evento == "click" && e.target.firstChild.nodeType == 3) {
			var nodoInput = nuevoNodo(valor);
			console.log(nodoInput);
			tdElem.innerHTML = "";	
			tdElem.appendChild(nodoInput);
			nodoInput.addEventListener("blur",function(){reestablecerValor(tdElem, event);},false);
			nodoInput.focus();
			var range = nodoInput.createTextRange();
			range.collapse(false);
			range.select();


		}
	}catch(exception){
	}
	
}

function reestablecerValor(tdElem, e){
	console.log("perdi el foco");
	var valorActual = e.target.value;
	tdElem.innerHTML = "";
	tdElem.appendChild(document.createTextNode(valorActual));
}


function nuevoNodo(contenido){
	var input = document.createElement("input");
	input.type = "text";
	input.value = contenido;
	input.focus();
    input.setSelectionRange(0,(contenido.length+1));
	return input;
	
}




function iniciar(){
	establecerTabla("tabla");
	establecerTriggerDeFila("producto");
}
window.addEventListener("load",iniciar,false);