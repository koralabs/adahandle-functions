import * as functions from "firebase-functions";
import { SPECIFIC_NODE_HEADER } from "./lib/constants";
import { getAvailableMintingServers } from "./lib/getAvailableMintingServers";
import { runScheduledFunction } from "./lib/runScheduledFunction";

const API_PATH = '/mintPaidSessions';
const env = 'prod';

/**
 * CRON function that runs every 1 minute
 */
export const mintPaidSessionsCron = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    const availableMintingServers = await getAvailableMintingServers({ env });
    if (!availableMintingServers) {
      console.log('Exiting. Unable to find available minting servers');
      return;
    }

    for (let i = 0; i < availableMintingServers.length; i++) {
      await runScheduledFunction({ path: API_PATH, env, headers: { [SPECIFIC_NODE_HEADER]: availableMintingServers[i] } });
      if (i !== availableMintingServers.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2500)); // a bit of a delay between servers to reduce database contention
      }
    }
  });
