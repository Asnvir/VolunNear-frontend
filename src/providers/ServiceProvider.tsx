import React, {useState} from 'react';
import {HttpClientImpl} from '../api/HttpClientImpl.ts';
import {ActivitiesService} from '../api/services/ActivitiesService';
import {LocalStorageHelper} from '../helpers/LocalStorageHelper';
import {ServiceContext} from '../context/ServiceContext';

type ServiceProviderProps = {
  children: React.ReactNode;
};

const initServices = () => {
  const localStorageHelper = new LocalStorageHelper();
  const httpClient = new HttpClientImpl(localStorageHelper);

  const activitiesService = new ActivitiesService(httpClient);

  return {activitiesService};
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({children}) => {
  const [services] = useState(initServices());

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
