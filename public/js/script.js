var analyser, canvas, ctx;

window.onload = function() {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  setupWebAudio();
};

setupWebAudio = () => {
  var audio = document.createElement('audio');
  audio.crossOrigin = "anonymous";
  audio.src = "./audio/RunningModerat.mp3";
  audio.controls = "true";
  document.body.appendChild(audio);
  audio.style.width = window.innerWidth = "px";

  var audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  var source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  audio.play();

}
