import {Idea} from "../types/Idea.js";
import {User} from "../types/User.js";

export function formatIdea(idea: Idea): string {
    return [
        `id: ${idea.id || "Unknown"}`,
        `title: ${idea.title || "Unknown"}`,
        `text: ${idea.text || "Unknown"}`,
        `campaignName: ${idea.campaignName || "Unknown"}`,
        `voteCount: ${idea.voteCount || "Unknown"}`,
        `url: ${idea.url || "Unknown"}`,
        `creationDateTime: ${idea.creationDateTime || "Unknown"}`,
        "---",
    ].join("\n");
}

export function formatMember(member: User): string {
    return [
        `id: ${member.id || "Unknown"}`,
        `name: ${member.name || "Unknown"}`,
        `email: ${member.email || "Unknown"}`,
        `userName: ${member.userName || "Unknown"}`,
        `firstName: ${member.firstName || "Unknown"}`,
        `lastName: ${member.lastName || "Unknown"}`,
        `avatarUrl: ${member.avatarUrl || "Unknown"}`,
        `commentCount: ${member.commentCount || "Unknown"}`,
        `ideaCount: ${member.ideaCount || "Unknown"}`,
        `kudoCount: ${member.kudoCount || "Unknown"}`,
        `voteCount: ${member.voteCount || "Unknown"}`,
        `registeredDateTime: ${member.registeredDateTime || "Unknown"}`,
        `lastAccess: ${member.lastAccess || "Unknown"}`,
        `modifiedAt: ${member.modifiedAt || "Unknown"}`,
        `status: ${member.status || "Unknown"}`,
        `source: ${member.source || "Unknown"}`,
        `tosAccepted: ${member.tosAccepted || "Unknown"}`,
        `identityHidden: ${member.identityHidden || "Unknown"}`,
        `globalModerator: ${member.globalModerator || "Unknown"}`,
        `customRole: ${member.customRole || "Unknown"}`,
        `profileQuestions: ${JSON.stringify(member.profileQuestions) || "Unknown"}`,
        "---",
    ].join("\n");
}