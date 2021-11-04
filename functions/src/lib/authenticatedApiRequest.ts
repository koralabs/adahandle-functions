import axios from "axios";
import * as functions from "firebase-functions";

export const authenticatedApiRequest = async ({ path, env }: { path: string, env: string }) => {
    const { config } = functions.config();
    const { host, username, pass } = config[env]

    const token = Buffer.from(`${username}:${pass}`).toString("base64");

    const response = await axios.post(
        `${host}${path}`,
        {},
        { headers: { Authorization: `Basic ${token}` } }
    );
    return response.data;
};