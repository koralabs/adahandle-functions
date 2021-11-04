import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/sendAuthCodes';

/**
 * CRON function that runs every 5 minutes
 */
export const sendAuthCodesCron_dev = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'dev' }));
