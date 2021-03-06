function init() {

  var liveUrl = "live.mp4";
  var player = $('<video>', {id:'live', width:'100%', src:liveUrl, class:'player'});

  $('#monitor').append(player);

  var player = document.getElementById("live");

  $('#live').bind('ended',function(){ refreshLive(); });

  refreshLive();

  function refreshLive(){

    $('#live').hide();

    setTimeout(function(){
      $('#live').show();
      $('#live').attr("src",liveUrl+ "?" + Math.round((new Date()).getTime() / 1000)).load();
      $('#live').get(0).play();
    }, 1500 )
  };
};
$(document).on('ready', init);
