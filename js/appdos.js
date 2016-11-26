$(document).foundation()


var test = function saludar(nombre, callback){
	 console.log("2");
	var saludo = "Hola " + nombre;
	callback(saludo);
}

function getSaludo(saludo){
	 console.log("3");
	console.log(saludo);
}


test("Fernando" ,  getSaludo);
// window.addEventListener("load", function(){ console.log("1");saludar("Fernando",function(saludo){
// 	 console.log("3");
// 	console.log(saludo);
// });}, false);

// window.addEventListener("load", function(){ console.log("1");saludar("Fernando",getSaludo);}, false);