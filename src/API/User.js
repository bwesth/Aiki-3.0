import Parse from "parse";

import { hash } from "../util/security";

export const definition = {
  name: "User",
  fields: {
    username: "username",
    password: "password",
    // email: "email", // using email as username
    timeWastingSiteList: "timeWastingSiteList",
    redirectionTargetSite: "redirectionTargetSite",
    createdDate: "createdDate",
    archivedDate: "archivedDate",
    isArchived: "isArchived",
  },
};

export async function signup(email, password) {
  const user = Parse.User();
  user.set(definition.fields.username, email);
  user.set(definition.fields.password, password);
  user.set(definition.fields.timeWastingSiteList, []);
  user.set(definition.fields.redirectionTargetSite, "");
  user.set(definition.fields.createdDate, new Date());
  user.set(definition.fields.archivedDate, {});
  user.set(definition.fields.isArchived, false);
  try {
    await user.signup();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function login(email, password) {
  try {
    const user = await Parse.User.logIn(email, password);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const currentUser = await Parse.User.logOut();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function archiveUser() {
  const currentUser = await Parse.User.currentUser();
  currentUser.set(definition.fields.isArchived, true);
  currentUser.set(definition.fields.archivedDate, new Date());
  currentUser.set(definition.fields.username, hash(currentUser.username));
  try {
    currentUser.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function resetPassword(email) {
  try {
    await Parse.User.requestPasswordReset(email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
