const confirmBtn = document.getElementById("pay-btn");
    confirmBtn.addEventListener('click', () => {
            // Display a confirm dialog in a popup window
            const confirmed = window.confirm('Are you sure you want to bit this item?');
            // Check if the user clicked "Yes" or "No"
            if (confirmed) {
                console.log('bit.');
                alert('Congratulations on the successful auction of the item! please go to the shopping history query!');
                location.href = "../Pages/Auctions.html";
                }else {
                    // User clicked "No"
                    console.log('not bit.');
                }
                })
