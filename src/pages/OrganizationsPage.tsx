import {OrganizationsFilter} from '../components/organizations/filter/OrganizationsFilter.tsx';
import {useState} from 'react';
import {ActivitiesFiltersType} from '../api/services/activities/service/types.ts';
import {OrganizationFiltersType} from '../api/services/organizations/types.ts';
import {emptyOrganizationFilters} from '../hooks/organizations/useOrganizationsFilterForm/useOrganizationsFilterForm.tsx';
import {OrganizationsList} from '../components/organizations/list/OrganizationsList.tsx';

export const OrganizationsPage = () => {
  const [filters, setFilters] = useState<OrganizationFiltersType>(
    emptyOrganizationFilters
  );

  const handleFiltersChange = (filters: ActivitiesFiltersType) => {
    setFilters(filters);
    console.log(`Filters: ${JSON.stringify(filters)}`);
  };
  return (
    <>
      <OrganizationsFilter onApply={handleFiltersChange} />
      <OrganizationsList filters={filters} />
    </>
  );
};
