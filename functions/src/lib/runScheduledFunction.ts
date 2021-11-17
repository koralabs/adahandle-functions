import { authenticatedApiRequest } from "./authenticatedApiRequest";

export const runScheduledFunction = async ({ path, env }: { path: string, env: 'prod' | 'dev' }): Promise<null> => {
    try {
        const result = await authenticatedApiRequest({ path, env });
        console.log(`successful result: ${JSON.stringify(result)}`);
        return null;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
}