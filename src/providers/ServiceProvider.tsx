import React, {useState} from 'react';
import {ActivitiesServiceImpl} from '../api/services/activities/service/ActivitiesServiceImpl.ts';
import {ServiceContext} from '../context/ServiceContext.ts';
import {AuthServiceImpl} from '../api/services/auth/service/AuthServiceImpl.ts';
import {VolunteerServiceImpl} from '../api/services/volunteer/VolunteerServiceImpl.ts';
import {ActivitiesService} from '../api/services/activities/service/types.ts';
import {VolunteerService} from '../api/services/volunteer/types.ts';
import {AuthService} from '../api/services/auth/service/types.ts';
import {FileUploadServiceImpl} from '../api/services/files/service/FileServiceImpl.ts';
import {PlacesServiceImpl} from '../api/services/places/PlacesServiceImpl.ts';
import {PlacesService} from '../api/services/places/types.ts';
import {OrganizationService} from '../api/services/organizations/types.ts';
import {OrganizationServiceImpl} from '../api/services/organizations/OrganizationServiceImpl.ts';
import {NotificationServiceImpl} from '../api/services/notifications/NotificationServiceImpl.ts';
import {FeedbackServiceImpl} from '../api/services/feedbacks/FeedbackServiceImpl.ts';

type ServiceProviderProps = {
  children: React.ReactNode;
};

const initServices = () => {
  const authService: AuthService = AuthServiceImpl.getInstance();
  const activitiesService: ActivitiesService =
    ActivitiesServiceImpl.getInstance();

  const organizationService: OrganizationService =
    OrganizationServiceImpl.getInstance();

  const volunteerService: VolunteerService = VolunteerServiceImpl.getInstance();

  const formService: PlacesService = PlacesServiceImpl.getInstance();

  const fileUploadService = FileUploadServiceImpl.getInstance();

  const notificationService = NotificationServiceImpl.getInstance();

  const feedbackService = FeedbackServiceImpl.getInstance();

  return {
    authService,
    activitiesService,
    organizationService,
    volunteerService,
    formService,
    fileUploadService,
    notificationService,
    feedbackService
  };
};

export const ServiceProvider = ({children}: ServiceProviderProps) => {
  const [services] = useState(initServices());

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
