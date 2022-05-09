import Parse from "parse";

const definition = {
  name: "event",
  fields: {
    dateTime: "dateTime",
    type: "type",
    details: "details",
    user: "user",
  },
};

export const eventNames = {
  sessionCompleted: "sessionCompleted",
  sessionSkipped: "sessionSkipped",
  redirectWarningTriggered: "redirectWarningTriggered",
  redirectSnoozed: "snoozed",
  redirected: "redirected",
  targetSiteFocused: "targetSiteFocused",
  targetSiteUnocused: "targetSiteUnocused",
  siteBlockerTriggered: "siteBlockerTriggered",
  redirectionToggledOff: "redirectionToggledOff",
  redirectionToggledOn: "redirectionToggledOn",
  redirectionTargetVisited: "redirectionTargetVisited",
};

export function createEvent(type, details) {
  const Event = Parse.Object.extend(definition.name);
  Event.set(definition.fields.dateTime, new Date());
  Event.set(definition.fields.type, type);
  Event.set(definition.fields.details, details);
  Event.set(definition.fields.user, Parse.User.current());
  return Event;
}
