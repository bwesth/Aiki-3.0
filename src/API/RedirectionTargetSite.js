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

export async function createRedirectionTargetSite(url) {
  const redirectionTargetSite = Parse.Object.extend(definition.name);
  const currentUser = Parse.User.current();
  redirectionTargetSite.set(definition.fields.url, url);
  redirectionTargetSite.set(definition.fields.user, Parse.User.current());
  redirectionTargetSite.set(definition.fields.addedDate, new Date());
  redirectionTargetSite.set(definition.fields.removedDate, {});
  redirectionTargetSite.setACL(new Parse.ACL(currentUser));
  try {
    await redirectionTargetSite.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeRedirectionTargetSite(url) {
  const redirectionTargetSite = Parse.Object.extend(definition.name);
  const currentUser = Parse.User.current();
  const query = new Parse.Query(redirectionTargetSite);
  query.equalTo(definition.fields.user, currentUser);
  query.equalTo(definition.fields.url, url);
  try {
    await redirectionTargetSite.destroy();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
