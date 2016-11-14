// Code goes here

function loadXMLDoc(dname)
{
if (window.XMLHttpRequest)
{
  xhttp=new XMLHttpRequest();
}
else
{
  xhttp=new ActiveXObject("Microsoft.XMLDOM");
}

xhttp.open("GET",dname,false);
xhttp.send();
return xhttp.responseXML;
}

function getWholenameElement(node){
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0) // running internet explorer
  {
    return node.getElemntsByTagName("WHOLENAME")[0].text
  }
  else
  { 
    return node.getElementsByTagName("WHOLENAME")[0].textContent
  }
}

function getNames(xml) {
  var table="<table><tr><th>#</th><th>Name</th></tr>";
  var x = xml.getElementsByTagName("ENTITY");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    i +
    "</td><td>" +
    // x[i].getElementsByTagName("WHOLENAME")[0].childNodes[0].nodeValue +
      // x[i].childNodes[0].nodeName + x[i].childNodes[1].nodeName +
      //x[i].getElementsByTagName("WHOLENAME")[0].textContent +
      getWholenameElement(x[i]) +
    "</td></tr>";
  }
  table += "</table>"
  return table
}

document.getElementById("test_result").innerHTML = "readystatechanged nope";
try{
  xml = loadXMLDoc("global.xml")
  var entities = xml.getElementsByTagName("ENTITY");
  document.getElementById("test_result").innerHTML = "got " +
      entities.length + " entities. ";
}
catch(e)
{
  document.getElementById("test_result").innerHTML = "error: " + e;
}

try{
  document.getElementById("demo").innerHTML = getNames(xml)
} catch (e) {
  document.getElementById("demo").innerHTML = "error: " + e
}

try{
  document.getElementById("date").innerHTML += xml.getElementsByTagName("WHOLE")[0].getAttribute("Date");
} catch (e) {
  document.getElementById("Date").innerHTML = "error: " + e
}

// document.getElementById("test_result").innerHTML = "bla";


// var x = new XMLHttpRequest();
// x.open("GET", "http://ec.europa.eu/external_relations/cfsp/sanctions/list/version4/global/global.xml", true);
// x.onreadystatechange = function () {
//   if (x.readyState == 4 && x.status == 200)
//   {
//     var doc = x.responseXML;
//     document.getElementById("test_result").innerHTML = "doc loaded"
//     // …
//   }
//   else
//   {
//     document.getElementById("test_result").innerHTML = "loading failed" +
//     " x.readystate: " + x.readyState + " x.status: " + x.status
//   }
// };
// x.send(null);
