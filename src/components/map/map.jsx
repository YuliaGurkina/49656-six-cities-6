import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import * as leaflet from "leaflet";

import "leaflet/dist/leaflet.css";
import {useSelector} from "react-redux";

const Map = ({points}) => {
  const mapRef = useRef();
  const {activeOffer} = useSelector((state) => state.PROCESS);

  const cityZoom = points[0].city.location.zoom;
  const cityCenter = {
    lat: points[0].city.location.latitude,
    lng: points[0].city.location.longitude,
  };
  const iconDefault = leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });
  const iconSelect = leaflet.icon({
    iconUrl: `img/pin-active.svg`,
    iconSize: [30, 30]
  });

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: cityCenter,
      zoom: cityZoom,
      zoomControl: false,
      marker: true
    });

    mapRef.current.setView(cityCenter, cityZoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    points.forEach((point) => {
      const icon = activeOffer === point ? iconSelect : iconDefault;
      leaflet.marker({
        lat: point.location.latitude,
        lng: point.location.longitude
      },
      {
        icon
      })
        .addTo(mapRef.current)
        .bindPopup(point.title);
    });
    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    points.forEach((point) => {
      const icon = activeOffer === point ? iconSelect : iconDefault;
      leaflet.marker({
        lat: point.location.latitude,
        lng: point.location.longitude
      },
      {
        icon
      })
        .addTo(mapRef.current)
        .bindPopup(point.title);
    });
  }, [points, activeOffer]);

  return (
    <div id="map" className="map" style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    title: PropTypes.string.isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
  }))
};

export default Map;
