import axios from "axios";
import * as functions from "firebase-functions";

export const authenticatedApiRequest = async ({ path }: { path: string }) => {
    const config = functions.config();
    const { config: { username, pass, testnet_url } } = config;
    const token = Buffer.from(`${username}:${pass}`).toString("base64");

    const response = await axios.post(
        `${testnet_url}${path}`,
        {},
        { headers: { Authorization: `Basic ${token}` } }
    );
    return response.data;
};