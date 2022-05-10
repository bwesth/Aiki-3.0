import Parse from "parse";

const definition = {
  name: "ActivityLog",
  fields: {
    activity: "activity",
    date: "date",
    user: "user",
  },
};

export function createActivityLog(activity) {
  const activityLog = Parse.Object.extend(definition.name);
  activityLog.set(definition.fields.activity, activity);
  activityLog.set(definition.fields.date, new Date());
  activityLog.set(definition.fields.user, Parse.User.current());
  return activityLog;
}
