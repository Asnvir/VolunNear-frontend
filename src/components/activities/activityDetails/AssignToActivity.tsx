import {Box, Button, Text, useToast} from '@chakra-ui/react';
import {
  useVolunteerActivityJoined
} from '../../../hooks/volunteer/useVolunteerActivityJoined/useVolunteerActivityJoined.ts';
import {useJoinToActivity} from '../../../hooks/activities/useJoinToActivity/useJoinToActivity.ts';
import {useLeaveActivity} from '../../../hooks/activities/useLeaveActivity/useLeaveActivity.ts';
import React from 'react';

const AssignToActivity: React.FC = ({activityId}) => {

  const toast = useToast();

  const { data: isJoined, isLoading } = useVolunteerActivityJoined(activityId);

  const {mutate: joinToActivity} =  useJoinToActivity();
  const {mutate: leaveActivity} = useLeaveActivity();


  const handleJoinActivity = () => {
    // Add logic to join the activity
    joinToActivity(activityId,
      {
        onSuccess: () => {
          toast(
            {
              title: 'Activity joined successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }
          )
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  const handleCancelActivity = () => {
    leaveActivity(activityId,
      {
        onSuccess: () => {
          toast(
            {
              title: 'Activity cancelled successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
            }
          )
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };


  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" textAlign="center">
      <Text fontSize="lg" fontWeight="bold" mb={2}>Join to activity</Text>
      {!isLoading &&
        <Box mt={4}>
          {isJoined ? (
            <Button colorScheme="red" onClick={handleCancelActivity}>
              Cancel
            </Button>
          ) : (
            <Button variant="primary" onClick={handleJoinActivity}>
              Join Activity
            </Button>
          )}
        </Box>
      }
    </Box>
  );
};

export default AssignToActivity;