import axios from "axios";
import * as functions from "firebase-functions";

/**
 * CRON function that runs every 5 minutes
 */
export const sendAuthCodesCron = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async () => {
    try {
      const config = functions.config();
      const { config: settingsConfig } = config;
      const result = await fireSendAuthCodesRequest(
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

const fireSendAuthCodesRequest = async (
  username: string,
  pass: string,
  url: string
) => {
  const token = Buffer.from(`${username}:${pass}`).toString("base64");

  const response = await axios.post(
    `${url}/sendAuthCodes`,
    {},
    { headers: { Authorization: `Basic ${token}` } }
  );
  return response.data;
};
