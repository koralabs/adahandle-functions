import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/refunds';

/**
 * CRON function that runs every 30 minutes
 */
export const refundCron_dev = functions.pubsub
  .schedule('every 30 minutes')
  .onRun(async () => await runScheduledFunction({ path: API_PATH, env: 'dev' }));
