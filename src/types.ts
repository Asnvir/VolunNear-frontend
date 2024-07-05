// User.ts
export type User = {
    email: string;
    username: string;
    name: string;
    role: "volunteer" | "organization"; // depending on the role, the profile fields will differ
};

// Event.ts
export type Event = {
    id: string;
    name: string;
    description: string;
    date: string;
    city: string;
    country: string;
    organizationId: string; // Reference to the organizing entity
};

export type EventsResponse = Event[];

// Organization.ts
export type Organization = {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    username: string;
};

// Feedback.ts
export type Feedback = {
    id: string;
    eventId: string; // Reference to the event
    organizationId: string; // Reference to the organization
    userId: string; // Reference to the user providing the feedback
    message: string;
};

// FilterCriteria.ts
export type FilterCriteria = {
    name?: string;
    date?: string;
    type?: string;
    city?: string;
    country?: string;
    organization?: string;
};

// Menu.ts
export type Menu = {
    items: MenuItem[];
};

export type MenuItem = {
    label: string;
    route: string;
};

// EventList.ts
export type EventList = {
    events: Event[];
};

// OrganizationList.ts
export type OrganizationList = {
    organizations: Organization[];
};

// FeedbackList.ts
export type FeedbackList = {
    feedbacks: Feedback[];
};
