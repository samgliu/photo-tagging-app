import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyB2e1biiHyGovEk9sxwD2pguYyLk-esqag',
    authDomain: 'tho-phototagging.firebaseapp.com',
    projectId: 'tho-phototagging',
    storageBucket: 'tho-phototagging.appspot.com',
    messagingSenderId: '948430560551',
    appId: '1:948430560551:web:3ecc0849688ebb5ad21d02',
    measurementId: 'G-F5H56BVQ96',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export Firebase so it can be used elsewhere
const FireBase = firebase.initializeApp(firebaseConfig);

export default FireBase;
