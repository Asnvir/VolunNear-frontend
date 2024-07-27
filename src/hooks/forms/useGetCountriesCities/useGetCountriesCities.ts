import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY_GET_COUNTIRES_CITIES} from '../../../utils/constants/reactQueryKeys.ts';

export const useGetCountriesCities = () => {
  const {formService} = useServiceContext();

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_COUNTIRES_CITIES],
    queryFn: () => formService.getCountriesData(),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error?.message,
  };
};
