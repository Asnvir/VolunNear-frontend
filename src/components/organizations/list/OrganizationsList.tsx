import {useState} from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {OrganizationFiltersType} from '../../../api/services/organizations/types.ts';
import {useGetOrganisations} from '../../../hooks/organizations/useGetOrganizations/useGetOrganisations.tsx';
import {OrganisationCard} from '../card/OrganisationCard.tsx';
import {
  useSubscribedToOrganisation
} from '../../../hooks/notifications/useSubscribeToOrganisation/useSubscribedToOrganisation.ts';
import {
  useUnSubscribeToOrganisation
} from '../../../hooks/notifications/useUnSubscribeToOrganisation/useUnSubscribeToOrganisation.ts';
import {
  useGetAllSubscribedOrganisation
} from '../../../hooks/notifications/useGetAllSubscribedOrganisations/useGetAllSubscribedOrganisation.ts';

export type OrganizationsListProps = {
  filters: OrganizationFiltersType;
};

export const OrganizationsList = ({filters}: OrganizationsListProps) => {
  const {
    data: organizations,
    isLoading: isLoadingActivities,
    error: errorActivities,
  } = useGetOrganisations({filters});

  const {mutate: subscribeToOrganisation} = useSubscribedToOrganisation();
  const {mutate: unSubscribeToOrganisation} = useUnSubscribeToOrganisation();
  const {data: subscribedOrganisations, refetch} = useGetAllSubscribedOrganisation();

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const showList = !!(organizations && organizations.length > 0);
  const isSubscribed = (organizationID: string): boolean => {
    return subscribedOrganisations?.some((sub) => sub.id === organizationID);
  };
  const handleOrganisationClick = (id: string) => {
    navigate(`/organisation/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubscribe = (organizationID: string) => {
    subscribeToOrganisation(organizationID);
    refetch();
  }
  const handleUnSubscribe = (organizationID: string) => {
    unSubscribeToOrganisation(organizationID);
    refetch();
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentOrganisations = organizations
  //   ? organizations.slice(startIndex, endIndex)
  //   : [];

  const totalPages = organizations
    ? Math.ceil(organizations.length / itemsPerPage)
    : 0;

  if (isLoadingActivities) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (errorActivities) {
    return (
      <Alert status="error">
        <AlertIcon />
        {errorActivities}
      </Alert>
    );
  }

  return (
    <Box p={4}>
      {showList && (
        <>
          <Heading as="h2" size="lg" mb="4">
            All Activities
          </Heading>
          <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={6}>
            {organizations.map((organization, index) => (
              <OrganisationCard
                key={index}
                organisation={organization}
                onClick={handleOrganisationClick}
                onSubscribe={handleSubscribe}
                onUnSubscribe={handleUnSubscribe}
                isSubscribed={isSubscribed(organization.id)}
              />
            ))}
          </SimpleGrid>
          <Flex justify="center" mt={4}>
            {Array.from({length: totalPages}, (_, i) => (
              <Button
                key={i + 1}
                mx={1}
                onClick={() => handlePageChange(i + 1)}
                bg={currentPage === i + 1 ? '#FF7A00' : 'gray.200'}
                color={currentPage === i + 1 ? 'white' : 'black'}
                _hover={{bg: currentPage === i + 1 ? '#FF7A00' : 'gray.300'}}
              >
                {i + 1}
              </Button>
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
};
