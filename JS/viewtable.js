let tablebtn = button => {
    let tbelement = document.getElementById("bidstable");
    let tbhidden = tbelement.getAttribute("hidden");

    if (tbhidden) {
        tbelement.removeAttribute("hidden");
        button.innerText = "Bit";
    } else {
        tbelement.setAttribute("hidden", "hidden");
        button.innerText = "Showtable";
    }
    }

