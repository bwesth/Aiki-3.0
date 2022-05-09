import Parse from 'parse'
import { createRedirectionTargetSite } from './RedirectionTargetSite';

const definition = {
    name: "User",
    fields: {
      email: "email",
      timeWastingSiteList: "timeWastingSiteList",
      redirectionTargetSite: "redirectionTargetSite",
      dateList: "dateList",
      sessionStats: "sessionStats",
    }
}

export function createUser(email) {
    const extensionReference = await browser.management.getSelf();
    const optionsPageURL = extensionReference.optionsUrl
    const User = Parse.Object.extend(definition.name);
    User.set(definition.fields.email, email)
    User.set(definition.fields.timeWastingSiteList, [])
    User.set(definition.fields.redirectionTargetSite, createRedirectionTargetSite(optionsPageURL))
    User.set(definition.fields.dateList, [])
    User.set(definition.fields.sessionStats, [])
    return User
}