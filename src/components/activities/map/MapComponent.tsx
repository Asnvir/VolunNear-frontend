import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useGeolocated} from 'react-geolocated';
import {LatLngExpression} from 'leaflet';
import {useEffect, useState} from 'react';
import {Center, Spinner} from '@chakra-ui/react';
import {Link} from '@chakra-ui/react';

export const MapComponent = ({cards}) => {
  const {coords, positionError} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    watchLocationPermissionChange: true,
  });

  const defaultCenter: LatLngExpression = {lat: 51.505, lng: -0.09};
  const [center, setCenter] = useState<LatLngExpression | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coords) {
      setCenter({lat: coords.latitude, lng: coords.longitude});
      setLoading(false);
    } else if (positionError) {
      setCenter(defaultCenter);
      setLoading(false);
    }
  }, [coords, positionError]);

  if (loading) {
    return (
      <Center height="500px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{height: '500px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cards.map((card, index) => (
        <Marker key={index} position={[card.latitude, card.longitude]}>
          <Popup>
            {card.name} <br />
            {card.description} <br />
            <Link href="https://google.com" isExternal={true}>
              Google
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
