import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/refunds';

/**
 * CRON function that runs every 25 hours
 */
export const mintConfirmCron_dev = functions.pubsub
  .schedule('every 25 hours')
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'prod' }));
