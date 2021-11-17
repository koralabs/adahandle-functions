import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/mintConfirm';

/**
 * CRON function that runs every 1 minute
 */
export const mintConfirmCron = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'prod' }));
