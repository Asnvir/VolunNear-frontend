import React, {useState} from 'react';
import {HttpClientImpl} from '../api/HttpClientImpl.ts';
import {ActivitiesService} from '../api/services/ActivitiesService';
import {LocalStorageHelper} from '../helpers/LocalStorageHelper';
import {ServiceContext} from '../context/ServiceContext';
import {AuthService} from "../api/services/AuthService.ts";

type ServiceProviderProps = {
  children: React.ReactNode;
};

const initServices = () => {
  const localStorageHelper = new LocalStorageHelper();
  const httpClient = new HttpClientImpl(localStorageHelper);

  const activitiesService = new ActivitiesService(httpClient);
  const authService = new AuthService(httpClient, localStorageHelper);

  return {authService, activitiesService};
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({children}) => {
  const [services] = useState(initServices());

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
