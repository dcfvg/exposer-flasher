function init() {

  var socket = io.connect('http://localhost:3000');
  var expo, curStep, startTime = new Date().getTime();;

  //
  // socket events
  //
  socket.on('newExpo', onNewExpo)
  socket.on('captureEnd', nextStep)
  socket.emit('getNewExpo');

  //
  // events handlers
  //
  function onNewExpo(data){
    expo = data;
    console.log(data);

    conf = expo.conf;

    curStep=-1;
    nextStep();

    console.log(expo);
  }

  //
  // actions
  //

  function nextStep(){
    curStep++;
    updtStep();
  }

  function updtStep(){

    console.log('step',curStep, conf.duration, getDuration());

    // ask for new exposition if time is over
    if(getDuration() > conf.duration) socket.emit('getNewExpo');

    var src = expo.steps[curStep % expo.steps.length];

    // check if current image needs capture
    var hasFlash = new RegExp('\\bflash\\b');
    if(hasFlash.test(src)) socket.emit('capture');
    else setTimeout(nextStep, conf.interval);

    // inject current image
    injectImg();

  }

  function injectImg(){
    var newImage = $('<img>', {
      width:'100%',
      src:expo.steps[curStep % expo.steps.length],
      class:'projection'
    })

    $("#projection").prepend(newImage);

    if($("#projection img").length > 1){
      setTimeout(function(){$("#projection img").last().remove();}, conf.interval/2);
    }
  }

  function getDuration(){
    var now = new Date().getTime();
    return (now-startTime);
  }
  //
  // utils
  //

};

$(document).on('ready', init);
