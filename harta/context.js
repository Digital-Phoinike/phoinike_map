var hash = window.location.hash.substr(1);
var mapOptions = {
     tap: false,
     center: [39.91381644734087, 20.055112781752946],
     zoom: 12,
     maxZoom : 20,
     minZoom: 10,
     touchZoom: true,
     maxBounds: [[39.690784799474905, 19.81299812520738],[40.098806006678494, 20.262505016975012]],
 };
 var map = L.map('map', mapOptions);
 //L.control.pan().addTo(map);


 var  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
 attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   }).addTo(map);

var allsites =  L.geoJSON(sites, {}).addTo(map);
