import Parse from "parse";
import { apiKey, jsKey } from "../../secret";

import { createUser } from './User'
import { createDate } from "./Date";
import { createEvent } from "./Event";
import { createRedirectionTargetSite } from "./RedirectionTargetSite";
import { createSession } from "./Session";
import { createTimeWastingSite } from "./TimeWastingSite";

Parse.initialize(apiKey, jsKey);
Parse.serverURL = "https://parseapi.back4app.com/";

export default {
  event: {create: createEvent},
  redirectionTargetSite: {create: createRedirectionTargetSite},
  session: {create: createSession},
  timeWastingSite: {create: createTimeWastingSite},
  user: {create: createUser},
}