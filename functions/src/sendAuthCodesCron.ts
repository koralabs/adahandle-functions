import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/sendAuthCodes';

/**
 * CRON function that runs every 5 minutes
 */
export const sendAuthCodesCron = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'prod' }));