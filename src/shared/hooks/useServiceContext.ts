import {useContext} from 'react';
import {ServiceContext} from '../../context/ServiceContext.ts';

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};
