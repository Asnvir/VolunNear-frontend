import {useEffect, useState} from 'react';
import {useServiceContext} from '../shared/hooks/useServiceContext.ts';
import {Activity} from '../api/types';

export const useGetAllActivities = () => {
  const {activitiesService} = useServiceContext();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const activities = await activitiesService.getActivities();
        setActivities(activities);
      } catch (err) {
        setError('Error fetching events');
        console.error('Error fetching events', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activitiesService]);

  return {activities, loading, error};
};
