
//var mapOptions = {
//     tap: false,
//     center: [39.91381644734087, 20.055112781752946],
//     zoom: 10,
//     maxZoom : 20,
//     minZoom: 5,
//     touchZoom: true,
//     maxBounds: [[39, 19],[41, 21]],
// };
// var map = L.map('map', mapOptions);
// L.control.pan().addTo(map);


// var  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
// attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//   }).addTo(map);

//var allsites =  L.geoJSON(contextualSites, {
//  onEachFeature:popUpSites,
//  pointToLayer: function (feature, latlng) {
//    var markerStyle = {
//        fillColor: getColor(feature.properties.Type),
//        color: "#FFF",
//        fillOpacity: 1,
//        opacity: 0.5,
//        weight: 1,
//        radius: 10
//    };
//    return L.circleMarker(latlng, markerStyle);}
//  }).addTo(map);

//function popUpSites(f,l) {
//  var out = [];
//  //adds spaces in between entries
//  if (f.properties) {
//    out.push('<b>Name: </b>' + f.properties.Location);
//    out.push('<b>Site Type: </b>' + f.properties.Type);
//    out.push('<a href=#>Link to Page?</a>');
//    l.bindPopup(out.join("<br />"));
//  }
//};

//function getColor(type) {
//    return  type == "Site" ? '#000000' :
//        type == "Finiq"  ? '#880808' :
//        type == "Possible Site" ? '#BF40BF' :
//                        '#252525';
//}

//const legend = L.control.Legend({
//        position: "bottomright",
//        collapsed: false,
//        symbolWidth: 24,
//        opacity: 1,
//        column: 1,
//        legends: [{
//            label: "Site",
//            type: "circle",
//            fillColor: "#000000"
//        },{
//            label: "Finiq",
//            type: "circle",
//            fillColor: "#880808"
//        },  {
//            label: "Possible Site",
//            type: "circle",
//            fillColor: "#BF40BF"
//        }]
//    })
//    .addTo(map);
