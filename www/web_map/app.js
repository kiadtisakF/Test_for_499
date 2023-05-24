var map = L.map("map", {
    center: [18.802904, 98.95041],
    zoom: 12
});
var marker = null;

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' });
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var province = L.tileLayer.wms("http://localhost:8080/geoserver/geoserver_f/wms?", {
    layers: 'geoserver_f:cm_province_4326',
    format: 'image/png',
    transparent: true,
});
var amphone = L.tileLayer.wms("http://localhost:8080/geoserver/geoserver_f/wms?", {
    layers: 'geoserver_f:cm_amphoe_4326',
    format: 'image/png',
    transparent: true,
});
var landuse = L.tileLayer.wms("http://10.83.29.4:8080/geoserver/MultiCartography/wms?", {
    layers: 'MultiCartography:cm_landuse_2559_4326',
    format: 'image/png',
    transparent: true
});
var village = L.tileLayer.wms("http://10.83.29.4:8080/geoserver/MultiCartography/wms?", {
    layers: 'MultiCartography:cm_village_4326',
    format: 'image/png',
    styles: 'MultiCartography:Village_kanit',
    transparent: true

});

var baseLayers = {
    "OpenStreetMap": osm.addTo(map),
    "Esri WorldImagery": Esri_WorldImagery
};
var overlays = {
    "ขอบเขตจังหวัด": province,
    "ขอบเขตอำเภอ": amphone,
    "การใช้ที่ดิน": landuse,
    "หมู่บ้าน": village

};
map.on('click', function (e) {
    if (marker) {
        marker.setLatLng(e.latlng);
        marker.setPopupContent("Latitude: " + e.latlng.lat.toFixed(6) + "<br>Longitude: " + e.latlng.lng.toFixed(6));
    } else {
        marker = L.marker(e.latlng).addTo(map);
        marker.bindPopup("Latitude: " + e.latlng.lat.toFixed(6) + "<br>Longitude: " + e.latlng.lng.toFixed(6)).openPopup();
    }
});

L.control.layers(baseLayers, overlays).addTo(map);