var hash = window.location.hash.substr(1);
var mapOptions = {
     tap: false,
     center: [39.91381644734087, 20.055112781752946],
     zoom: 16,
     maxZoom : 20,
     minZoom: 10,
     maxBounds: [[39.690784799474905, 19.81299812520738], [40.098806006678494, 20.262505016975012]],
     panControl: true,
     fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    },
     touchZoom: true
 }
var map = new L.map('map', mapOptions);
var mapWidth = map.getSize().x;
var mapHeight = map.getSize().y;
var popUpWidth = mapWidth * 0.8;
var popUpHeight = mapHeight * 0.6;
var imageWidth = popUpWidth * 0.8;
var imageHeight = imageWidth * 0.6;
var images = [null, "image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
var currentImage = null;
var eraSlider = document.getElementById('slider');
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxNativeZoom: 17,
            maxZoom: 20,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});

var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxNativeZoom:17,
                    maxZoom:20
                    });
var langNumber=0;
var numFilter=3;
var placesImported = L.geoJson(places, {
  onEachFeature: popUpPlaces
});

var allSites = L.geoJSON(contextualSites, {
    //onEachFeature: function (feature, layer) {
    //    layer.bindTooltip(feature.properties.Location);
    //},
    onEachFeature: popUpPlaces,
    pointToLayer: function (feature, latlng) {
        var markerStyle = {
            fillColor: getColor(feature.properties.Type),
            color: "#FFF",
            fillOpacity: 1,
            opacity: 0.5,
            weight: 1,
            radius: 10
        };
        return L.circleMarker(latlng, markerStyle);
    }
}).addTo(map);

var entranceImported = L.geoJSON(entrance, {
    onEachFeature: popUpEntrance
});
var pathsImported = L.geoJSON(paths, {
    style: {
        color: "orange",
        weight: 4,
        opacity: .3
        }
    });
var buildingsImported = L.geoJSON(buildings, {
    style: {
        weight: 1,
        color: "black",
        opacity: .5,
        fillOpacity: .3
        }
    }).addTo(map);
var wallsImported = L.geoJSON(walls, {
    style: {
        weight: 3,
        color: "black",
        opacity: 0.8,
        }
    });
var streetsImported = L.geoJSON(streets, {
    style: {
        weight: 2,
        color: "white",
        opacity: 0.3,
        dashArray: '12'
        }
    });
var infoIcon = L.icon({
    iconUrl: 'info.png',
    iconSize: [150, 75], // size of the icon
    iconAnchor: [75, 100], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
    });
var infoIconAl = L.icon({
    iconUrl: 'infoAL.png',
    iconSize: [150, 75], // size of the icon
    iconAnchor: [75, 100], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
    });
var entrancePopup = "<center><b>Ancient Phoenike</b></center><br>The settlement of ancient Phoenike was one of the largest communities in the region of Epirus during the Hellenistic period and was the capital of Chaonia, one of the fourteen Epirote tribal regions. While evidence from the 5th and 4th centuries BCE point to the settlement’s earliest origins, its true urban development dates primarily to its Hellenistic phase in the 3rd century BCE, culminating in the city emerging as the capital of the Epirote League. During the Third Macedonian War, the region of Chaonia supported the Roman Republic, resulting in Phoenike being spared from Roman destruction when the war ended in 168 BCE. As a Roman community, Phoenike lasted for several centuries and experienced an important phase under the Byzantine Emperor Justinian during the 6th century CE. During this period, Phoenike became a vescoval see and featured a variety of early Christian religious buildings.<br><br>First excavated by Luigi Maria Ugolini in the 1920s, later by Albanian archaeologists, and more recently by an Albanian-Italian collaboration between the Institute of Archaeology and University of Bologna, the history of Phoenike continues to be written as archaeologists peel back its layers year-by-year. This interactive map tells the story of the most important archaeological discoveries over the past century, including grand public buildings, monumental defensive structures, fascinating private residences, and a multilayered burial ground which served as the final resting place for centuries of generations of the settlement’s inhabitants. Within the map, occasional links to 3D content help bring this story to life and illustrate the reconstructions imagined by archaeologists who have excavated and studied this site. <br><br>Enjoy your exploration of ancient Phoenike!<br><br><i>Designed and created by <b>Sabian Hasani and Tyler Duane Johnson</b> with the support of the <b>Albanian Ministry of Culture</b> and the <b>Albanian-Italian Archaeological Mission at Phoenike</b></i><br><br>";
var entrancePopupAL = "<center><b>Foinike E Lashtë</b></center><br>Vendbanimi i Foinikes së lashtë ishte një nga qendrat më të mëdha në rajonin e Epirit gjatë periudhës helenistike, njëherazi edhe kryeqendër e Kaonisë, një nga katërmbëdhjetë rajonet fisnore epirote. Ndërkohë që të dhënat që vijnë nga shek. 5 dhe 4 p.e.s dëshmojnë për origjinën më të hershme të vendbanimit, zhvillimi i vërtetë urban i tij daton kryesisht në periudhën helenistike, në shek. 3 p.e.s, periudhë gjatë të cilës qyteti arrin kulmin si kryeqendër e Ligës Epirote. Gjatë Luftës së Tretë Maqedonase, rajoni i Kaonisë përkrahu Republikën Romake, fakt ky që e shpëtoi Foiniken nga raprezaljet romake në përfundim të luftës në vitin 168 p.e.s. Si një komunitet romak, Foinike vijoi jetën për disa shekuj duke përjetuar një fazë të rëndësishme nën perandorin bizantin Justinian, gjatë shekullit të 6 -të e.s. Gjatë kësaj periudhe, Foinike u bë një qendër episkopale, e pajisur me një sërë ndërtesash religjioze, që datohen në periudhën e kristianizmit të hershëm.<br><br>Gërmimet e para kanë nisur në vitet 1920 nga Luigi Maria Ugolini, më pas nga arkeologë shqiptarë dhe së fundmi nga projekti i përbashkët shqiptaro-italian, bashkëpunim midis Institutit të Arkeologjisë (ASA) dhe Universiteti i Bolonjës. Historia e Foinikes antike vijon të shkruhet ndërsa arkeologët nxjerrin në dritë shtresëzimet e ndryshme vit pas viti. Kjo hartë interaktive tregon historinë e zbulimeve më të rëndësishme arkeologjike të shekullit të kaluar, përfshirë ndërtesat e mëdha publike, strukturat monumentale mbrojtëse, rezidencat magjepsëse të banimit dhe një varrezë me disa faza, e cila për shekuj ka shërbyer si vëndbanimi i fundit për banorët e Foinikes antike. Në brëndësinë e saj harta përmban disa materiale 3D, të cilat ndihmojnë në paraqitjen e kësaj historie dhe ilustrojnë rindërtimet e ideuara nga arkeologët që kanë e gërmuar dhe studiuar këtë qendër të rëndësishme arkeologjike.<br><br><i>Projektuar dhe krijuar nga <b>Sabian Hasani dhe Tyler Duane Johnson</b> me mbështetjen e <b>Ministrisë Shqiptare të Kulturës</b> dhe <b>Misionit Arkeologjik Shqiptaro-Italian në Foinike</b></i><br><br>";
var english = true;
var entranceMarkerAL;
var baseLayers = {
    "Satellite Imagery": Esri_WorldImagery,
    "Street Map": openStreetMap
};
var clusterLayers = {
    "Walking Path": pathsImported,
    "Ancient Walls": wallsImported,
    "Ancient Buildings": buildingsImported,
    "Ancient Streets": streetsImported
};
var current_position
var positionShown = false;
var needToNotifyDistance = true;
var needToNotifySettings = true;
var controls = L.control.layers(baseLayers, clusterLayers).addTo(map);



Esri_WorldImagery.addTo(map);
map.addLayer(placesImported);
map.addLayer(wallsImported);
map.addLayer(pathsImported);

entranceMarker = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopup, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);




function popUpSites(f,l) {
  var out = [];
  //adds spaces in between entries
  if (f.properties) {
    out.push('<b>Name: </b>' + f.properties.Location);
    out.push('<b>Site Type: </b>' + f.properties.Type);
    out.push('<a href=#>Link to Page?</a>');
    l.bindPopup(out.join("<br />"));
  }
};

function getColor(type) {
    return  type == "Site" ? '#000000' :
        //type == "Finiq"  ? '#880808' :
        type == "Possible Site" ? '#BF40BF' :
                        '#252525';
}



function changeLanguage(lang) {

    if (lang == "en") {
        //seems like some code is getting repeated in this if statement, but not sure.....
        langNumber=0;
      eraSlider.noUiSlider.destroy();
        map.removeLayer(placesImported);
        placesImported = new L.geoJson(places,{
          onEachFeature:popUpPlaces,
          filter:
          function(feature, layer) {
            return (feature.properties.timelineNumber <= numFilter);
          },
        });

        if (map.getZoom() >14){
          placesImported.addTo(map);
        };

        map.removeLayer(entranceMarkerAL);
        entranceMarker = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopup, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
        english = true;
        controls.remove();
        clusterLayers = {
            "Walking Path": pathsImported,
            "Ancient Walls": wallsImported,
            "Ancient Buildings": buildingsImported,
            "Ancient Streets": streetsImported
        };
        baseLayers = {
            "Satellite Imagery": Esri_WorldImagery,
            "Street Map": openStreetMap
        };
        controls = L.control.layers(baseLayers, clusterLayers).addTo(map);

        sliderCreation(langNumber, numFilter);
    /*    noUiSlider.create(eraSlider, {
            start: [numFilter],
            step:1,
            range: {
                'min': [0],
                'max': [3]
            },
            tooltips:true,
            pips: {
        mode: 'count',
        values: 4,
        density: 25
    },
            format: {
              to: function(value) {
              // Math.round and -1, so 1.00 => 0, 2.00 => 2, etc.

              return ['4th century BCE', '3rd century BCE', '2nd century BCE', 'Roman Period'][Math.round(value)];
        },
            from: Number
            }
        });*/
        eraSlider.noUiSlider.on('change', function (values, handle) {

            eraFilter = values[handle];

            if (english) {
            numFilter = getENFilterNumber(eraFilter);
        }
        else {
          numFilter = getALFilterNumber(eraFilter);
        }

            map.removeLayer(placesImported);
            map.removeLayer(buildingsImported);
            controls.remove();
            console.log(english);

            if (english) {
            placesImported = new L.geoJson(places,{
              onEachFeature:popUpPlaces,
              filter:
              function(feature, layer) {
                return (feature.properties.timelineNumber <= numFilter);
              },
          }).addTo(map);
        }
        else {
          placesImported = new L.geoJson(places,{
            onEachFeature:popUpPlacesAL,
            filter:
            function(feature, layer) {
              return (feature.properties.timelineNumber <= numFilter);
            },
          }).addTo(map);

        }
            //Commented this part out for now...is it necessary?
          buildingsImported = new L.geoJSON(buildings, {
            style: {
                 weight: 1,
                 color: "black",
                 opacity: .5,
                 fillOpacity: .3
                },
            filter:
            function(feature, layer) {
              return (feature.properties.numFilter <= numFilter);
            },
          }).addTo(map);

          if (english) {
          clusterLayers = {
              "Walking Path": pathsImported,
              "Ancient Walls": wallsImported,
              "Ancient Buildings": buildingsImported,
              "Ancient Streets": streetsImported
          };
          baseLayers = {
              "Satellite Imagery": Esri_WorldImagery
          };
          }
          else {
            clusterLayers = {
                "Rrugë Këmbësore": pathsImported,
                "Muret e Lashta": wallsImported,
                "Godinat e Lashta": buildingsImported,
                "Rrugët e Lashta": streetsImported
            };
            baseLayers = {
                "Imazhe Satelitore": Esri_WorldImagery,
                "Street Map": openStreetMap
            };

          }

            controls = L.control.layers(baseLayers, clusterLayers).addTo(map);


        });
    }
    if (lang == "al") {
      langNumber=1;
      eraSlider.noUiSlider.destroy();
      map.removeLayer(placesImported);
      placesImported = new L.geoJson(places,{
        onEachFeature:popUpPlacesAL,
        filter:
        function(feature, layer) {
          return (feature.properties.timelineNumber <= numFilter);
        },
      });

      if (map.getZoom() >14){
        placesImported.addTo(map);
      };

      map.removeLayer(entranceMarker);
        entranceMarkerAL = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIconAl }).bindPopup(entrancePopupAL, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
        english = false;
        controls.remove();
        clusterLayers = {
            "Rrugë Këmbësore": pathsImported,
            "Muret e Lashta": wallsImported,
            "Godinat e Lashta": buildingsImported,
            "Rrugët e Lashta": streetsImported
        };
        baseLayers = {
            "Imazhe Satelitore": Esri_WorldImagery
        };
        controls = L.control.layers(baseLayers, clusterLayers).addTo(map);
        sliderCreation(langNumber, numFilter);
      /*  noUiSlider.create(eraSlider, {
            start: [numFilter],
            step:1,
            range: {
                'min': [0],
                'max': [3]
            },
            tooltips:true,
            pips: {
        mode: 'count',
        values: 4,
        density: 25
    },
            format: {
              to: function(value) {
              // Math.round and -1, so 1.00 => 0, 2.00 => 2, etc.

          return ['shekulli 4 p.e.s', 'shekulli 3 p.e.s','shekulli 2 p.e.s', 'Periudha romake'][Math.round(value)];
        }
            ,
            from: Number
            }
        }); */
        eraSlider.noUiSlider.on('change', function (values, handle) {

            eraFilter = values[handle];

            if (english) {
            numFilter = getENFilterNumber(eraFilter);
        }
        else {
          numFilter = getALFilterNumber(eraFilter);
        }

            map.removeLayer(placesImported);
            map.removeLayer(buildingsImported);
            controls.remove();
            console.log(english);

            if (english) {
            placesImported = new L.geoJson(places,{
              onEachFeature:popUpPlaces,
              filter:
              function(feature, layer) {
                return (feature.properties.timelineNumber <= numFilter);
              },
          }).addTo(map);
        }
        else {
          placesImported = new L.geoJson(places,{
            onEachFeature:popUpPlacesAL,
            filter:
            function(feature, layer) {
              return (feature.properties.timelineNumber <= numFilter);
            },
          }).addTo(map);

        }

          buildingsImported = new L.geoJSON(buildings, {
              style: {
                  weight: 1,
                  color: "black",
                  opacity: .5,
                  fillOpacity: .3
                },
            filter:
            function(feature, layer) {
              return (feature.properties.numFilter <= numFilter);
            },
          }).addTo(map);

          if (english) {
          clusterLayers = {
              "Walking Path": pathsImported,
              "Ancient Walls": wallsImported,
              "Ancient Buildings": buildingsImported,
              "Ancient Streets": streetsImported
          };
          baseLayers = {
              "Satellite Imagery": Esri_WorldImagery,
              "Street Map": openStreetMap
          };
          }
          else {
            clusterLayers = {
                "Rrugë Këmbësore": pathsImported,
                "Muret e Lashta": wallsImported,
                "Godinat e Lashta": buildingsImported,
                "Rrugët e Lashta": streetsImported
            };
            baseLayers = {
                "Imazhe Satelitore": Esri_WorldImagery,
                "Street Map": openStreetMap
            };

          }

          controls = L.control.layers(baseLayers, clusterLayers).addTo(map);


        });

    }
}

function popUpPlaces(f, l) {
    l.bindTooltip(f.properties.Name);
    var out = [];
    var myImage;
    var myImageW = imageWidth;
    var myImageH = imageHeight;
    if (f.properties) {
        out.push('<b><u>' + f.properties.Name + '</u></b>');
        out.push('<br><b>Date of construction: </b>' + f.properties.Date);
        if (f.properties.ThreeD) {
            out.push('<br><b>3D model: </b>' + '<a href="' + f.properties.ThreeD + '"target="_blank">Open in a new tab</a>');
        }
        out.push('<br><b>Description: </b>' + f.properties.Descriptio + '<br><center>');
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}

function popUpPlacesAL(f, l) {
    l.bindTooltip(f.properties.ALName);
    var out = [];
    var myImage;
    var myImageW = imageWidth;
    var myImageH = imageHeight;
    if (f.properties) {
        out.push('<b><u>' + f.properties.ALName + '</u></b>');
        out.push('<br><b>Data e ndërtimit: </b>' + f.properties.ALDate);
        if (f.properties.ThreeD) {
            out.push('<br><b>Modeli 3D: </b>' + '<a href="' + f.properties.ThreeD + '"target="_blank">Hape në një faqe tjetër</a>');
        }
        out.push('<br><b>Përshkrimi: </b>' + f.properties.ALDescriptio + '<br><center>');
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}

function popUpEntrance(f, l) {
    var out = [];
    if (f.properties) {
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}

map.on('popupclose', function(e){
    map.dragging.enable();
    map.addControl(controls);
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    map.zoomControl.addTo(map);
    map.panControl.addTo(map);
    map.fullscreenControl.addTo(map);
    map.setMaxBounds([[39.690784799474905, 19.81299812520738], [40.098806006678494, 20.262505016975012]]);
});

map.on('zoomstart', function (e) {
    if (positionShown == true) {
        current_position.closeTooltip();
    }
});

map.on('movestart', function (e) {
    if (positionShown == true) {
        current_position.closeTooltip();
    }
});

map.on('resize', function(e){
    map.closePopup();

    resized = true;
    if (positionShown == true) {
        current_position.closeTooltip();
    }
});


map.on('popupopen', function (event) {
    if (positionShown == true) {
        current_position.closeTooltip();
    }
    map.dragging.disable()
    map.removeControl(controls);
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.zoomControl.remove();
    map.panControl.remove();
    map.fullscreenControl.remove();
    map.setMaxBounds([[37.17168400781412, 14.555219061565039],[44.937766393643194, 24.445555079300775]]);
    var popup = event.popup;
    var marker = popup._source;
    var content = popup.getContent();
    var oldImageStart = content.indexOf('<c');
    var originalContent = content.substring(0, oldImageStart);
    mapWidth = map.getSize().x;
    mapHeight = map.getSize().y;
    popUpWidth = mapWidth * 0.8;
    popUpHeight = mapHeight * 0.6;
    imageWidth = popUpWidth * 0.8;
    imageHeight = imageWidth * 0.6;
    logoWidth = popUpWidth * 0.6;
    logoHeight = logoWidth / 3;
    popup.options.maxWidth = popUpWidth;
    popup.options.maxHeight = popUpHeight;
    popup.update();

    if (marker != entranceMarker && marker != entranceMarkerAL) {
        var imageUpdate = images[marker.feature.properties.image];
        var captionUpdate = marker.feature.properties.caption;
        var imageHTML = '<center><br><img src ="' + imageUpdate + '" width ="' + imageWidth + '" height ="' + imageHeight + '" border = 2px solid white> <br>' + captionUpdate + '</center>'
        marker._popup.setContent(originalContent + imageHTML);
    }

    if (marker == entranceMarker || marker == entranceMarkerAL) {
        var logoUpdate = "<center><img src = ministry_logo.png height ='" + logoHeight + "'width ='" + logoWidth + "' border = 2px solid white></center>"
        if (english == true) {
            marker._popup.setContent(entrancePopup + logoUpdate);
        }
        else {
            marker._popup.setContent(entrancePopupAL + logoUpdate);
        }
    }
});

map.whenReady(function () {
        //Theater
        if (hash == "0") {
            placesImported._layers[26].openPopup();
        }
        //House of Two Peristyles
        if (hash == "1") {
            placesImported._layers[28].openPopup();
        }
        //Baths

        if (hash == "2") {
            placesImported._layers[29].openPopup();
        }
        //Agora and Basilica
        if (hash == "3") {
            placesImported._layers[30].openPopup();
        }
        //House of the Frescoes
        if (hash == "4") {
            placesImported._layers[31].openPopup();
        }
        //Walls
        if (hash == "5") {
            placesImported._layers[32].openPopup();
        }
        //Necropolis
        if (hash == "6") {
            placesImported._layers[33].openPopup();
        }
        //Cistern
        if (hash == "7") {
            placesImported._layers[34].openPopup();
        }
        //Stoa
        if (hash == "8") {
            placesImported._layers[35].openPopup();
        }
});

function onLocationFound(e) {
    if (map.getBounds().contains(e.latlng)) {
        if (current_position) {
            map.removeLayer(current_position);
        }
        current_position = L.circle(e.latlng, 7).addTo(map);
        positionShown = true;
        if (english) {
            current_position.bindTooltip("Your location", { permanent: true, direction: "bottom" });
        }
        else {
            current_position.bindTooltip("Vendndodhja juaj", { permanent: true, direction: "bottom" });
        }
        current_position.addEventListener('click', function () {
            if (english) {
                current_position.bindTooltip("Your location", { permanent: true, direction: "bottom" });
            }
            else {
                current_position.bindTooltip("Vendndodhja juaj", { permanent: true, direction: "bottom" });
            }
        });
    }
    else {
        if (needToNotifyDistance == true) {
            alert("It looks like you are far away from Phoenike, so your position will not appear on the map.");
            needToNotifyDistance = false;
        }
    }
}

function onLocationError(e) {

    if (needToNotifySettings == true) {
        alert("If you would like to see your live position on the map, please update your device's settings to allow location services and refresh the page.");
        needToNotifySettings = false;
    }
 }


var width=window.innerWidth;
if (width<650) {
map.locate({ setView: false, watch: true });
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
};


function updateLocationLanguage(lang) {
    if (positionShown == true) {
        if (english) {
            current_position.setTooltipContent("Your location");
        }
        else {
            current_position.setTooltipContent("Vendndodhja juaj");
        }
    }
}
var langNumber=0;
var numFilter = 3;
sliderCreation(langNumber, numFilter);
function sliderCreation (langNumber, numFilter) {
  noUiSlider.create(eraSlider, {
    start: [numFilter],
    step:1,
    range: {
        'min': [0],
        'max': [3]
    },
    tooltips:true,
    pips: {
mode: 'count',
values: 4,
density: 25
},
    format: {
      to: function(value) {
      // Math.round and -1, so 1.00 => 0, 2.00 => 2, etc.
if (langNumber==0) {
      return ['4th century BCE', '3rd century BCE', '2nd century BCE', 'Roman Period'][Math.round(value)];
}
else {
  return ['shekulli 4 p.e.s', 'shekulli 3 p.e.s','shekulli 2 p.e.s', 'Periudha romake'][Math.round(value)];
}
    },
    from: Number
    }
})};



function getALFilterNumber(filter) {
  return  filter == "shekulli 4 p.e.s" ? 0 :
      filter == "shekulli 3 p.e.s"  ? 1 :
      filter == "shekulli 2 p.e.s" ? 2 :
      filter == "Periudha romake"  ? 3 :
                      4;
}

function getENFilterNumber(filter) {
  return  filter == "4th century BCE" ? 0 :
      filter == "3rd century BCE"  ? 1 :
      filter == "2nd century BCE" ? 2 :
      filter == "Roman Period"  ? 3 :
                      4;
}

eraSlider.noUiSlider.on('change', function (values, handle) {
  if (map.getZoom() >14){
    eraFilter = values[handle];

    if (english) {
    numFilter = getENFilterNumber(eraFilter);
}
else {
  numFilter = getALFilterNumber(eraFilter);
}

    map.removeLayer(placesImported);
    map.removeLayer(buildingsImported);
    controls.remove();
    console.log(english);

    if (english) {
    placesImported = new L.geoJson(places,{
      onEachFeature:popUpPlaces,
      filter:
      function(feature, layer) {
        return (feature.properties.timelineNumber <= numFilter);
      },
  }).addTo(map);
}
else {
  placesImported = new L.geoJson(places,{
    onEachFeature:popUpPlacesAL,
    filter:
    function(feature, layer) {
      return (feature.properties.timelineNumber <= numFilter);
    },
  }).addTo(map);

}

  buildingsImported = new L.geoJSON(buildings, {
      style: {
          weight: 1,
          color: "black",
          opacity: .5,
          fillOpacity: .3
        },
    filter:
    function(feature, layer) {
      return (feature.properties.timelineNumber <= numFilter);
    },
  }).addTo(map);

  if (english) {
  clusterLayers = {
      "Walking Path": pathsImported,
      "Ancient Walls": wallsImported,
      "Ancient Buildings": buildingsImported,
      "Ancient Streets": streetsImported
  };
  baseLayers = {
      "Satellite Imagery": Esri_WorldImagery,
      "Street Map" : openStreetMap
  };
  }
  else {
    clusterLayers = {
        "Rrugë Këmbësore": pathsImported,
        "Muret e Lashta": wallsImported,
        "Godinat e Lashta": buildingsImported,
        "Rrugët e Lashta": streetsImported
    };
    baseLayers = {
        "Imazhe Satelitore": Esri_WorldImagery,
        "Street Map" : openStreetMap
    };

  }

  controls = L.control.layers(baseLayers, clusterLayers).addTo(map);


}});


//disable panning while sliding
      slider.addEventListener('mouseover', function () {
              map.dragging.disable();
          });

          // Re-enable dragging when user's cursor leaves the element
      slider.addEventListener('mouseout', function () {
            map.dragging.enable();
          });


  map.on('zoomend', function() {
      if (map.getZoom() >14){
        // To re-enable
        eraSlider.removeAttribute('disabled');
            map.addLayer(placesImported);
              }
        else {
          eraSlider.setAttribute('disabled', true);


                map.removeLayer(placesImported);
            }
    });
