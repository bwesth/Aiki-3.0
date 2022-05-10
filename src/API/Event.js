import Parse from "parse";

const definition = {
  name: "event",
  fields: {
    date: "date",
    type: "type",
    details: "details",
    user: "user",
  },
};

export const eventNames = {
  gotoOrigin: "gotoOrigin", // Bad name
  redirected: "redirected",
  settingsChanged: "settingsChanged", //TODO
  redirectWarningTriggered: "redirectWarningTriggered",
  redirectWarningSnoozed: "redirectWarningSnoozed",
  targetSiteFocused: "targetSiteFocused", //TODO
  targetSiteUnocused: "targetSiteUnocused", //TODO
  siteBlockerTriggered: "siteBlockerTriggered", //TODO
  blockerButtonPressed: "blockerButtonPressed", //TODO
  redirectionToggledOff: "redirectionToggledOff",
  redirectionToggledOn: "redirectionToggledOn",
  redirectionTargetVisited: "redirectionTargetVisited",
};

export const reasonNames = {
  gotoOrigin: {
    complete: "Session completed",
    skip: "Session skipped",
  },
  redirected: {
    autoResolved: "Countdown auto-resolved",
    instant: "Instant redirect due to tab change or navigation event",
  },
};

export const settingsMessages = {
  learningTime: "User changed learning time in settings",
  rewardTime: "User changed reward time in settings",
  operatingHoursEnd: "User changed end time for operating hours in settings",
  operatingHoursStart: "User changed start time for operating hours in settings",
  timeWastingSiteRemoved: "User removed time wasting site",
  timeWastingSiteAdded:"User added time wasting site",
  addedUser: "Added user ID to storage",
  resetUser: "Reset user ID in storage",
}

export function createEvent(type, details) {
  const event = Parse.Object.extend(definition.name);
  event.set(definition.fields.date, new Date());
  event.set(definition.fields.type, type);
  event.set(definition.fields.details, details);
  event.set(definition.fields.user, Parse.User.current());
  return event;
}
