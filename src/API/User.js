import Parse from 'parse'
import { createRedirectionTargetSite } from './RedirectionTargetSite';

export const definition = {
    name: "User",
    fields: {
      email: "email",
      password: "password",
      timeWastingSiteList: "timeWastingSiteList",
      redirectionTargetSite: "redirectionTargetSite",
      activityStats: "activityStats",
    }
}

export function createUser(email, password) {
    const extensionReference = await browser.management.getSelf();
    const optionsPageURL = extensionReference.optionsUrl
    const User = Parse.User();
    User.set(definition.fields.email, email)
    User.set(definition.fields.password, password)
    User.set(definition.fields.timeWastingSiteList, [])
    User.set(definition.fields.redirectionTargetSite, createRedirectionTargetSite(optionsPageURL))
    User.set(definition.fields.activityStats, [])
    return User
}

