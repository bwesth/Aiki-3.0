import Parse from "parse";
import { apiKey, jsKey } from "../../secret";

import { createActivityLog } from "./ActivityLog";
import { signup, login, archiveUser, resetPassword } from './User'
import { createEvent } from "./Event";
import { createRedirectionTargetSite } from "./RedirectionTargetSite";
import { createSession } from "./Session";
import { createTimeWastingSite, removeTimeWastingSite } from "./TimeWastingSite";

Parse.initialize(apiKey, jsKey);
Parse.serverURL = "https://parseapi.back4app.com/";

export default {
  activityLog: {create: createActivityLog},
  event: {create: createEvent},
  redirectionTargetSite: {create: createRedirectionTargetSite},
  session: {create: createSession},
  timeWastingSite: {create: createTimeWastingSite, remove: removeTimeWastingSite},
  user: {signup: signup, login: login, archive: archiveUser, resetPassword: resetPassword },
}