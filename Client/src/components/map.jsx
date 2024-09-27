
import { useEffect, useState, createContext, useRef } from "react";
import "../assets/leaflet/leaflet.css";
import "../assets/leaflet-routing-machine-master/dist/leaflet-routing-machine.css";
import "./map.css";
import "../assets/leaflet/leaflet.js";
import "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";
import "../assets/leaflet-routing-machine-master/examples/Control.Geocoder.js";
import"../assets/leaflet-routing-machine-master/examples/config.js";
//https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
//https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
//https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
function Map(props){
    
    const mapRef = useRef(null);
    var userlocation = null;
    var route = null;
    
  let createLocationMarker;

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([21.024324, 105.857014], 17);
      const user = L.icon({
        iconUrl: '/icon/user.png',
        iconSize: [30, 30], // specify the width and height of the icon
        iconAnchor: [15, 30], // specify the anchor point of the icon
        className: 'marker'
      });

      const locationicon = L.icon({
        iconUrl: '/icon/location.png',
        iconSize: [30, 30], // specify the width and height of the icon
        iconAnchor: [15, 30], // specify the anchor point of the icon
        className: 'marker'
      });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

      mapRef.current = map;
      const locations = [[21.024324, 105.857014],[21.014324, 105.797014],[20.964324, 105.877014]];
      createLocationMarker = () => {
        Object.keys(props.locations).map(key => L.marker([props.locations[key].longtitude,props.locations[key].latitude],{icon: locationicon}).addTo(map).on('click', function() {onMarkerClick(props.locations[key]); props.changeLocation(key);}));  
      }
      map.locate({
        setView: true,      // Set the map view to the user's location
        maxZoom: 24,        // Maximum zoom level when setting the view
        enableHighAccuracy: true, // Enable high-accuracy mode
        maximumAge: 10000   // Maximum age of cached location data (milliseconds)
        });

        

      function onLocationFound(e) {
        if(e.accuracy < 100){
          const radius = e.accuracy / 2;
          userlocation = e.latlng;
          var usermarker = L.marker(userlocation,{icon: user}).addTo(map)
              .bindPopup("You are within " + radius + " meters from this point");
          L.circle(e.latlng, 5).addTo(map);
          //onMarkerClick(locations[0]);
        }
        else{
          const radius = e.accuracy / 2;
          userlocation = e.latlng;
          var usermarker = L.marker(userlocation,{icon: user}).addTo(map)
              .bindPopup("You are within " + radius + " meters from this point").openPopup();
          L.circle(e.latlng, 5).addTo(map);
        }
        onMarkerClick(props.location ? props.location : Object.keys(props.locations).map(key => props.locations[key])[0]);

    }

    function onMarkerClick(location){
        if(route != null){
          var routeLayer = route.getPlan().setWaypoints([]);
          map.removeLayer(routeLayer);
        }
        route = L.Routing.control(L.extend(window.lrmConfig, {
          waypoints: [
            userlocation,
            [location.longtitude,location.latitude]
          ],
          geocoder: L.Control.Geocoder.nominatim(),
          routeWhileDragging: true,
          reverseWaypoints: true,
          createControl: false,
          lineOptions: {
            styles: [{color: '#f1bc2a', opacity: 1, weight: 4}] // Change the line color here
          },
          
          show: false, // Disable the turn instructions panel
          createMarker: function() {
              return null; // Disable the creation of markers
          }
        })).addTo(map);
        //L.Routing.errorControl(control).addTo(map);
    }
    map.on('locationfound', onLocationFound);

    }
  }, []);

  useEffect(() => {
    if(Object.keys(props.locations).length > 0){
      createLocationMarker();
    }
  }, [props.locations]);

    return(
         <div id="map" style={{width: "auto", height:400, marginBottom:20, borderRadius:10}}><div className="overlay"></div></div>
    );
}

export default Map