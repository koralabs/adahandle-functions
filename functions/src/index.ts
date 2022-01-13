import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Production Crons
 */
export { mintPaidSessionsCron } from "./mintPaidSessionsCron";
export { mintConfirmCron } from "./mintConfirmCron";
export { sendAuthCodesCron } from "./sendAuthCodesCron";
export { updateActiveSessionsCron } from "./updateActiveSessionsCron";
export { saveStateCron } from "./saveStateCron";

/**
 * Development Crons
 */
export { mintPaidSessionsCron_dev } from "./mintPaidSessionsCron_dev";
export { mintConfirmCron_dev } from "./mintConfirmCron_dev";
export { sendAuthCodesCron_dev } from "./sendAuthCodesCron_dev";
export { updateActiveSessionsCron_dev } from "./updateActiveSessionsCron_dev";
export { saveStateCron_dev } from "./saveStateCron_dev";

