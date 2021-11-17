import axios from "axios";
import * as functions from "firebase-functions";

export const authenticatedApiRequest = async <T>({ path, env }: { path: string, env: string }): Promise<T> => {
    const { config } = functions.config();
    const { host, username, pass } = config[env]

    const token = Buffer.from(`${username}:${pass}`).toString("base64");
    const url = `${host}${path}`;
    const headers = {
        headers: {
            Authorization: `Basic ${token}`
        }
    };

    const response = await axios.post(url, {}, headers);
    return response.data as T;
};