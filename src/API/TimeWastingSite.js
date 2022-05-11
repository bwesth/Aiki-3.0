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

export async function createTimeWastingSite(url) {
  const timeWastingSite = Parse.Object.extend(definition.name);
  const currentUser = Parse.User.current();
  timeWastingSite.set(definition.fields.url, url);
  timeWastingSite.set(definition.fields.user, Parse.User.current());
  timeWastingSite.set(definition.fields.addedDate, new Date());
  timeWastingSite.set(definition.fields.removedDate, {});
  timeWastingSite.setACL(new Parse.ACL(currentUser));
  try {
    await timeWastingSite.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeTimeWastingSite(url) {
  const timeWastingSite = Parse.Object.extend(definition.name);
  const currentUser = Parse.User.current();
  const query = new Parse.Query(timeWastingSite);
  query.equalTo(definition.fields.user, currentUser);
  query.equalTo(definition.fields.url, url);
  try {
    await timeWastingSite.destroy();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
