
var map;
var service;
var infowindow;
var city;
var visit;
//var kingston = new google.maps.LatLng(18.020067, -76.796858);
//  var moraineLakeCoo= new google.maps.LatLng(51.322047,-116.185993);
//  var sognefjordCoo= new google.maps.LatLng(61.170106, 6.581191);

function initMap() {

    //  var kingston= $("input[name='kingston']" ).val();

    $("input[type='radio']").on("change", function () {
        if (this.value == "kingston") {
            var city = new google.maps.LatLng(18.020067, -76.796858);
        } else if (this.value == "Moraine-Lake") {
            var city = new google.maps.LatLng(51.322047, -116.185993);
        } else if (this.value == "Sognefjord") {
            var city = new google.maps.LatLng(61.170106, 6.581191);
        }
        $("input[type='radio']").change(function () {
            infowindow = new google.maps.InfoWindow();
            map = new google.maps.Map(
                document.getElementById('map'), { center: city, zoom: 12 });
            if (this.value == "hotels") {
                // $("input[value='restaurants']").prop( "disabled", true );
                //  $("input[value='beach']").prop( "disabled", true );
                var visit = "hotels";
            } else if (this.value == "restaurants") {
                var visit = "restaurants";
            } else if (this.value == "beach") {
                var visit = "beach";
            }
            var request = {
                location: city,
                radius: '500',
                query: visit
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                    map.setCenter(results[0].geometry.location);
                }
            });
        });
    });
}


function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    function isItOpen() {
        if (place.opening_hours.open_now == false) {
            return '<h6 style="text-align:center;margin-top:3px;color:red;">Closed</h6';
        } else {
            return '<h6 style="text-align:center;margin-top:3px">Open</h6';
        }
    }
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(`<h5 style="text-align:center">${place.name}</h5><br>` +
            `<img style=" display: block;margin-left: auto;margin-right: auto;" src="${place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}"/>` + "<br>" +
            isItOpen()
        );
        infowindow.open(map, this);
    });
}

