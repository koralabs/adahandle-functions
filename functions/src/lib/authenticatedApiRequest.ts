import axios from "axios";
import * as functions from "firebase-functions";

export const authenticatedApiRequest = async ({ path, env }: { path: string, env: string }) => {
    const config = functions.config();
    let { config: { username, pass, mainnet_url, username_dev, pass_dev, testnet_url } } = config;
    let hosturl = mainnet_url
    if (env != 'prod') {
        hosturl = testnet_url;
        username = username_dev;
        pass = pass_dev
    }
    const token = Buffer.from(`${username}:${pass}`).toString("base64");

    const response = await axios.post(
        `${hosturl}${path}`,
        {},
        { headers: { Authorization: `Basic ${token}` } }
    );
    return response.data;
};