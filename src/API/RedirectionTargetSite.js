import Parse from "parse";

const definition = {
  name: "RedirectionTargetSite",
  fields: { url: "url" },
};

export function createRedirectionTargetSite(url) {
  const RedirectionTargetSite = Parse.Object.extend(definition.name);
  RedirectionTargetSite.set(definition.fields.url, url);
  return RedirectionTargetSite;
}
