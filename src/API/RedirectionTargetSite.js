import Parse from "parse";

const definition = {
  name: "RedirectionTargetSite",
  fields: {
    url: "url",
    user: "user",
  },
};

export function createRedirectionTargetSite(url) {
  const RedirectionTargetSite = Parse.Object.extend(definition.name);
  RedirectionTargetSite.set(definition.fields.url, url);
  RedirectionTargetSite.set(definition.fields.user, Parse.User.current());
  return RedirectionTargetSite;
}
