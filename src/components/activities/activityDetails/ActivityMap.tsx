import {Box} from '@chakra-ui/react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

export type ActivityMapProps = {
  latitude: number;
  longitude: number;
  title: string;
};

export const ActivityMap = ({latitude, longitude, title}: ActivityMapProps) => {
  return (
    <Box height="300px" mb={4} borderRadius="md" overflow="hidden">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{height: '100%', width: '100%'}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};
