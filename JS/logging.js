import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase,ref,set ,child ,get} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";


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
const db = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email } = user || {};
      document.getElementById('login-li').style.display = 'none';
      document.getElementById('guest').style.display = 'none';
      document.getElementById('profile-li').style.display = 'block';
      document.getElementById('useremail').style.display = 'block';
      document.getElementById('checkticket-li').style.display = 'block';
      document.getElementById('signoutlink-li').style.display = 'block';
      document.getElementById('useremail').textContent = email.split('@')[0];
    } else {
      document.getElementById('login-li').style.display = 'block';
      document.getElementById('guest').style.display = 'block';
      document.getElementById('checkticket-li').style.display = 'none';
      document.getElementById('profile-li').style.display = 'none';
      document.getElementById('useremail').style.display = 'none';
      document.getElementById('signoutlink-li').style.display = 'none';
    }
  });
  
  document.getElementById("signoutlink").addEventListener("click", signoutUser);
  
  function signoutUser() {
    auth.signOut()
      .then(() => {
        document.getElementById('login-li').style.display = 'block';
        document.getElementById('profile-li').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
        document.getElementById('useremail').style.display = 'none';
        document.getElementById('signoutlink-li').style.display = 'none';
        location.href = "../index.html";
      });
  }
  

