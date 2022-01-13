import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/state';

/**
 * CRON function that runs every 1 minutes
 */
export const saveStateCron_dev = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'dev' }));
