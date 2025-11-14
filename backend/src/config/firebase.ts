import admin from 'firebase-admin';
import { env } from './env';

let firebaseApp: admin.app.App | null = null;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const serviceAccount = JSON.parse(env.firebaseServiceAccount);

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });

  return firebaseApp;
};

export const verifyFirebaseToken = async (idToken: string) => {
  const app = getFirebaseApp();
  const auth = app.auth();
  return auth.verifyIdToken(idToken);
};
