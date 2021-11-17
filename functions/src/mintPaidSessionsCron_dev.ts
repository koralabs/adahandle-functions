import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/mintPaidSessions';

/**
 * CRON function that runs every 1 minute
 */
export const mintPaidSessionsCron_dev = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'dev' }));
