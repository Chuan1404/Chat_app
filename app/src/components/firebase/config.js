import firebase from 'firebase/compat/app'

import 'firebase/compat/analytics'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAyKD1Q666mCc5v8pUBa30PjpSlfAxjjWk",
    authDomain: "chat-app-66d9f.firebaseapp.com",
    projectId: "chat-app-66d9f",
    storageBucket: "chat-app-66d9f.appspot.com",
    messagingSenderId: "715140745418",
    appId: "1:715140745418:web:d9f96c687507a210e34c33",
    measurementId: "G-W4YXBSW0Y6"
};

firebase.initializeApp(firebaseConfig)
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;