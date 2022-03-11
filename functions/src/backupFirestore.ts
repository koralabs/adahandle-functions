import * as functions from "firebase-functions";
import * as firestore from "@google-cloud/firestore";

const client = new firestore.v1.FirestoreAdminClient()

function backupFirestoreDB() {
  const databaseName = client.databasePath("ada-handle-reserve", '(default)')
  
  const dateIso = new Date().toISOString();
  const dateString = `${dateIso.slice(0,10)}-${dateIso.slice(11,19).replace(/\:/g, '-')}`;
  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: `gs://ada-handle-reserve.appspot.com/backups/${dateString}`,
      // Empty array == all collections
      collectionIds: []
    })
    .then(([response]) => {
      console.log(`Operation Name: ${response.name}`)
      return response
    })
    .catch(err => {
      console.error(err)
      throw new Error(`Export operation failed ${err}`)
    })
}

// Schedule the automated backup
export const backupFirestore = functions.pubsub.schedule('every 24 hours').onRun(backupFirestoreDB)