function menuHover(elem){
    elem.style.backgroundColor = "rgb(136,23,152)";
}
function menuOut(elem){
    elem.style.backgroundColor = "rgba(255,255,255,0)";
}
function menuClick(id){
    location.href = id + ".html";
}
function play(audio,album,src){
    var elem = document.getElementById(audio);
    var al = document.getElementById(album);
    if(elem.paused){
        elem.play();
        al.src = src + ".gif";
    }else{
        elem.pause();
        al.src = src + ".jpg";
    }
}
var map;
function initMap(){
    map = new google.maps.Map(document.getElementById("mapHolder"),{
        zoom: 9.7,
        center: {lat: 42.8, lng: -78.7},
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
        ]
    });
}
function clearData(){
    map.data.forEach(function(feature){
        map.data.remove(feature);
    })
	google.maps.event.clearListeners(map.data,'mouseover');
	google.maps.event.clearListeners(map.data,'mouseout');
}
function showDistribution(){
    clearData();
    map.data.addGeoJson(myData);
    map.data.setStyle(function(feature) {
        var walk = feature.getProperty("NatWalkInd");
        var color;
        if(walk < 9.833){
            color = "rgba(255,255,128,1)";
        }else if(walk <13){
            color = "rgba(56,224,9,1)";
        }else if(walk < 14.833){
            color = "rgba(26,147,171,1)";
        }else{
            color = "rgba(12,16,120,1)";
        }
        return ({
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 0.3,
            strokeColor:"rgb(110,110,110)"
        });
    });
	var info;
	map.data.addListener('mouseover', function(event){
		info = new google.maps.InfoWindow({
		content : "<table><tr><td>GEOID</td><td>" +  event.feature.getProperty("GEOID10")
		+ "</td></tr><tr><td>Walkability</td><td>" + event.feature.getProperty("NatWalkInd")
		+ "</td></tr></table>",
		position: event.latLng
	    });
		info.open(map);
	});	
	map.data.addListener('mouseout',function(event){
		info.close();
	});
}
function showPoints(){
    clearData();
    map.data.addGeoJson(points);
    map.data.setStyle({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 1.2,
            fillColor: "rgb(206,166,243)",
            fillOpacity: 1,
            strokeColor:"rgb(206,166,243)",
            strokeWeight: 1
        }
    });
}
function check(check,div){
    var checkBox = document.getElementById(check);
    var legend = document.getElementById(div);
    if(checkBox.checked){
        legend.style.display = "block";
        if(check == "check1"){
			document.getElementById("check2").checked = false;
			this.check("check2","div_cluster");
            showDistribution();
        }else{
            document.getElementById("check1").checked = false;
            this.check("check1","div_legend");
            showPoints();
        }
    }else{
        legend.style.display = "none";
        document.getElementById("myRange").value = 1;
        document.getElementById("myRangeK").value = 1;
        updateWalk();
        updateK();
        clearData();
        clearCluster();
    }
}
function updateWalk(){
    var slider = document.getElementById("myRange");
    var show = document.getElementById("threshold");
    show.innerHTML = slider.value;
    //update map
    showPoints();
    map.data.forEach(function(feature){
        var walk = feature.getProperty("NatWalkInd");
        if(walk < slider.value){
            map.data.remove(feature);
        }
    });
}
function updateK(){
    var slider = document.getElementById("myRangeK");
    var show = document.getElementById("K");
    show.innerHTML = slider.value;
}
function identifyCluster(){
    var k = document.getElementById("myRangeK").value;
    var points = [];
    map.data.forEach(function(feature){
        var latLon = feature.getGeometry().get();
        points.push([latLon.lng(),latLon.lat()]);
    });
    var clusters = kmeans(points,k,100);
    //show clusters
    clearCluster();
    for(var i=0; i<k; i++){
        drawCluster(clusters[i]);
    }
}
var lines = [];
function clearCluster(){
    for(var k=0; k < lines.length; k++){
        lines[k].setMap(null);
    }
    lines = [];
}
function drawCluster(points){
    //find center
    var center = new Array(2);
    for(var i=0; i<2; i++){
        var sum = 0;
        for(var j=0; j<points.length; j++){
            sum+=points[j][i];
        }
        center[i]=sum/points.length;
    }
    var idx = closestCentroid(center,points);
    center = {lat: points[idx][1], lng: points[idx][0]};
    for(var i = 0; i < points.length; i++){
        var end = {lat: points[i][1], lng: points[i][0]};
        var line = new google.maps.Polyline({
            path: [center,end],
            map: map,
            strokeColor:"rgb(206,166,243)",
            strokeWeight: 1
        });
        lines.push(line);
    }
}