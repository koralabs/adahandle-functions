import axios from "axios";
import * as functions from "firebase-functions";

// TODO: work on getting this to work locally
// https://medium.com/firelayer/deploying-environment-variables-with-firebase-cloud-functions-680779413484

/**
 * CRON function that runs every 5 minutes
 */
export const updateActiveSessionsCron = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async () => {
    try {
      const config = functions.config();
      const { config: settingsConfig } = config;
      const result = await fireUpdateActiveSessionsRequest(
        settingsConfig.username,
        settingsConfig.pass,
        settingsConfig.testnet_url
      );
      console.log(`result ${JSON.stringify(result)}`);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    return null;
  });

const fireUpdateActiveSessionsRequest = async (
  username: string,
  pass: string,
  url: string
) => {
  const token = Buffer.from(`${username}:${pass}`).toString("base64");

  const response = await axios.post(
    `${url}/updateActiveSessions`,
    {},
    { headers: { Authorization: `Basic ${token}` } }
  );
  return response.data;
};
