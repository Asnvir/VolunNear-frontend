import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useGeolocated} from 'react-geolocated';
import {LatLngExpression} from 'leaflet';
import {useEffect, useState} from 'react';
import {Center, IconButton, Link, Spinner} from '@chakra-ui/react';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {ActivitiesMapComponentProps} from './types.ts';
import {useNavigate} from 'react-router-dom';

const LocateButton = ({coords}: {coords: LatLngExpression | undefined}) => {
  const map = useMap();

  const handleClick = () => {
    if (coords) {
      map.setView(coords, 13); // Recenter the map to the user's location
    }
  };

  return (
    <IconButton
      position="absolute"
      bottom="10px" // Positioning at the bottom
      left="10px" // Positioning at the left
      zIndex="1000"
      aria-label="Center map on your location"
      icon={<FaMapMarkerAlt />}
      onClick={handleClick}
      size="sm"
      borderRadius="full"
      bg="black" // Set the background color to black
      color="white" // Set the icon color to white
      _hover={{bg: 'gray.700'}} // Darker gray on hover
    />
  );
};

export const ActivitiesMapComponent = ({
  // isMyActivities,
  // filters,
  activities,
}: ActivitiesMapComponentProps) => {
  const {coords, positionError} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
    watchLocationPermissionChange: true,
  });

  const defaultCenter: LatLngExpression = {lat: 51.505, lng: -0.09};
  const [center, setCenter] = useState<LatLngExpression | undefined>(undefined);
  const [loadingGeoPosition, setLoadingGeoPosition] = useState(true);
  const navigate = useNavigate();

  // const {
  //   data: activities,
  //   // isLoading: isLoadingActivities,
  //   // error: errorActivities,
  //   // isGeolocationAvailable,
  //   // isGeolocationEnabled,
  //   // positionError,
  // } = useGetVolunteerActivities({isMyActivities, filters});

  useEffect(() => {
    if (coords) {
      setCenter({lat: coords.latitude, lng: coords.longitude});
      setLoadingGeoPosition(false);
    } else if (positionError) {
      setCenter(defaultCenter);
      setLoadingGeoPosition(false);
    }
  }, [coords, positionError]);

  if (loadingGeoPosition) {
    return (
      <Center height="500px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!activities || activities.length === 0) {
    return <Center height="500px">No activities found</Center>;
  }

  console.log(`Activities: ${JSON.stringify(activities)}`);
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{height: '500px', width: '100%', zIndex: 1}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {activities?.map((activity, index) => (
        <Marker
          key={index}
          position={[activity.activityLatitude, activity.activityLongitude]}
        >
          <Popup>
            {activity.activityTitle} <br />
            <Link
              as="button" // Makes the Link act as a button
              onClick={() =>
                navigate(`/activity/${activity.activityId}`, {
                  state: {activity},
                })
              }
              color="blue.500" // Set the text color to blue
              textDecoration="underline" // Underline the text to make it look like a link
              background="none" // Remove the background
              _hover={{textDecoration: 'none', color: 'blue.700'}} // Add hover effect
              _focus={{boxShadow: 'none'}} // Remove focus outline
            >
              Read more...
            </Link>
          </Popup>
        </Marker>
      ))}
      <LocateButton
        coords={
          coords ? {lat: coords.latitude, lng: coords.longitude} : undefined
        }
      />
    </MapContainer>
  );
};
