import axios from "axios";
import * as functions from "firebase-functions";

/**
 * CRON function that runs every 1 minute
 */
export const mintPaidSessionsCron = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    try {
      const config = functions.config();
      const { config: settingsConfig } = config;

      const result = await fireMintPaidSessionsRequest(
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

const fireMintPaidSessionsRequest = async (
  username: string,
  pass: string,
  url: string
) => {
  const token = Buffer.from(`${username}:${pass}`).toString("base64");

  const response = await axios.post(
    `${url}/mintPaidSessions`,
    {},
    { headers: { Authorization: `Basic ${token}` } }
  );
  return response.data;
};
