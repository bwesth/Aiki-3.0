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
  const currentUser = Parse.User.current()
  redirectionTargetSite.set(definition.fields.url, url);
  redirectionTargetSite.set(definition.fields.user, Parse.User.current());
  redirectionTargetSite.set(definition.fields.addedDate, new Date());
  redirectionTargetSite.set(definition.fields.removedDate, {});
  redirectionTargetSite.setACL(new Parse.ACL(currentUser));
  try {
    redirectionTargetSite.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
