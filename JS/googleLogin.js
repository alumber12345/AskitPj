
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInWithPopup,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase,ref,set} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqb4XtymcsMEFdslrKHzmBf0NvKrfowrw",
  authDomain: "iapja9.firebaseapp.com",
  databaseURL: "https://iapja9-default-rtdb.firebaseio.com",
  projectId: "iapja9",
  storageBucket: "iapja9.appspot.com",
  messagingSenderId: "466460234579",
  appId: "1:466460234579:web:0f2e6ab5b0f077b32147a6",
  measurementId: "G-1SM9S4MYV7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const provider = new GoogleAuthProvider(app);

document.getElementById("buttonDiv").onclick = function(){googlelogin()};

function googlelogin(){
signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);

    const user = result.user;
    
    window.location.href="../index.html";
    
  }).catch((error) => {
  
    const errorCode = error.code;
    const errorMessage = error.message;

    const email = error.customData.email;

    const credential = GoogleAuthProvider.credentialFromError(error);


  console.log(error.message);
  });

  
}
function handleCredentialResponse(response) {
  // Build Firebase credential with the Google ID token.
  const idToken = response.credential;
  const credential = GoogleAuthProvider.credential(idToken);

  // Sign in with credential from the Google user.
  signInWithCredential(auth, credential).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The credential that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}