import React, { useEffect, useState } from "react";
import { icon, LatLngExpression } from "leaflet";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

type LeafletData = {
  user_ip: string;
};

type ChangeMapViewData = {
  coordinates: LatLngExpression;
};

const ICON = icon({
  iconUrl: "/assets/icons/marker.png",
  iconSize: [32, 32],
});

export default function LeafletMap({ user_ip }: LeafletData) {
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    city: "",
    country: "",
  });
  let position: LatLngExpression = [
    location.lat ? parseFloat(location.lat) : 0,
    location.lng ? parseFloat(location.lng) : 0,
  ];

  useEffect(() => {
    async function getInfoIp() {
      try {
        const apiCall = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=${process.env.NEXT_PUBLIC_GEO_IPIFY_API_KEY}&ipAddress=` +
            String(user_ip)
        );

        const response = await apiCall.json();
        setLocation({
          lat: response.location.lat,
          lng: response.location.lng,
          city: response.location.city,
          country: response.location.country,
        });
      } catch (error) {
        console.error(error);
      }
    }
    getInfoIp();
  }, [user_ip]);

  const ChangeMapView = ({ coordinates }: ChangeMapViewData) => {
    const map = useMap();
    map.setView(coordinates, map.getZoom());
    return null;
  };

  return (
    <>
      <div className="map">
        <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
          <ChangeMapView coordinates={position} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker icon={ICON} position={position}>
            <Popup>
              {location.city}, {location.country}.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}
