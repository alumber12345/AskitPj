
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile,updatePassword} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { getDatabase,ref,set,child ,get,update} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL}from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

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

document.getElementById('savePaymentDataBtn').onclick = function() {savePaymentData()};
function savePaymentData() {
  const cardNumber = document.getElementById('cardNumber').value;
  const cardHolderName = document.getElementById('cardHolderName').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvvNumber = document.getElementById('cvvNumber').value;

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      const paymentData = {
        cardNumber,
        cardHolderName,
        expiryDate,
        cvvNumber,
      };

      update(ref(db, 'users/' + user.uid + '/paymentData'), paymentData)
        .then(() => {
          alert('Payment data updated successfully');
        })
        .catch((error) => {
          alert(error);
        });
    }
  });
}





document.getElementById('UpdatePBtn').onclick = function() {
  UpdateProfiles();
};

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    console.log(user);
  } else {
    // User is signed out
    // ...
  }
});

function UpdateProfiles() {
  var usernameT = document.getElementById('firstnameT').value;
  var nameT = document.getElementById('lastnameT').value;
  var phonenumberT = document.getElementById('phonenumberT').value;
  var emailT = document.getElementById('emailT').value;
  var companyT = document.getElementById('companyT').value;
  var designationT  = document.getElementById('designationT').value;
  var bioT = document.getElementById('bioT').value;
  var profilePic = document.getElementById('profile-pic').files[0];

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      const photoURL = user.photoURL; 
      updateProfile(auth.currentUser, {
        displayName: usernameT,
        phoneNumber: phonenumberT
      }).then(() => {
        if (profilePic) {
          const storage = getStorage();
          var storageRef = sRef(storage, 'users/' + user.uid + '/profile-pic');
          var metadata = {
            contentType: 'image/jpeg',
          };
          var uploadTask = uploadBytesResumable(storageRef, profilePic, metadata);

          uploadTask.on('state_changed',
            function (snapshot) {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function (error) {},
            function () {
              getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {
                updateProfile(auth.currentUser, {
                  photoURL: downloadURL
                }).then(() => {
                  update(ref(db, 'users/' + user.uid), {
                    email: emailT,
                    firstname: usernameT,
                    lastname: nameT,
                    phonenumber: phonenumberT,
                    company: companyT,
                    designation: designationT,
                    bio: bioT,
                    photoURL: downloadURL
                  }).then(() => {
                    const profilePicPreview = document.getElementById('profile-pic-preview');
                    profilePicPreview.src = photoURL;
                    alert('User profile updated successfully');
                    window.location.href = '../Pages/Profile.html';
                  }).catch((error) => {
                    alert(error);
                  });
                }).catch((error) => {
                  alert(error);
                });
              });
            }
          );
        } else {
          updateProfile(auth.currentUser, {
            photoURL: photoURL
          }).then(() => {
            update(ref(db, 'users/' + user.uid), {
              email: emailT,
              firstname: usernameT,
              lastname: nameT,
              phonenumber: phonenumberT,
              company: companyT,
              designation: designationT,
              bio: bioT,
              photoURL: photoURL
            }).then(() => {
              const profilePicPreview = document.getElementById('profile-pic-preview');
              profilePicPreview.src = photoURL;
              alert('User profile updated successfully');
              window.location.href = '../Pages/Profile.html';
            }).catch((error) => {
              alert(error);
            });
          }).catch((error) => {
            alert(error);
          });
        }
      }).catch((error) => {
        alert(error);
      });
    }
  });
}

const defaultProfilePicUrl = '../Pic/icon2.png';

onAuthStateChanged(auth, (user) => {
  document.getElementById('firstnameT').value = user.displayName;

  firebase.database().ref('users/' + user.uid).once('value', function (snapshot) {
    const { email } = user || {};
    document.getElementById('lastnameT').value = snapshot.val().lastname;
    document.getElementById('phonenumberT').value = snapshot.val().phonenumber;
    document.getElementById('emailT').value = snapshot.val().email;
    document.getElementById('companyT').value = snapshot.val().company;
    document.getElementById('designationT').value = snapshot.val().designation;
    document.getElementById('bioT').value = snapshot.val().bio;
    document.getElementById('usernameT').textContent = email.split('@')[0];

    const profilePicPreview = document.getElementById('profile-pic-preview');
    const userPhotoURL = snapshot.val().photoURL;

    if (userPhotoURL) {
      profilePicPreview.src = userPhotoURL;
    } else {
      profilePicPreview.src = defaultProfilePicUrl;
    }
  });
});

document.getElementById('UpdatePwBtn').onclick = function() {UpdatePasswords()};
function UpdatePasswords(){
      var oldPassword = document.getElementById('oldPassword').value;
      var newPassword = document.getElementById('newPassword').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
    onAuthStateChanged(auth, (user) => {
        firebase.database().ref('users/' + user.uid).once('value', function(snapshot) {
            var coldPassword = snapshot.val().password;
         
    
    if (confirmPassword == newPassword){
    if (oldPassword == coldPassword){
    updatePassword(user, newPassword).then(() => {
        update(ref(db,'users/' + user.uid),{
            password:newPassword
        })
        alert("Update successful.Pls Re-Login.");
        auth.signOut()
        .then((success) => {
         
            location.href = "../index.html";
        })

      }).catch((error) => {
         alert(error);
      });
    }else{alert("Wrong Old password")}
}else{ alert("please confirm new password same with Repeat-password")}
 });
});  
}
var profilePic = document.getElementById('profile-pic').files[0];
var storageRef = storage.ref().child('users/' + user.uid + '/profile-pic');
var uploadTask = storageRef.put(profilePic);

uploadTask.on('state_changed',
function(snapshot){

},
function(error){

},
function(){

uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

  updateProfile(auth.currentUser, {
    photoURL: downloadURL
  }).then(function() {
   
    update(ref(db,'users/' + user.uid),{
      photoURL: downloadURL
    }).then(function() {
      alert('User profile updated successfully');
      window.location.href="../Pages/Profile.html";
    }).catch(function(error) {
      alert(error);
    });
  }).catch(function(error) {
    alert(error);
  });
});
}
);

const iconElement = document.getElementById('profile-pic-preview');
const defaultIconUrl = 'icon2.png';
const actualIconUrl = 'https://firebasestorage.googleapis.com/v0/b/iapja9.appspot.com/o/Images%2Ficon2.png?alt=media&token=733a458f-a61c-456f-9d84-3d9ab8c31b4f';

function isValidImageUrl(url, callback) {
  const img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
}

isValidImageUrl(actualIconUrl, (isValid) => {
  if (isValid) {
    iconElement.src = actualIconUrl;
  } else {
    iconElement.src = defaultIconUrl;
  }
});

