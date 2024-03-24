var form = document.querySelector("form");
var message = document.getElementById("message");
var chat = document.getElementById("chat");
const wordTriggers = [
  "hello",
  "bye",
  "how is it going?",
  "do you like studying?",
  "do you like fast food?",
  "what kind of sport do you like?",
  "how old are you?",
  "What weather do you like most?",
  "Who is your favorite actor?",
  "What is your favorite movie?",
];
const wordTriggersToRespond = {
  hello: "Hi, how are you?",
  bye: "Goodbye!",
  "how is it going?": "I am doing well",
  "do you like studying?": "I like to study",
  "do you like fast food?":
    "Not really. I prefer healthy food to snacks and junky food",
  "what kind of sport do you like?": "I like to play basketball",
  "how old are you?": "I am 21 years old",
  "What weather do you like most?": "I like rainy weather most",
  "Who is your favorite actor?": "My favorite actor is me. Heh",
  "What is your favorite movie?": "I do not really have one",
};

function scrollToTheBottom(id) {
  const el = document.getElementById(id);
  el.scrollTop = el.scrollHeight;
}

function getResponse(contentOfMessage) {
  contentOfMessage = contentOfMessage.toLowerCase();
  if (wordTriggers.includes(contentOfMessage)) {
    return wordTriggersToRespond[contentOfMessage];
  } else {
    return null;
  }
}
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let par = document.createElement("p");
  par.textContent = message.value;
  par.style.color = "red";
  par.style.fontSize = "20px";
  par.style.fontWeight = "bold";
  par.style.textAlign = "right";
  par.style.width = "50%";
  par.style.marginLeft = "auto";
  par.style.paddingRight = "10px";
  par.style.backgroundColor = "lightgreen";
  par.style.borderRadius = "15px";
  par.style.fontFamily = "Times New Roman";
  par.style.textAlign = "left";
  par.style.paddingLeft = "10px";
  chat.appendChild(par);
  let respond = getResponse(message.value);
  message.value = "";
  if (respond != null) {
    let myAnswer = document.createElement("p");
    myAnswer.textContent = respond;
    myAnswer.style.color = "red";
    myAnswer.style.fontSize = "20px";
    myAnswer.style.fontWeight = "bold";
    myAnswer.style.textAlign = "left";
    myAnswer.style.width = "50%";
    myAnswer.style.marginRight = "auto";
    myAnswer.style.paddingLeft = "10px";
    myAnswer.style.backgroundColor = "lightgreen";
    myAnswer.style.borderRadius = "15px";
    myAnswer.style.fontFamily = "Times New Roman";
    myAnswer.style.textAlign = "left";
    myAnswer.style.paddingLeft = "10px";
    chat.appendChild(myAnswer);
  }
  scrollToTheBottom("chat");
});

// Logic for recording voice message
var recordButton = document.getElementById("AudioInteractionButton");
recordButton.addEventListener("click", startRecording);
let counter = 1;
let mediaRecorder;
let audioChunks = [];

function startRecording() {
  if (recordButton.textContent === "Record Message") {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        var audioElement = document.createElement("audio"); // Create an audio element
        audioElement.id = "audio-player" + String.toString(counter); // Set the id attribute
        counter = counter + 1;
        audioElement.controls = "controls"; // Enable player controls

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks);
          audioElement.src = URL.createObjectURL(audioBlob);

          audioElement.style.width = "50%";
          audioElement.style.marginLeft = "45%";
          audioElement.style.marginRight = "2%";
          audioElement.style.paddingRight = "0px";
          document.getElementById("chat").appendChild(audioElement);
        };

        mediaRecorder.start();
        recordButton.textContent = "Send recording";
      })
      .catch((err) => console.error("Error: ", err));
  } else {
    mediaRecorder.stop();
    recordButton.textContent = "Record Message";
    audioChunks = []; // To prevent repeating of content in audio
    scrollToTheBottom("chat");
  }
}
