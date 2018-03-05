var init, context, analyser, source, audio, waveform_array;

var frameLooper = function() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestionAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame(frameLooper);

  waveform_array = new Unit8Array(analyser.frequencyBinCount);
  analyser.getFrequencyData(waveform_array);

  var event = new CustomEvent("waveform", {"detail": waveform_array});
  window.frames[window.frames.length -1].window.document.dispatchEvent(event);

};

var existing_iframe = document.getElementById('partymode_iframe');

if(existing_iframe){
  document.body.removeChild(existing_iframe);
} else {
  //audio = document.getElementByTagName("video")[0];
   audio = document.createElement('audio');
   audio.crossOrigin = "anonymous";
   audio.src = "./audio/RunningModerat.mp3";

  if(init != 1){
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    audio.play();
  }

  var iFrame = document.createElement("iframe");

    iFrame.id='partymode_iframe';
    iFrame.width= '30%';
    iFrame.height = '30%';
    iFrame.style.position = 'fixed';
    iFrame.style.top = 0;
    iFrame.style.left = 0;
    iFrame.style.zIndex = 2000;
    iFrame.style.border = 0;
    iFrame.src = chrome.extension.getURL("index.html");

    console.log("iframe is being injected");
    document.body.insertBefore(iFrame, document.body.firstChild);

    frameLooper();
    init = 1
}
// var analyser, canvas, ctx;
//
// window.onload = function() {
//   canvas = document.createElement('canvas');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   document.body.appendChild(canvas);
//   ctx = canvas.getContext('2d');
//
//   setupWebAudio();
// };
//
// setupWebAudio = () => {
//   var audio = document.createElement('audio');
//   audio.crossOrigin = "anonymous";
//   audio.src = "./audio/RunningModerat.mp3";
//   audio.controls = "true";
//   document.body.appendChild(audio);
//   audio.style.width = window.innerWidth = "px";
//
//   var audioContext = new AudioContext();
//   analyser = audioContext.createAnalyser();
//   var source = audioContext.createMediaElementSource(audio);
//   source.connect(analyser);
//   analyser.connect(audioContext.destination);
//   audio.play();
//
// }
