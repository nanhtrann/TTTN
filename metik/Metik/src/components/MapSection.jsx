import { forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapSection = forwardRef(({ mapHeight = "500px", markerLabel = "Công ty Cổ phần OCHAO" }, ref) => {
  const position = [10.92045129566702, 106.53501509660067];

  return (
    <div ref={ref} className="w-full" style={{ height: mapHeight }}>
      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{markerLabel}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
});

export default MapSection;