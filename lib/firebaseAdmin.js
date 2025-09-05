// server-side firebase admin helper (reads FIREBASE_ADMIN_KEY from env)
export function initFirebaseAdmin(){
  try{
    const admin = require('firebase-admin');
    if(!admin.apps.length){
      if(process.env.FIREBASE_ADMIN_KEY){
        const cfg = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
        admin.initializeApp({ credential: admin.credential.cert(cfg) });
      } else {
        console.warn('FIREBASE_ADMIN_KEY not set; Firebase Admin not initialized');
        return null;
      }
    }
    return admin;
  } catch(e){
    console.warn('firebase-admin not available', e.message || e);
    return null;
  }
}