import {useServiceContext} from "../shared/hooks/useServiceContext.tsx";
import {IRegistrationOrganisationRequestDTO, IRegistrationVolunteerRequestDTO} from "../api/types/data-contracts.ts";


export const useRegister = () => {
    const {authService} = useServiceContext();
    const registerOrg =(registrationOrganizationDTO: IRegistrationOrganisationRequestDTO) => authService.registerOrganisation(registrationOrganizationDTO);
    const registerVol = (registrationVolunteerDTO: IRegistrationVolunteerRequestDTO) => authService.registerVolunteer(registrationVolunteerDTO);
    return {registerOrg, registerVol}
}