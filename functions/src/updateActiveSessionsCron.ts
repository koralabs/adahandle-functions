import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

// TODO: work on getting this to work locally
// https://medium.com/firelayer/deploying-environment-variables-with-firebase-cloud-functions-680779413484

const API_PATH = '/updateActiveSessions';

/**
 * CRON function that runs every 5 minutes
 */
export const updateActiveSessionsCron = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'prod' }));
