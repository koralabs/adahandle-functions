import * as functions from "firebase-functions";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/mintPaidSessions';

/**
 * CRON function that runs every 1 minute
 */
export const mintPaidSessionsCron = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    await runScheduledFunction({ path: API_PATH, env: 'prod', headers: {'Specific-Node': 'mainnet01'} });
    await new Promise(resolve => setTimeout(resolve, 2500)); // a bit of a delay between servers to reduce database contention
    await runScheduledFunction({ path: API_PATH, env: 'prod', headers: {'Specific-Node': 'mainnet02'} });
  });
