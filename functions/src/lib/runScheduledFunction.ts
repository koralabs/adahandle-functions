import { authenticatedApiRequest } from "./authenticatedApiRequest";

export const runScheduledFunction = async ({ path }: { path: string }): Promise<null> => {
    try {
        const result = await authenticatedApiRequest({ path });
        console.log(`successful result: ${JSON.stringify(result)}`);
        return null;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
}