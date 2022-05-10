import Parse from "parse";

const definition = {
  name: "RedirectionTargetSite",
  fields: {
    url: "url",
    user: "user",
    addedDate: "addedDate",
    removedDate: "removedDate",
  },
};

export function createRedirectionTargetSite(url) {
  const redirectionTargetSite = Parse.Object.extend(definition.name);
  redirectionTargetSite.set(definition.fields.url, url);
  redirectionTargetSite.set(definition.fields.user, Parse.User.current());
  redirectionTargetSite.set(definition.fields.addedDate, new Date());
  redirectionTargetSite.set(definition.fields.removedDate, {});
  return redirectionTargetSite;
}
