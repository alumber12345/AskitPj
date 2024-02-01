function speech(){
    var recognition =new webkitSpeechRecognition();
    recognition.lang = "en-Gb";

    recognition.onresult =function(event){
        console.log(event);
        document.getElementById("search-bar").value = event.results[0][0].transcript;

      }
      recognition.start();
    }

