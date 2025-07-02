export interface User {
    admin: boolean;
    avatarUrl: string;
    commentCount: number;
    customRole: boolean;
    email: string;
    emailHash: string;
    firstName: string;
    globalModerator: boolean;
    id: number;
    ideaCount: number;
    identityHidden: boolean;
    kudoCount: number;
    lastAccess: string; // or Date if you prefer to use Date objects
    lastName: string;
    modifiedAt: string; // or Date
    name: string;
    profileQuestions: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
        [key: string]: string; // for any additional dynamic properties
    };
    registeredDateTime: string; // or Date
    source: string;
    status: string;
    tosAccepted: boolean;
    userName: string;
    voteCount: number;
}