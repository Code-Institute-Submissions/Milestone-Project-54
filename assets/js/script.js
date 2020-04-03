$(document).ready(function () {
 
$("header").mousemove(function( event ) {

});
    
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
        setTimeout(showImages,4000);
      
    }
});