import Parse from "parse";

const definition = {
  name: "Date",
  fields: {
    dateString: "dateString",
    eventList: "eventList",
    sessionList: "sessionList",
  },
};

export function createDate(dateString) {
  const Date = Parse.Object.extend(definition.name);
  Date.set(definition.fields.dateString, dateString)
  Date.set(definition.fields.eventList, []);
  Date.set(definition.fields.sessionList, []);
  return Date;
}
