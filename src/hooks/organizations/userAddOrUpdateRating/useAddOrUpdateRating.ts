import {useServiceContext} from '../../../shared/hooks/useServiceContext.ts';
import {useMutation} from '@tanstack/react-query';
import {
  MUTATION_KEY_RATE_ORGANISATION,
} from '../../../utils/constants/reactQueryKeys.ts';
import {RateOrgParams} from './types.ts';


export const useAddOrUpdateRating = () => {
  const {organizationService} = useServiceContext();
  const mutation = useMutation({
    mutationKey: [MUTATION_KEY_RATE_ORGANISATION],
    mutationFn: (rateOrgParams: RateOrgParams) => {
      console.log(`orgId: ${rateOrgParams.orgId}, rating: ${rateOrgParams.rating}`)
      return organizationService.addOrUpdateRating(rateOrgParams.orgId, rateOrgParams.rating);
    },
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error?.message,
  };
};
