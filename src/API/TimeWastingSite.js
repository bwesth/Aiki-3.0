import Parse from "parse";

const definition = {
  name: "TimeWastingSite",
  fields: {
    url: "url",
    user: "user",
  },
};

export function createTimeWastingSite(url) {
  const TimeWastingSite = Parse.Object.extend(definition.name);
  TimeWastingSite.set(definition.fields.url, url);
  TimeWastingSite.set(definition.fields.user, Parse.User.current());
  return TimeWastingSite;
}
