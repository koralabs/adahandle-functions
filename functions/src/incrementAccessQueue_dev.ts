import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const SHARDS_COUNT = 3;

export const incrementAccessQueue_dev = functions.firestore
    // update to use prod
    .document('accessQueues_dev/{queueId}')
    .onCreate((snap, context) => {
        // check if document exists
        const shard_id = Math.floor(Math.random() * SHARDS_COUNT).toString();
        const shard_ref = admin.firestore().collection('shards_dev').doc(shard_id);

        // Update count
        return shard_ref.update("count", admin.firestore.FieldValue.increment(1));
    });