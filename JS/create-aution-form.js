     var firebaseConfig = {
        apiKey: "AIzaSyCqb4XtymcsMEFdslrKHzmBf0NvKrfowrw",
        authDomain: "iapja9.firebaseapp.com",
        databaseURL: "https://iapja9-default-rtdb.firebaseio.com/",
        projectId: "iapja9",
        storageBucket: "iapja9.appspot.com",
        messagingSenderId: "466460234579",
        appId: "1:466460234579:web:0f2e6ab5b0f077b32147a6",
        measurementId: "G-1SM9S4MYV7"
      };
    
      firebase.initializeApp(firebaseConfig);

//----------------------upload form image-------------------------------------//
var files = [];
var reader = new FileReader();

var namelabel = document.getElementById('namelabel');
var extlabel = document.getElementById('extlabel');
var myimg = document.getElementById('myimg');
var proglabel = document.getElementById('upProgress');
var SelBtn = document.getElementById('selbtn');

var input = document.createElement('input');
input.type = 'file';

input.onchange = e =>{
  files = e.target.files;

  var extention = GetFileExt(files[0]);
  var name = GetFileName(files[0]);

  namelabel.innerHTML = name;
  extlabel.innerHTML = extention;

  reader.readAsDataURL(files[0]);
}

reader.onload = function(){
  myimg.src = reader.result;
}

//---------------------------Get file name & extention---------------------------//

SelBtn.onclick = function(){
  input.click();
}

function GetFileExt(file){
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length-1),(temp.length));
  return '.' + ext[0];
}

function GetFileName(file){
  var temp = file.name.split('.');
  var fname = temp.slice(0,-1).join('.');
  return fname;
}

//---------------------------upload image---------------------------//

async function uploadProcess(){
  var ImgToUpload = files[0];

  var ImgName = namelabel.innerHTML + extlabel.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type
  }

  const storage = getStorage();

  const stroageRef = sRef(storage, "Images/"+ImgName);

  const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);

  UploadTask.on('state-changed',(snapshot)=>{
    var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  },
  (error) =>{
    alert("error: image not uploaded");
  },
  ()=>{
    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
      console.log(downloadURL);
    });
  }
  );
}



      
//-------------------reference your datebase---------------------------//
var AskItDB = firebase.database().ref("AskItDB");

//---------------------upload form text funciton------------------------------------------//
    document.getElementById("create_auction_form").addEventListener("submit", submitform);

    function submitform(e){
        e.preventDefault();

        var product_name = getElementVal("product_name");
        var product_price = getElementVal("product_price");
        var closing_time = getElementVal("closing_time");
        var category = getElementVal("category");
        var product_condition = getElementVal("product_condition");
        var product_materials = getElementVal("product_materials");
        var product_size = getElementVal("product_size");
        var product_description = getElementVal("product_description");
        var product_sku = getElementVal("product_sku");

        //console.log(product_name, product_price, closing_time, category, product_condition, product_materials, product_size, product_description, product_sku);

        // get file
			  var file = e.target.files[0];
    }

    const createAuciton = (product_name, product_price, closing_time, category, product_condition, product_materials, product_size, product_description, product_sku) => {
        
    }

    const getElementVal = (id) => {
        return document.getElementById(id).value;
    }