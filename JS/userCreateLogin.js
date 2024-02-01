
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
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



    document.getElementById("signup").onclick = function() {signup()};

    function signup(){
        var signupEmail = document.getElementById('signup-email').value;
        var signupPassword = document.getElementById('signup-password').value;
        var username = document.getElementById('signup-username').value;

        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
        const user = userCredential.user;
        
        set(ref(db,'users/' + user.uid),{
            username: username,
            email: signupEmail,
            password: signupPassword,
            firstname:"",
            lastname:"",
            phonenumber:"",
            company:"",
            designation:"",
            bio:""
        })
            .then(() => {
                alert('user created successfully');
                window.location.href="../Pages/Sign-in.html";
            })
            .catch((error) =>{
                alert(error)
            });

        
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);

    });
}
    document.getElementById("login").onclick = function() {login()};

    function login(){
        var loginEmail = document.getElementById('login-email').value;
        var loginPassword = document.getElementById('login-password').value;


        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user", user);
            localStorage.setItem('user', user.uid);
            alert('login success');
            window.location.href="../index.html";
     })
         .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             
             alert(errorMessage);
    });


   }
