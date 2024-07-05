import { ActivityDTO, Activity, OrganisationDTO } from "../types";

export class ActivityMapper {

    static fromDTO({activity,organization}: {activity: ActivityDTO, organization: OrganisationDTO}): Activity {
        return {
            activityId: activity.id,
            activityCity: activity.city,
            activityCountry: activity.country,
            activityDateOfPlace: activity.dateOfPlace,
            activityDescription: activity.description,
            activityTitle: activity.title,
            activityKind: activity.kindOfActivity,
            organisationId: organization.id,
            organisationName: organization.nameOfOrganisation,
            organisationCountry: organization.country,
            organisationCity: organization.city,
            organisationAddress: organization.address,
        }
    }
}