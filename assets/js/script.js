$(document).ready(function () {
    var mainTimer = null;


    var a = [];
    var imageIndex = 0;
    var i = 0;

    showImages();
    function showImages() {
        while (a.length < 3) {
            a[i] = document.getElementById("slider" + i);
            a[i].style.display = "none";
            i++;

        }
        if (imageIndex < a.length) {
            imageIndex++;

        } else {
            imageIndex = 0;
        }
        $(a[imageIndex]).fadeIn(2000).fadeOut(2000);
        // $(a[0]).fadeIn(2000);

       mainTimer =setTimeout(showImages, 4000);
    }
    
  /*
    $("header").mousemove(function (event) {
        var movement= 100;
       var movement=movement-event.PageX
       
        if (event.PageX == true ) {
         
              $(a[imageIndex]).stop();
              $(a[imageIndex]).fadeIn();
       console.log("moves");

        }else {
          // setInterval(function(){ console.log("new"+movement); }, 3000);
        }
       
    });
    */
   var timeout = null;

$(document).on('mousemove', function() {
    clearTimeout(timeout);
      $(a[imageIndex]).stop().fadeIn(1000);
    timeout = setTimeout(function() {
        console.log('Mouse idle for 3 sec');
        clearTimeout(mainTimer);
        showImages();
    }, 3000);
});
$( window ).resize(function() {
    if ($( window ).width() < 1300) {
        $( ".buttons-container div" ).css("width", "200" );
        $( ".buttons-container div" ).css("height", "200" );
    }
  
  console.log($( window ).width());
});
});