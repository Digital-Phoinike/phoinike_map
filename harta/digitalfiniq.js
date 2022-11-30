var hash = window.location.hash.substr(1);
var mapOptions = {
    tap: false,
    center: [39.91381644734087, 20.059],
    zoom: 16,
    maxZoom: 20,
    minZoom: 10,
    maxBounds: [[39.400784799474905, 19.81299812520738], [40.098806006678494, 20.262505016975012]],
    touchZoom: true,
    attributionControl: false
 }
var map = new L.map('map', mapOptions);
var mapWidth = map.getSize().x;
var mapHeight = map.getSize().y;
var popUpWidth = mapWidth * 0.8;
var popUpHeight = mapHeight * 0.6;
var imageWidth = popUpWidth * 0.8;
var imageHeight = imageWidth * 0.6;
var images = [null, "image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png",
    "image10.png", "image11.png", "image12.png", "image13.png", "image14.png", "image15.png", "image16.png", "image17.png", "image18.png", "image19.png",
    "image20.png", "image21.png", "image22.png"];
var currentImage = null;
var eraSlider = document.getElementById('slider');
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxNativeZoom: 17}).addTo(map);
var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxNativeZoom:17
});
//initial language set to English and Roman Period for filtering
var langNumber=0; //1 = Albanian, 2 = Italian
var numFilter=3; //tracks the slider setting
//load initial geoJson files
var placesImported; //gets instantiated further down by slider
var allSites = L.geoJSON(contextualSites, {
    onEachFeature: popUpPlaces
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
    }).addTo(map);
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
    }).addTo(map);
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
    iconSize: [100, 75],
    iconAnchor: [50, 100], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
    });
var infoIconAl = L.icon({
    iconUrl: 'infoAL.png',
    iconSize: [100, 75],
    iconAnchor: [50, 100],
    popupAnchor: [0, -25]
});
var infoIconIT = L.icon({
    iconUrl: 'infoIT.png',
    iconSize: [100, 75], // size of the icon
    iconAnchor: [50, 100],
    popupAnchor: [0, -25]
});
var entrancePopup = "<center><b>Ancient Phoenike</b></center><br>The settlement of ancient Phoenike was one of the largest communities in the region of Epirus during the Hellenistic period and was the capital of Chaonia, one of the fourteen Epirote tribal regions. While evidence from the 5th and 4th centuries BCE point to the settlement’s earliest origins, its true urban development dates primarily to its Hellenistic phase in the 3rd century BCE, culminating in the city emerging as the capital of the Epirote League. During the Third Macedonian War, the region of Chaonia supported the Roman Republic, resulting in Phoenike being spared from Roman destruction when the war ended in 168 BCE. As a Roman community, Phoenike lasted for several centuries and experienced an important phase under the Byzantine Emperor Justinian during the 6th century CE. During this period, Phoenike became a vescoval see and featured a variety of early Christian religious buildings.<br><br>First excavated by Luigi Maria Ugolini in the 1920s, later by Albanian archaeologists, and more recently by an Albanian-Italian collaboration between the Institute of Archaeology and University of Bologna, the history of Phoenike continues to be written as archaeologists peel back its layers year-by-year. This interactive map tells the story of the most important archaeological discoveries over the past century, including grand public buildings, monumental defensive structures, fascinating private residences, and a multilayered burial ground which served as the final resting place for centuries of generations of the settlement’s inhabitants. Within the map, occasional links to 3D content help bring this story to life and illustrate the reconstructions imagined by archaeologists who have excavated and studied this site. <br><br>Enjoy your exploration of ancient Phoenike!<br><br><i>Designed and created by <b>Sabian Hasani, Matthew Naglak, and Tyler Duane Johnson</b> with the support of the <b>Albanian Ministry of Culture</b> and the <b>Albanian-Italian Archaeological Mission at Phoenike</b></i><br><br>";
entranceMarker = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopup, {
    maxHeight: 200,
    maxWidth: 200,
    closeOnClick: true
}).addTo(map);
var entrancePopupAL = "<center><b>Foinike E Lashtë</b></center><br>Vendbanimi i Foinikes së lashtë ishte një nga qendrat më të mëdha në rajonin e Epirit gjatë periudhës helenistike, njëherazi edhe kryeqendër e Kaonisë, një nga katërmbëdhjetë rajonet fisnore epirote. Ndërkohë që të dhënat që vijnë nga shek. 5 dhe 4 p.e.s dëshmojnë për origjinën më të hershme të vendbanimit, zhvillimi i vërtetë urban i tij daton kryesisht në periudhën helenistike, në shek. 3 p.e.s, periudhë gjatë të cilës qyteti arrin kulmin si kryeqendër e Ligës Epirote. Gjatë Luftës së Tretë Maqedonase, rajoni i Kaonisë përkrahu Republikën Romake, fakt ky që e shpëtoi Foiniken nga raprezaljet romake në përfundim të luftës në vitin 168 p.e.s. Si një komunitet romak, Foinike vijoi jetën për disa shekuj duke përjetuar një fazë të rëndësishme nën perandorin bizantin Justinian, gjatë shekullit të 6 -të e.s. Gjatë kësaj periudhe, Foinike u bë një qendër episkopale, e pajisur me një sërë ndërtesash religjioze, që datohen në periudhën e kristianizmit të hershëm.<br><br>Gërmimet e para kanë nisur në vitet 1920 nga Luigi Maria Ugolini, më pas nga arkeologë shqiptarë dhe së fundmi nga projekti i përbashkët shqiptaro-italian, bashkëpunim midis Institutit të Arkeologjisë (ASA) dhe Universiteti i Bolonjës. Historia e Foinikes antike vijon të shkruhet ndërsa arkeologët nxjerrin në dritë shtresëzimet e ndryshme vit pas viti. Kjo hartë interaktive tregon historinë e zbulimeve më të rëndësishme arkeologjike të shekullit të kaluar, përfshirë ndërtesat e mëdha publike, strukturat monumentale mbrojtëse, rezidencat magjepsëse të banimit dhe një varrezë me disa faza, e cila për shekuj ka shërbyer si vëndbanimi i fundit për banorët e Foinikes antike. Në brëndësinë e saj harta përmban disa materiale 3D, të cilat ndihmojnë në paraqitjen e kësaj historie dhe ilustrojnë rindërtimet e ideuara nga arkeologët që kanë e gërmuar dhe studiuar këtë qendër të rëndësishme arkeologjike.<br><br><i>Projektuar dhe krijuar nga <b>Sabian Hasani, Matthew Naglak, dhe Tyler Duane Johnson</b> me mbështetjen e <b>Ministrisë Shqiptare të Kulturës</b> dhe <b>Misionit Arkeologjik Shqiptaro-Italian në Foinike</b></i><br><br>";
var entranceMarkerAL;
var entrancePopupIT = "<center><b>L'Antica Phoinike</b></center><br>L'Antica Phoinike era una delle più grandi comunità della regione dell'Epiro durante il periodo ellenistico ed era la capitale della Chaonia, una delle quattordici regioni tribali dell'Epiro. Mentre le evidenze archeologiche del V e IV secolo a.C. indicano le origini più antiche dell'insediamento, il suo vero sviluppo urbano risale principalmente alla sua fase ellenistica nel III secolo a.C., culminato con l'emergere della città come capitale della Lega Epirota. Durante la terza guerra di Macedonia, la regione di Chaonia sostenne la Repubblica Romana, con il risultato che Phoinike fu risparmiata dalla distruzione da parte dei Romani, quando la guerra finì nel 168 a.C.  Come comunità romana, Phoinike durò diversi secoli e conobbe una fase importante sotto l'imperatore bizantino Giustiniano durante il VI secolo d.C. Durante questo periodo, Phoinike divenne una sede vescovile e vi sorsero diversi edifici religiosi paleocristiani.<br><br>Scavata per la prima volta da Luigi Maria Ugolini negli anni '20, poi da archeologi albanesi e più recentemente da una collaborazione italo-albanese tra l'Istituto di Archeologia e l'Università di Bologna, la storia di Phoinike continua a essere scritta mentre gli archeologi ne scavano gli strati anno per anno. Questa mappa interattiva racconta la storia delle scoperte archeologiche più importanti del secolo scorso, tra cui grandi edifici pubblici, monumentali strutture difensive, affascinanti residenze private e un cimitero multistratificato che è servito come ultima dimora per secoli di generazioni di abitanti dell'insediamento.  All'interno della mappa, collegamenti occasionali a contenuti 3D aiutano a dare vita a questa storia e illustrano le ricostruzioni immaginate dagli archeologi che hanno scavato e studiato questo sito. <br><br>Goditi l’esplorazione dell'antica Phoinike!<br><br><i>Progettato e realizzato da <b>Sabian Hasani, Matthew Naglak e Tyler Duane Johnson</b> con il sostegno del <b>Ministero della Cultura Albanese</b> e della <b>Missione archeologica italo-albanese a Phoinike</b></i><br><br>";
var entranceMarkerIT;
var baseLayers = {
    "Satellite Imagery": Esri_WorldImagery,
    "Street Map": openStreetMap
};
var clusterLayers = {
    "Walking Path": pathsImported,
    "Ancient Walls": wallsImported,
    //"Ancient Buildings": buildingsImported,
    "Ancient Streets": streetsImported
};
var controls = L.control.layers(baseLayers, clusterLayers).addTo(map);
var current_position
var positionShown = false;
var needToNotifyDistance = true;
var needToNotifySettings = true;
var needToNotifySize = true;
var finiqInView = true;
var currentLangPlaces;
var full = new L.Control.Fullscreen();
var pan = new L.Control.Pan();

sliderCreation(langNumber, numFilter); //calls function to create initial slider, and this instantiates the placesImported layer for the first time

eraSlider.noUiSlider.on('change', function (values, handle) {
  sliderMovement(values, handle);
});

function changeLanguage(lang) {
    //get rid of stuff that needs reloaded in new language
    eraSlider.noUiSlider.destroy();
    controls.remove();
    map.removeLayer(placesImported);
    map.removeLayer(allSites);
    if (langNumber == 0) {
        map.removeLayer(entranceMarker);
    }
    else if (langNumber == 1) {
        map.removeLayer(entranceMarkerAL);
    }
    else if (langNumber == 2) {
        map.removeLayer(entranceMarkerIT);
    }
    //check the language
    if (lang == "en") {
      langNumber=0;
      entranceMarker = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIcon }).bindPopup(entrancePopup, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
      clusterLayers = {
            "Walking Path": pathsImported,
            "Ancient Walls": wallsImported,
            "Ancient Streets": streetsImported
        };
        baseLayers = {
            "Satellite Imagery": Esri_WorldImagery,
            "Street Map": openStreetMap
        };
    }
    if (lang == "al") {
      langNumber=1;
        entranceMarkerAL = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIconAl }).bindPopup(entrancePopupAL, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
        clusterLayers = {
            "Rrugë Këmbësore": pathsImported,
            "Muret e Lashta": wallsImported,
            "Rrugët e Lashta": streetsImported
        };
        baseLayers = {
            "Imazhe Satelitore": Esri_WorldImagery,
            "Harta Rrugore": openStreetMap
        };
    }
    if (lang == "it") {
        langNumber = 2;
        entranceMarkerIT = new L.Marker([39.91351259783837, 20.059624328713472], { icon: infoIconIT }).bindPopup(entrancePopupIT, { maxHeight: 200, maxWidth: 200, closeOnClick: true }).addTo(map);
        clusterLayers = {
            "Sentiero": pathsImported,
            "Cinta muraria": wallsImported,
            "Antiche strade": streetsImported
        };
        baseLayers = {
            "Immagini satellitari": Esri_WorldImagery,
            "Mappa stradale": openStreetMap
        };
    }
    //reload the items destroyed at beginning of function
    controls = L.control.layers(baseLayers, clusterLayers).addTo(map);
    sliderCreation(langNumber, numFilter);

    eraSlider.noUiSlider.on('change', function (values, handle) {
        sliderMovement(values, handle);
    });
    //disable panning while moving slider, has to be called again
    slider.noUiSlider.on('start', function (e) {
        map.dragging.disable();
    });
    slider.noUiSlider.on('end', function (e) {
        map.dragging.enable();
    })
}

//if position is loaded, the tooltip of the circle showing user's position needs reloaded
function updateLocationLanguage(lang) {
    if (positionShown == true) {
        if (langNumber == 0) {
            current_position.setTooltipContent("Your location");
        }
        else if (langNumber == 1) {
            current_position.setTooltipContent("Vendndodhja juaj");
        }
        else if (langNumber == 2) {
            current_position.setTooltipContent("La tua posizione");
        }
    }
}

//called when slider gets moved
function sliderMovement(values, handle) {
    map.removeLayer(placesImported);
    map.removeLayer(buildingsImported);
    //convert filters to numbers by language then rebuild places + popups; functions at bottom of code
    numFilter = getFilterNumber(values[handle]);
    placesImported = new L.geoJson(places, {
        onEachFeature: currentLangPlaces,
        filter:
        function (feature, layer)
        {
            return (feature.properties.timelineNumber <= numFilter);
        },
    }).addTo(map);
  //filter buildings based on timelineNumber
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
}

//main popups for each language
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

function popUpPlacesIT(f, l) {
    l.bindTooltip(f.properties.ITName);
    var out = [];
    var myImage;
    var myImageW = imageWidth;
    var myImageH = imageHeight;
    if (f.properties) {
        out.push('<b><u>' + f.properties.ITName + '</u></b>');
        out.push('<br><b>Data di costruzione: </b>' + f.properties.ITDate);
        if (f.properties.ThreeD) {
            out.push('<br><b>Modello 3D: </b>' + '<a href="' + f.properties.ThreeD + '"target="_blank">Apri in una nuova scheda</a>');
        }
        out.push('<br><b>Descrizione: </b>' + f.properties.ITDescriptio + '<br><center>');
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}

//for the Finiq entrance marker
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
    //check if user is likely on mobile
    if (mapWidth > 650) {
    map.addControl(pan);
    map.addControl(full);
  };
    map.setMaxBounds([[39.400784799474905, 19.81299812520738], [40.098806006678494, 20.262505016975012]]);
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
    map.removeControl(full);
    map.removeControl(pan);
    map.setMaxBounds([[39.400784799474905, 14.555219061565039],[44.937766393643194, 24.445555079300775]]);
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
    //improvised way to make sure the images on the main pop ups are resizing based on the resized screen
    if (marker != entranceMarker && marker != entranceMarkerAL && marker != entranceMarkerIT) {
        var imageUpdate = images[marker.feature.properties.image];
        var captionUpdate;
        if (langNumber == 0) {
            captionUpdate = marker.feature.properties.caption;
        }
        else if (langNumber == 1) {
            captionUpdate = marker.feature.properties.ALcaption;
        }
        else if (langNumber == 2) {
            captionUpdate = marker.feature.properties.ITCaption;
        }
        var imageHTML = '<center><br><img src ="' + imageUpdate + '" width ="' + imageWidth + '" height ="' + imageHeight + '" border = 2px solid white> <br>' + captionUpdate + '</center>'
        marker._popup.setContent(originalContent + imageHTML);
    }
    //same thing but for the Finiq entrance markers
    if (marker == entranceMarker || marker == entranceMarkerAL || marker == entranceMarkerIT) {
        var logoUpdate = "<center><img src = ministry_logo.png height ='" + logoHeight + "'width ='" + logoWidth + "' border = 2px solid white></center>"
        if (langNumber == 0) {
            marker._popup.setContent(entrancePopup + logoUpdate);
        }
        else if (langNumber == 1) {
            marker._popup.setContent(entrancePopupAL + logoUpdate);
        }
        else if (langNumber == 2) {
            marker._popup.setContent(entrancePopupIT + logoUpdate);
        }
    }
});

//use anchor tags (added to qr code links) to open specific popups. As of 11/29/22, this was working, but some browsers
//were not responding to anchor tags if the map was already loaded
map.whenReady(function () {
    //print these to the console to see the _layer number of each item in the layer
    //console.log(placesImported._layers);
    //console.log(allSites._layers);
        //Theater
        if (hash == "0") {
            needToNotifySize = false;
            placesImported._layers[1388].openPopup();
        }
        //House of Two Peristyles
        if (hash == "1") {
            needToNotifySize = false;
            placesImported._layers[1390].openPopup();
        }
        //Baths
        if (hash == "2") {
            needToNotifySize = false;
            placesImported._layers[1391].openPopup();
        }
        //Agora and Basilica
        if (hash == "3") {
            needToNotifySize = false;
            placesImported._layers[1392].openPopup();
        }
        //House of the Frescoes
        if (hash == "4") {
            needToNotifySize = false;
            placesImported._layers[1393].openPopup();
        }
        //Walls
        if (hash == "5") {
            needToNotifySize = false;
            placesImported._layers[1394].openPopup();
        }
        //Necropolis
        if (hash == "6") {
            needToNotifySize = false;
            placesImported._layers[1395].openPopup();
        }
        //Cistern
        if (hash == "7") {
            needToNotifySize = false;
            placesImported._layers[1396].openPopup();
        }
        //Stoa
        if (hash == "8") {
            needToNotifySize = false;
            placesImported._layers[1397].openPopup();
        }
        if (hash == "mobile_fs") {
            needToNotifySize = false;
            //so that if a mobile user gets sent to the fullscreen map from the main page,
            //they don't see the "view map in fullscreen" message
        }
});

function onLocationFound(e) {
    if (map.getBounds().contains(e.latlng)) {
        if (current_position) {
            map.removeLayer(current_position);
        }
        current_position = L.circle(e.latlng, 7).addTo(map);
        positionShown = true;
        if (langNumber == 0) {
            current_position.bindTooltip("Your location", { permanent: true, direction: "bottom" });
        }
        else if (langNumber == 1) {
            current_position.bindTooltip("Vendndodhja juaj", { permanent: true, direction: "bottom" });
        }
        else if (langNumber == 2) {
            current_position.bindTooltip("La tua posizione", { permanent: true, direction: "bottom" });
        }

        current_position.addEventListener('click', function () {
            if (langNumber == 0) {
                current_position.bindTooltip("Your location", { permanent: true, direction: "bottom" });
            }
            else if (langNumber == 1) {
                current_position.bindTooltip("Vendndodhja juaj", { permanent: true, direction: "bottom" });
            }
            else if (langNumber == 2) {
                current_position.bindTooltip("La tua posizione", { permanent: true, direction: "bottom" });
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

//check if user is probably on mobile
var width = window.innerWidth;
if (width < 650) {
    if (needToNotifySize) {
        var welcomeDialog = L.control.dialog();
        welcomeDialog.setContent("Hello, and welcome to the Phoinike Interactive Map! To better experience the map on mobile, click " + "<a target='_blank' href='https://digital-phoinike.github.io/phoinike_map/harta/index.html#mobile_fs'>here</a>" + " to view the map in full-screen.")
        welcomeDialog.addTo(map);
        welcomeDialog.open();
        welcomeDialog.setSize([210, 135]);
        welcomeDialog.setLocation([100, 50]);
    }
map.locate({ setView: false, watch: true });
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.removeControl(full);
};
//if not on mobile...
if (width > 650) {
  map.addControl(pan);
  map.addControl(full);
}

function sliderCreation (langNumber, numFilter) {
  noUiSlider.create(eraSlider, {
    start: [numFilter],
    step:1,
    range: {
        'min': [0],
        'max': [3]
    },
    tooltips:true,
    format: {
      to: function(value) {
      // Math.round and -1, so 1.00 => 0, 2.00 => 2, etc.
      if (langNumber==0) {
        return ['4th century BCE', '3rd century BCE', '2nd century BCE', 'Roman Period'][Math.round(value)];
      }
      else if (langNumber == 1) {
        return ['shekulli 4 p.e.s', 'shekulli 3 p.e.s','shekulli 2 p.e.s', 'Periudha romake'][Math.round(value)];
      }
      else if (langNumber == 2) {
        return ['IV sec.a.C.', 'III sec.a.C.', 'II sec.a.C.', 'Periodo Romano'][Math.round(value)];
      }
    },
      from: Number
    }
  })

    if (langNumber == 0) {
        currentLangPlaces = popUpPlaces;
    }
    else if (langNumber == 1) {
        currentLangPlaces = popUpPlacesAL;
    }
    else if (langNumber == 2) {
        currentLangPlaces = popUpPlacesIT;
    }

    placesImported = new L.geoJson(places, {
        onEachFeature: currentLangPlaces,
        filter:
            function (feature, layer) {
                return (feature.properties.timelineNumber <= numFilter);
            },
    });
    //add Finiq monuments if zoomed in, also instantiates the placesImported layer for the first time
    if (map.getZoom() >14){
        placesImported.addTo(map);
        };
    allSites = L.geoJSON(contextualSites, {
        onEachFeature: currentLangPlaces
    }).addTo(map);
}

//convert timeline text to numbers
function getFilterNumber(filter) {
    if (langNumber == 0) {
        return filter == "4th century BCE" ? 0 :
        filter == "3rd century BCE" ? 1 :
        filter == "2nd century BCE" ? 2 :
        filter == "Roman Period" ? 3 :
        4;
    }
    else if (langNumber == 1) {
        return filter == "shekulli 4 p.e.s" ? 0 :
        filter == "shekulli 3 p.e.s" ? 1 :
        filter == "shekulli 2 p.e.s" ? 2 :
        filter == "Periudha romake" ? 3 :
        4;
    }
    else if (langNumber == 2) {
        return filter == "IV sec.a.C." ? 0 :
        filter == "III sec.a.C." ? 1 :
        filter == "II sec.a.C." ? 2 :
        filter == "Periodo Romano" ? 3 :
        4;
    }
}

//disable panning while moving slider
slider.noUiSlider.on('start', function (e) {
  map.dragging.disable();
});
slider.noUiSlider.on('end', function (e) {
map.dragging.enable();
})

//check if Finiq is visible. If not, remove slider and Finiq sites.
map.on('zoomend', function () {
    updateFiniqVisiblity()
});

map.on('moveend', function (e) {
    if (map.getBounds().contains(L.latLng(39.9132706, 20.0564641))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.9155927, 20.0549549))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.913201642594451, 20.057805693451179))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.913161287253679, 20.058684086265522))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.91708973280484, 20.052877120043348))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.911238084816446, 20.061125409623443))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.90908238200553, 20.050942322439486))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.912819101636735, 20.059068204674599))) {
        finiqInView = true;
    }
    else if (map.getBounds().contains(L.latLng(39.911644067953603, 20.060832478444699))) {
        finiqInView = true;
    }
    else {
        finiqInView = false;
    }
    updateFiniqVisiblity();
});

function updateFiniqVisiblity() {
    if (map.getZoom() > 14 && finiqInView) {
        document.getElementById("sliderunderlay").style.zIndex = "800"; //put slider back
        map.addLayer(placesImported);
    }
    else {
        document.getElementById("sliderunderlay").style.zIndex = "-1";//destroy slider
        map.removeLayer(placesImported);
    }
}

