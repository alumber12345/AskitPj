document.addEventListener("DOMContentLoaded", function () {
  showAds();
});

document.getElementById("search-link").addEventListener("click", function () {
  localStorage.removeItem("selectedCategory");
});

function showAds() {
  let userArray = [];

  const firebaseRef = firebase.database().ref("Item");
  firebaseRef.once("value", function (snapshot) {
    const data = snapshot.val();
    for (let key in data) {
      data[key].adKey = key;
      userArray.push(data[key]);
    }

    localStorage.setItem("adArray", JSON.stringify(userArray));

    searchAds();
  });
}

function displayAds(userArray) {
  document.getElementById("addCharts").innerHTML = userArray
    .map((val) => {
      return `
          <div class="house">
              <div class="img">
                <img src="${val.ImgUrl}">
              </div>
              <div class="info">
                  <p>${val.Category}</p>
                  <h3>${val.ProductName}</h3>
                  <p>Quantity: ${val.Quantity}</p>
                  <div class="view-btn">
                      <a href="detail.html?id=${val.adKey}" class="btn">View</a>
                  </div>
              </div>
          </div>
      `;
    })
    .join("");
}

function searchAds(searchTerm) {
  let userArray = JSON.parse(localStorage.getItem('adArray'));
  const selectedCategory = localStorage.getItem('selectedCategory');

  // Filter by selected category
  if (selectedCategory) {
    userArray = userArray.filter(ad => ad.Category === selectedCategory);
  }

  // Filter by search term
  if (searchTerm) {
    userArray = userArray.filter((ad) => {
      const adName = ad.ProductName.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = adName.includes(searchLower);
      return nameMatch;
    });
  }

  displayAds(userArray);
}

document.getElementById('search-btn').addEventListener('click', function() {
  const searchTerm = document.getElementById('search-bar').value;
  searchAds(searchTerm);
});

