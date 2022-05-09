import Parse from "parse";

const definition = {
  name: "event",
  fields: {
    dateTime: "dateTime",
    type: "type",
  },
};

const eventTypes = {
  sessionCompleted: "sessionCompleted",
  sessionSkipped: "sessionSkipped",
  redirectWarningTriggered: "redirectWarningTriggered",
  redirectSnoozed: "snoozed",
  redirected: "redirected",
  targetSiteFocused: "targetSiteFocused",
  targetSiteUnocused: "targetSiteUnocused",
  siteBlockerTriggered: "siteBlockerTriggered",
};

export function createEvent(type) {
  const Event = Parse.Object.extend(definition.name);
  Event.set(definition.fields.dateTime, new Date());
  Event.set(definition.fields.type, type);
  return Event;
}
