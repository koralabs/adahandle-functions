import { authenticatedApiRequest } from "./authenticatedApiRequest";

export const runScheduledFunction = async ({ path, env, headers }: { path: string, env: 'prod' | 'dev', headers?: {} }): Promise<null> => {
    try {
        const result = await authenticatedApiRequest({ path, env, headers });
        console.log(`successful result: ${JSON.stringify(result)}`);
        return null;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
}