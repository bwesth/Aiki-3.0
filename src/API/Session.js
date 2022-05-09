import Parse from "parse";

const definition = {
  name: "Session",
  fields: {
    from: "from",
    to: "to",
    status: "status",
    start: "start",
    end: "end",
  },
};

const statusTypes = {
  started: "started",
  skipped: "skipped",
  completed: "completed",
  unconventionallyAborted: "unconventionallyAborted",
};

export function createSession() {
  const Session = Parse.Object.extend(definition.name);
  Session.set(definition.fields.from, from);
  Session.set(definition.fields.to, to);
  Session.set(definition.fields.status, statusTypes.started);
  Session.set(definition.fields.start, new Date());
  Session.set(definition.fields.end, new Date());
  return Session;
}
