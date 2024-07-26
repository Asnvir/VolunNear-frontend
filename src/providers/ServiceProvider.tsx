import React, {useState} from 'react';
import {HttpClientImpl} from '../api/services/http/HttpClientImpl.ts';
import {ActivitiesServiceImpl} from '../api/services/activities/service/ActivitiesServiceImpl.ts';
import {LocalStorageHelperImpl} from '../helpers/LocalStorageHelper';
import {ServiceContext} from '../context/ServiceContext.ts';
import {AuthServiceImpl} from '../api/services/auth/service/AuthServiceImpl.ts';
import {LocalStorageHelper} from '../helpers/types.ts';
import {VolunteerServiceImpl} from '../api/services/volunteer/VolunteerServiceImpl.ts';
import {HttpClientService} from '../api/services/http/types.ts';
import {ActivitiesService} from '../api/services/activities/service/types.ts';
import {VolunteerService} from '../api/services/volunteer/types.ts';
import {AuthService} from '../api/services/auth/service/types.ts';

type ServiceProviderProps = {
  children: React.ReactNode;
};

const initServices = () => {
  const localStorageHelper: LocalStorageHelper =
    LocalStorageHelperImpl.getInstance();
  const httpClient: HttpClientService =
    HttpClientImpl.getInstance(localStorageHelper);

  const authService: AuthService = AuthServiceImpl.getInstance(
    httpClient,
    localStorageHelper
  );
  const activitiesService: ActivitiesService =
    ActivitiesServiceImpl.getInstance(httpClient);

  const volunteerService: VolunteerService =
    VolunteerServiceImpl.getInstance(httpClient);

  return {authService, activitiesService, volunteerService};
};

export const ServiceProvider = ({children}: ServiceProviderProps) => {
  const [services] = useState(initServices());

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
