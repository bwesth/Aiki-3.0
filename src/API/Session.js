import Parse from "parse";

const definition = {
  name: "Session",
  fields: {
    from: "from",
    to: "to",
    status: "status",
    startDate: "startDate",
    endDate: "endDate",
    user: "user",
  },
};

const statusNames = {
  started: "started",
  skipped: "skipped",
  completed: "completed",
  unconventionallyAborted: "unconventionallyAborted",
};

export function createSession() {
  const session = Parse.Object.extend(definition.name);
  const currentUser = Parse.User.current()
  session.set(definition.fields.from, from);
  session.set(definition.fields.to, to);
  session.set(definition.fields.status, statusNames.started);
  session.set(definition.fields.startDate, new Date());
  session.set(definition.fields.endDate, {});
  session.set(definition.fields.user, Parse.User.current());
  session.setACL(new Parse.ACL(currentUser));
  try {
    session.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
