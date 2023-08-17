// reCheck
var applyButton = document.getElementById('apply-btn');

applyButton.addEventListener('click', function () {
    var optionCheckboxes = document.querySelectorAll('.option-checkbox');

    optionCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var optionLabel = checkbox.parentElement.textContent.trim();
            console.log('ตัวเลือกที่เลือก:', optionLabel);
        }
    });
});

var map = L.map("map", {
    center: [18.802904, 98.95041],
    zoom: 13
});
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// สร้างกล่องเครื่องมือสร้างพื้นที่ศึกษา
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    draw: {
        rectangle: true, // อนุญาตให้วาดรูปสี่เหลี่ยม
        polygon: false,
        circle: false,
        marker: false,
        polyline: false,
        circlemarker: false
    },
    edit: {
        featureGroup: drawnItems
    }
});


var baseLayers = {
    "Esri WorldImagery": Esri_WorldImagery.addTo(map),
    "OpenStreetMap": osm
};

L.control.layers(baseLayers).addTo(map);

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);

    var bounds = layer.getBounds();
    var nw = bounds.getNorthWest();
    var se = bounds.getSouthEast();

    var nwCoordinates = document.getElementById('nw-coordinates');
    var seCoordinates = document.getElementById('se-coordinates');

    nwCoordinates.textContent = nw.lat.toFixed(4) + ', ' + nw.lng.toFixed(4);
    seCoordinates.textContent = se.lat.toFixed(4) + ', ' + se.lng.toFixed(4);
});