const firebaseConfig = {
    apiKey: "AIzaSyCed6bHJuomOPElpid5bKFaCtUUGXV2q_E",
    authDomain: "project-7ca3f.firebaseapp.com",
    projectId: "project-7ca3f",
    storageBucket: "project-7ca3f.appspot.com",
    messagingSenderId: "105261573697",
    appId: "1:105261573697:web:63c7ba559e15517613c8c0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

console.log("Firebase connected");
