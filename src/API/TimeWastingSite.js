import Parse from "parse";

const definition = {
  name: "TimeWastingSite",
  fields: { url: "url" },
};

export function createTimeWastingSite(url) {
  const TimeWastingSite = Parse.Object.extend(definition.name);
  TimeWastingSite.set(definition.fields.url, url);
  return TimeWastingSite;
}
