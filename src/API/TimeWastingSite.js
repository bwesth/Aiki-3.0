import Parse from "parse";

const definition = {
  name: "TimeWastingSite",
  fields: {
    url: "url",
    user: "user",
    addedDate: "addedDate",
    removedDate: "removedDate",
  },
};

export function createTimeWastingSite(url) {
  const timeWastingSite = Parse.Object.extend(definition.name);
  timeWastingSite.set(definition.fields.url, url);
  timeWastingSite.set(definition.fields.user, Parse.User.current());
  timeWastingSite.set(definition.fields.addedDate, new Date());
  timeWastingSite.set(definition.fields.removedDate, {});
  return timeWastingSite;
}
