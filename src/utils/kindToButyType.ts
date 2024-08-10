import {ActivityType} from '../api/services/activities/service/types.ts';

export function beautifyActivityType(type: ActivityType): string {
  switch (type) {
    case ActivityType.UNKNOWN:
      return 'Unknown';
    case ActivityType.FAMILY:
      return 'Family';
    case ActivityType.SPORT:
      return 'Sport';
    case ActivityType.EDUCATION:
      return 'Education';
    case ActivityType.ENVIRONMENT:
      return 'Environment';
    case ActivityType.HEALTH:
      return 'Health';
    case ActivityType.COMMUNITY:
      return 'Community';
    case ActivityType.CULTURE:
      return 'Culture';
    case ActivityType.TECHNOLOGY:
      return 'Technology';
    case ActivityType.ANIMAL_CARE:
      return 'Animal Care';
    case ActivityType.ELDERLY_CARE:
      return 'Elderly Care';
    case ActivityType.DISASTER_RELIEF:
      return 'Disaster Relief';
    case ActivityType.ARTS:
      return 'Arts';
    case ActivityType.MUSIC:
      return 'Music';
    case ActivityType.CHILDREN:
      return 'Children';
    case ActivityType.OTHER:
      return 'Other';
    default:
      return type; // Fallback to the original value if no match is found
  }
}

export const mapToActivityType = (value: string): ActivityType => {
  switch (value.toUpperCase()) {
    case 'UNKNOWN':
      return ActivityType.UNKNOWN;
    case 'FAMILY':
      return ActivityType.FAMILY;
    case 'SPORT':
      return ActivityType.SPORT;
    case 'EDUCATION':
      return ActivityType.EDUCATION;
    case 'ENVIRONMENT':
      return ActivityType.ENVIRONMENT;
    case 'HEALTH':
      return ActivityType.HEALTH;
    case 'COMMUNITY':
      return ActivityType.COMMUNITY;
    case 'CULTURE':
      return ActivityType.CULTURE;
    case 'TECHNOLOGY':
      return ActivityType.TECHNOLOGY;
    case 'ANIMAL CARE':
      return ActivityType.ANIMAL_CARE;
    case 'ELDERLY CARE':
      return ActivityType.ELDERLY_CARE;
    case 'DISASTER RELIEF':
      return ActivityType.DISASTER_RELIEF;
    case 'ARTS':
      return ActivityType.ARTS;
    case 'MUSIC':
      return ActivityType.MUSIC;
    case 'CHILDREN':
      return ActivityType.CHILDREN;
    case 'OTHER':
      return ActivityType.OTHER;
    default:
      return ActivityType.ALL;
  }
};
