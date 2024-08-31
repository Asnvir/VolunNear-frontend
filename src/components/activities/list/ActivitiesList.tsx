import {Box, SimpleGrid} from '@chakra-ui/react';
import {ActivityCard} from '../ActivityCard.tsx';
import {useNavigate} from 'react-router-dom';
import {Activity} from '../../../api/types.ts';

type ActivitiesListProps = {
  activities: Activity[];
};

export const ActivitiesList = ({activities}: ActivitiesListProps) => {
  const navigate = useNavigate();
  const areActivitiesAvailable = activities && activities.length > 0;

  const handleActivityClick = (activity: Activity) => {
    navigate(`/activity/${activity.activityId}`, {state: {activity}});
  };

  return (
    <Box p={4}>
      {areActivitiesAvailable && (
        <>
          <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={6}>
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity}
                onClick={handleActivityClick}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};
