import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oYW4tMzIxIiwiYSI6ImNrOWJiaDI2ODBkNnUzbWxrcjhwZmI3bDcifQ.q-SEkV9HsLCAKE5IOHPXsw';

export default function Map({setCountryGraph}) {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

const marker = new mapboxgl.Marker();

useEffect(() => {

  //navigator object to access user location or you can hardcode the lat long of your desired location
  navigator.geolocation.getCurrentPosition(function(position) {
    // console.log("Position",position)
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [position.coords.longitude, position.coords.latitude],
    zoom: zoom
    });

    marker.setLngLat([position.coords.longitude, position.coords.latitude])
    marker.addTo(map.current);
    
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "top-right");

    map.current.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
      );
  });
},[])

useEffect(() => {
  if (!map.current) return; // wait for map to initialize
  map.current.on('click', () => {
  setLng(map.current.getCenter().lng.toFixed(4));
  setLat(map.current.getCenter().lat.toFixed(4));
  setZoom(map.current.getZoom().toFixed(2));
  });

  fetch(`https://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=prohan`,{
    method: "GET",
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log("DATA OF Country",data)
    setCountryGraph(data["countryName"]);
  }).catch((err) => {
    console.log("ERROR Occured",err);
  })
  },[lng,lat]);

  return (
    //The code to render a map goes here.
    <div className="map">
      <div className="sidebar_map">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
