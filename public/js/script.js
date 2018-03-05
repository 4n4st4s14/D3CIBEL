(function() {
  var ctx = new (window.AudioContext || window.webkitAudioContext)();
  //var audioElement = document.getElementById('audioElement');
  var audio = document.createElement('audio');
  audio.crossOrigin = "anonymous";
  audio.src = "./audio/RunningModerat.mp3";
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  //bind analyser to media element source
  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);
  audio.play();

  //number = analyser.frequencyBinCount
  var frequencyData = new Uint8Array(200);

    var svgHeight = 600,
        svgWidth = 960;

    var svg = d3.select('body').append('svg')
        .attr({
            height: svgHeight,
            width: svgWidth
        });

    // continuously loop and update chart with frequency data.
    function renderChart() {
        requestAnimationFrame(renderChart);

        // copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);
        // console.log(frequencyData);

        // scale things to fit
        var radiusScale = d3.scaleLinear()
            .domain([0, d3.max(frequencyData)])
            .range([0, svgHeight/2 -10]);

        var hueScale = d3.scaleLinear()
            .domain([0, d3.max(frequencyData)])
            .range([0, 360]);

       // update d3 chart with new data
      svg.selectAll('circle')
           .data(frequencyData)
           .enter()
           .append('circle')
           .attr({
                r: function(d) { return radiusScale(d); },
                cx: svgWidth / 2,
                cy: svgHeight / 2,
                fill: 'none',
                'stroke-width': 4,
                'stroke-opacity': 0.4,
                stroke: function(d) { return d3.hsl(hueScale(d), 1, 0.5); }
           });

        circles.exit().remove();
    }

    // run the loop
    renderChart();

    // just for blocks viewer size
    d3.select(self.frameElement).style('height', '700px');

}());
