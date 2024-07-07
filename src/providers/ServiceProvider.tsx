import React, {useState} from 'react';
import {HttpClientImpl} from '../api/HttpClientImpl.ts';
import {ActivitiesServiceImpl} from '../api/services/ActivitiesServiceImpl.ts';
import {LocalStorageHelper} from '../helpers/LocalStorageHelper';
import {ServiceContext} from '../context/ServiceContext';
import {AuthServiceImpl} from '../api/services/AuthServiceImpl.ts';

type ServiceProviderProps = {
  children: React.ReactNode;
};

const initServices = () => {
  const localStorageHelper = new LocalStorageHelper();
  const httpClient = new HttpClientImpl(localStorageHelper);

  const activitiesService = new ActivitiesServiceImpl(httpClient);
  const authService = new AuthServiceImpl(httpClient, localStorageHelper);

  return {authService, activitiesService};
};

export const ServiceProvider = ({children}: ServiceProviderProps) => {
  const [services] = useState(initServices());

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
