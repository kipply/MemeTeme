jQuery(function($) {
    volume = 0.3;
    $("#bgAudio").prop("volume", volume);

    window.setVolume = function(bgAudio, vol) {
        sounds[bgAudio].volume = vol;
    }
  
    var posx = (Math.random() * ($(document).width() - 100)).toFixed();
    var posy = (Math.random() * ($(document).height() - 100)).toFixed();
    
    $(".head").css({
        'left':posx+'px',
        'top':posy+'px',
    })

    $(".head2").css({
        'left':posx+'px',
        'top':posy+'px',
    })
});

function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}



