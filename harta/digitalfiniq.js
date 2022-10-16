var hash = window.location.hash.substr(1);
var mapOptions = {
     tap: false,
     center: [39.91381644734087, 20.055112781752946],
     zoom: 16,
     maxZoom : 20,
     minZoom: 10,
     touchZoom: true,
     maxBounds: [[39.690784799474905, 19.81299812520738],[40.098806006678494, 20.262505016975012]],
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
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxNativeZoom: 17,
            maxZoom: 20,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});
var placesImported = L.geoJSON(places, {
        onEachFeature: popUpPlaces
});
var placesALImported = L.geoJSON(placesAL, {
    onEachFeature: popUpPlacesAL
});
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
    });
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
    "Satellite Imagery": Esri_WorldImagery
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

function changeLanguage(lang) {
    if (lang == "en") {
        map.removeLayer(placesALImported);
        map.addLayer(placesImported);
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
            "Satellite Imagery": Esri_WorldImagery
        };
        controls = L.control.layers(baseLayers, clusterLayers).addTo(map);
    }
    if (lang == "al") {
        map.removeLayer(placesImported);
        map.addLayer(placesALImported);
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
    }
}

function popUpPlaces(f,l) {
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
    var out = [];
    var myImage;
    var myImageW = imageWidth;
    var myImageH = imageHeight;
    if (f.properties) {
        out.push('<b><u>' + f.properties.Name + '</u></b>');
        out.push('<br><b>Data e ndërtimit: </b>' + f.properties.Date);
        if (f.properties.ThreeD) {
            out.push('<br><b>Modeli 3D: </b>' + '<a href="' + f.properties.ThreeD + '"target="_blank">Hape në një faqe tjetër</a>');
        }
        out.push('<br><b>Përshkrimi: </b>' + f.properties.Descriptio + '<br><center>');
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
    if (window.innerWidth>400px && needToNotifySettings == true) {
        alert("If you would like to see your live position on the map, please update your device's settings to allow location services and refresh the page.");
        needToNotifySettings = false;
    }
 }

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({ setView: false, watch: true });

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
