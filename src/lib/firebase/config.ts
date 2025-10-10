// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
import {getAuth} from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaDgkgnDf58uR7VMnnlyE4QndHhZodyXw",
    authDomain: "edusite-f8920.firebaseapp.com",
    projectId: "edusite-f8920",
    storageBucket: "edusite-f8920.firebasestorage.app",
    messagingSenderId: "443368444057",
    appId: "1:443368444057:web:910466b700c1657d8d6808"
};

// Initialize Firebase

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;