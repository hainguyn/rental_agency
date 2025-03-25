import React, { memo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Cấu hình icon marker
const markerIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const Map = ({ position, address }) => {
  const mapRef = useRef();

  const MapViewUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 13); // Di chuyển bản đồ tới vị trí mới và giữ zoom level là 13
      }
    }, [position, map]);

    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
      ref={mapRef}
    >
      <MapViewUpdater />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={markerIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default memo(Map);
