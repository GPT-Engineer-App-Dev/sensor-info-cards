import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text, VStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Dummy data for buildings
const buildings = [
  { id: 1, position: [59.911491, 10.757933], sensorData: 'Temperature: 20°C, Humidity: 30%' },
  { id: 2, position: [59.913868, 10.752245], sensorData: 'Temperature: 19°C, Humidity: 35%' },
  { id: 3, position: [59.914501, 10.733167], sensorData: 'Temperature: 21°C, Humidity: 28%' },
  // Add more buildings as needed
];

// Custom icon for the markers
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconRetinaUrl: require('../assets/pin-icon.png'),
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map(building => (
        <Marker
          key={building.id}
          position={building.position}
          icon={pinIcon}
          eventHandlers={{
            click: () => {
              setActiveBuilding(building);
            },
          }}
        />
      ))}
      {activeBuilding && (
        <Popup
          position={activeBuilding.position}
          onClose={() => {
            setActiveBuilding(null);
          }}
        >
          <VStack>
            <Text fontWeight="bold">Building Information</Text>
            <Text>{activeBuilding.sensorData}</Text>
          </VStack>
        </Popup>
      )}
    </MapContainer>
  );
};

export default Index;