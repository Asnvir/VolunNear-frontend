import React, {useState} from 'react';
import {ActivitiesServiceImpl} from '../api/services/activities/service/ActivitiesServiceImpl.ts';
import {ServiceContext} from '../context/ServiceContext.ts';
import {AuthServiceImpl} from '../api/services/auth/service/AuthServiceImpl.ts';
import {VolunteerServiceImpl} from '../api/services/volunteer/VolunteerServiceImpl.ts';
import {ActivitiesService} from '../api/services/activities/service/types.ts';
import {VolunteerService} from '../api/services/volunteer/types.ts';
import {AuthService} from '../api/services/auth/service/types.ts';
import {FormServiceImpl} from '../api/services/form/FormServiceImpl.ts';
import {FormService} from '../api/services/form/types.ts';

type ServiceProviderProps = {
  children: React.ReactNode;
};

const initServices = () => {
  const authService: AuthService = AuthServiceImpl.getInstance();
  const activitiesService: ActivitiesService =
    ActivitiesServiceImpl.getInstance();

  const volunteerService: VolunteerService = VolunteerServiceImpl.getInstance();

  const formService: FormService = FormServiceImpl.getInstance();

  return {authService, activitiesService, volunteerService, formService};
};

export const ServiceProvider = ({children}: ServiceProviderProps) => {
  const [services] = useState(initServices());

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
