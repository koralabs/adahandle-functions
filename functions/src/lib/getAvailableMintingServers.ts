import * as admin from 'firebase-admin';

export const getAvailableMintingServers = async ({ env }: { env: string }): Promise<string[] | null> => {
    const snapshot = await admin.firestore().collection(`stateData${env === 'dev' ? '_dev' : ''}`).doc('state').get();
    if (!snapshot.exists) {
        return null;
    }

    const { availableMintingServers } = snapshot.data() as { availableMintingServers: string };
    return availableMintingServers.split(',');
}