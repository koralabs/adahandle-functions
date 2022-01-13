import axios from "axios";
import * as functions from "firebase-functions";

export const authenticatedApiRequest = async <T>({ path, env, headers }: { path: string, env: string, headers: {} }): Promise<T> => {
    const { config } = functions.config();
    const { host, username, pass } = config[env]

    const token = Buffer.from(`${username}:${pass}`).toString("base64");
    const url = `${host}${path}`;
    const headers = {
        headers: {
            Authorization: `Basic ${token}`
        }
    };
    const response = await axios.post(
        `${host}${path}`,
        {},
        { headers: { 
            ...headers,
            Authorization: `Basic ${token}` 
        }}
    );
    return response.data as T;
};