
window.addEventListener("load",
  function(){
        var xhr = createCORSRequest("GET","http://www.timeapi.org/pdt/in+two+hours");
        if (!xhr) {
               throw new Error('CORS not supported');
        }
        xhr.send();
        xhr.responseType = '';
        console.log("Respuesta: " + xhr.responseText);
  },false);

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    console.log("1"+url);
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {
    console.log("2"+url);
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    console.log("3"+url);
    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
