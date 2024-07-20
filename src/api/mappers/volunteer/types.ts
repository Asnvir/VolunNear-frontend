import {ActivitiesFiltersType} from '../../../context/types.ts';

export type VolunteerMapper = {
  preferencesToDTO(filters: ActivitiesFiltersType): ActivitiesFiltersDTO;
};

export type ActivitiesFiltersDTO = {
  preferences: string[];
};
