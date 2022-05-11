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
  const currentUser = Parse.User.current()
  activityLog.set(definition.fields.activity, activity);
  activityLog.set(definition.fields.date, new Date());
  activityLog.set(definition.fields.user, currentUser);
  activityLog.setACL(new Parse.ACL(currentUser));
  try {
      activityLog.save()
      return true
  } catch (error) {
      console.log(error)
      return false
  }
}
