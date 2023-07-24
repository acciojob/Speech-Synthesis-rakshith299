const dropdown = document.getElementById("voices");

const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");

const stop = document.getElementById("stop");
const speak = document.getElementById("speak");

const textarea = document.getElementById("textarea");


let speechSynthesis = window.speechSynthesis;

let utterance = new SpeechSynthesisUtterance();

let receivedVoice = [];


stop.addEventListener("click",function(){
    speechSynthesis.cancel();
})

speak.addEventListener("click", function(){
    if(speechSynthesis.speaking === true){
        alert("already speaking");
    }else if(textarea.value !== ""){
        utterance.text = textarea.value;
        utterance.pitch = pitch.value;
        utterance.rate = rate.value;
        speechSynthesis.speak(utterance);

    }
})


pitch.addEventListener("change", function(){
    utterance.pitch = pitch.value;
})

rate.addEventListener("change", function(){
    utterance.rate = rate.value;
})


dropdown.addEventListener("change", function(){
    let selected = dropdown.value;

    console.log("voices", receivedVoice);
    receivedVoice.filter((eachVoice) => {
        if(eachVoice.name === selected){
            utterance.voice = eachVoice;
        }
    })
})


function getAllVoices(){
    receivedVoice = speechSynthesis.getVoices();

    receivedVoice.map((eachVoice) => {
        let eachVoiceName = eachVoice.name;
        let eachVoiceLang = eachVoice.lang;

        let option = document.createElement("option");
        option.setAttribute("value", `${eachVoiceName}`);

        option.innerText = `${eachVoiceName} (${eachVoiceLang})`;

        dropdown.appendChild(option);

        
    });
}

speechSynthesis.onvoiceschanged = getAllVoices;