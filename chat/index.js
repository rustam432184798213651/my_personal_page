var form = document.querySelector("form");
var message = document.getElementById("message");
console.log(form);
console.log(message);
form.addEventListener("submit", function (evt) {
  console.log("Submit happened");
});

navigator.webkitGetUserMedia(
  { video: false, audio: true },
  function (stream) {
    var context = new AudioContext(),
      mediaStreamSource = context.createMediaStreamSource(stream),
      processor = context.createJavaScriptNode(4096, 2, 2);

    processor.onaudioprocess = function (e) {
      // Process the audio data found in e.inputBuffer
    };

    mediaStreamSource.connect(processor);
    processor.connect(context.destination);
  },
  function (err) {
    console.log(err);
  },
);
