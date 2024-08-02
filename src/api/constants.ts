export const API_ENDPOINTS = {
  LOGIN: `/api/v1/login`,
  REGISTER_ORGANISATION: `/api/v1/registration/organisation`,
  REGISTER_VOLUNTEER: `/api/v1/registration/volunteer`,
  VOLUNTEER_PROFILE: `/api/v1/volunteer/my_profile`,
  UPDATE_VOLUNTEER_PROFILE: `/api/v1/update/volunteer`,
  UPLOAD_VOLUNTEER_AVATAR: `/api/v1/upload/avatar/volunteer`,
  UPLOAD_ORGANISATION_LOGO: `/api/v1/upload/avatar/organisation`,
  CHANGE_PASSWORD: `/api/v1/change_password`,
  JOIN_ACTIVITY: `/api/v1/volunteer/enter_to_activity?id=`,
  LEAVE_ACTIVITY: `/api/v1/volunteer/leave_activity?id=`,
  IS_VOLUNTEER_JOINED: `/api/v1/volunteer/is_my_activity?activityId=`,
};
