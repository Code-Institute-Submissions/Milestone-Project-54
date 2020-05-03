
var service;
var infowindow;
var city;
var visit;
var b;
var results;
var k;
var date;
var hours;
var minutes;
var seconds;
var closesH;
var closesM;
var closes;
var n;
var Mapmarkers = [];
var resultsPlace = [];
var resultsTexSearch = [];

//var kingston = new google.maps.LatLng(18.020067, -76.796858);
//  var moraineLakeCoo= new google.maps.LatLng(51.322047,-116.185993);
//  var sognefjordCoo= new google.maps.LatLng(61.170106, 6.581191);

function initMap() {

    city = new google.maps.LatLng(18.020067, -76.796858);
    visit = "hotels";
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(
        document.getElementById('map'), { center: city, zoom: 15 });
    //  var kingston= $("input[name='kingston']" ).val();
    search(city, visit);

    $("input[type='radio']").change(function () {
        if (this.value == "kingston") {
            city = new google.maps.LatLng(18.020067, -76.796858);
        } else if (this.value == "Moraine-Lake") {
            city = new google.maps.LatLng(51.322047, -116.185993);

        } else if (this.value == "Sognefjord") {
            city = new google.maps.LatLng(61.170106, 6.581191);
        }
        search(city, visit);

    });
    $("input[type='radio']").change(function () {

        if (this.value == "hotels") {
            // $("input[value='restaurants']").prop( "disabled", true );
            //  $("input[value='beach']").prop( "disabled", true );
            visit = "hotels";
        } else if (this.value == "restaurants") {
            visit = "restaurants";
        } else if (this.value == "beach") {
            visit = "beach";
        }
        clearMarkers();
        search(city, visit)
    });
    function search(city, visit) {


        console.log($("input[type='radio']").val());

        var request = {
            location: city,
            radius: '500',
            query: visit,

        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, function (results, status) {


            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {

                    createMarker(results[i]);
                    resultsTexSearch.push(results[i]);
                    console.log(resultsTexSearch[i]);




                    var request1 = {
                        placeId: results[i].place_id,
                        fields: ['name', 'rating', 'formatted_phone_number', 'opening_hours', 'utc_offset_minutes', 'url']
                    };

                    service = new google.maps.places.PlacesService(map);
                    service.getDetails(request1, function (open, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {



                            resultsPlace.push(open);

                            console.log(open);
                            /*
                                                        try {
                            
                                                            date = new Date();
                                                            n = date.getTimezoneOffset();
                                                            date.getHours();
                                                            closesH = ((open.opening_hours.periods[date.getDay()].close.hours) * 60 + open.opening_hours.periods[date.getDay()].close.minutes - ((date.getHours()) * 60)) - date.getMinutes();
                                                            closesM = open.opening_hours.periods[date.getDay()].close.minutes - date.getMinutes();
                                                            b = Math.floor((closesH + Math.abs(open.utc_offset_minutes + n)) / 60);
                                                            k = Math.floor(((closesH + Math.abs(open.utc_offset_minutes + n)) / 60 - b) * 60);
                            
                                                            closes = b + ":" + k;
                            
                            
                            
                                                            console.log(place.name + "This place wull be closed in " + b + "Hours and  " + k + " Minutes" + closesM + "day of the week date" + date.getDay() + "newtime" + closesH + "sss" + n);
                            
                                                        }
                            
                                                        catch (err) {
                                                            if ((err.message == "Cannot read property 'close' of undefined") && (open.opening_hours.periods.length == 1)) {
                                                                closes = "working 24 hours";
                            
                                                            } else if (err.message == "Cannot read property 'periods' of undefined") {
                                                                closes = "Working time is not sipecified";
                                                            }
                            
                            
                            
                                                           
                                                        }
                                                        */
                        }
                    });
                }
                map.setCenter(results[0].geometry.location);
            }
        });

    }

}



function setMapOnAll(map) {
    for (var i = 0; i < Mapmarkers.length; i++) {
        Mapmarkers.setMap(null);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}
setMapOnAll(map);

function createMarker(place) {

    function findtime(name) {
        for (var z = 0; z < resultsTexSearch.length; z++) {
            if (resultsTexSearch[z].name == name) {
                var found = resultsTexSearch[z].name;
                console.log(z, resultsTexSearch[z]);
                console.log("name" + found);
                for (var a = 0; a < resultsPlace.length; a++) {
                    if (resultsPlace[a].name == found) {
                        try {
                            console.log(a, "namedd" + found);
                            console.log(" r lygu name" + resultsPlace[a].name);
                            //   return closes=resultsPlace[a]//.opening_hours.weekday_text;
                            console.log(resultsPlace[a]);
                            date = new Date();
                            n = date.getTimezoneOffset();
                            date.getHours();
                            closesH = ((resultsPlace[a].opening_hours.periods[date.getDay()].close.hours) * 60 + resultsPlace[a].opening_hours.periods[date.getDay()].close.minutes - ((date.getHours()) * 60)) - date.getMinutes();
                            closesM = resultsPlace[a].opening_hours.periods[date.getDay()].close.minutes - date.getMinutes();
                            b = Math.floor((closesH + Math.abs(resultsPlace[a].utc_offset_minutes + n)) / 60);
                            k = Math.floor(((closesH + Math.abs(resultsPlace[a].utc_offset_minutes + n)) / 60 - b) * 60);

                            return closes = '<div class="info-window"><p style="margin-bottom:3px;color:#fc6f03"><strong>Closing In </strong><span style="font-size:14px;font-weight:600; color:black">' + b + ":" + k + '</span></p><strong>Phone:</strong>' + resultsPlace[a].formatted_phone_number + '<br><p style="margin-top:4px"><a href=' + resultsPlace[a].url + '>open on google maps</a></p></div>';

                        } catch (err) {
                            //if (err.message == "Cannot read property 'close' of undefined") {
                                //    return closes = "<p>"+resultsPlace[a].opening_hours.weekday_text[date.getDay()]+"<strong> Phone:</strong>"+resultsPlace[a].formatted_phone_number+"</p>";
                            if (err.message == "Cannot read   property 'periods' of undefined") {
                                return closes = "Working time is not specified";
                            } else if (err.message == "Uncaught TypeError: Cannot read property '0' of undefined") {
                                return closes = "Picture is on the way";
                            }

                        }
                    }


                }
            }
        }
    }


    var sizeMarker = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(80, 80));
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        //icon: sizeMarker,
        title: "sds",
        size: new google.maps.Size(70, 70),
        animation: google.maps.Animation.DROP,

        label: {
            text: `${isItOpen()}`,
            color: 'white',
            fontSize: '8px',
            fontWeight: "bold",
        },
    });
    Mapmarkers.push(marker);

    function isItOpen() {
        try {
            if (place.opening_hours.open_now == false) {

                //eturn '<h6 style="text-align:center;margin-top:3px;color:red;//">Closed</h6';
                return "Closed"
            } else {
                // return '<h6 style="text-align:center;margin-top:3px">Open</h6';
                return "Open"
            }
        }
        catch (err) {
            if (err.message == "Cannot read property 'open_now' of undefined") {
                return "?";
            }
        }
    }
    function rating() {

        var ratings = parseFloat(place.rating);
        console.log(ratings);
        if (ratings < 1) {
            return `<div class="info-window"><h6> <small class='text-muted'>Rating</small> 
            <span>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <i class="fas fa-star-half-alt"></i>
            <i class="fas fa-star-half-alt"></i>
              </span>
            <small class='text-muted'>of ${place.user_ratings_total}</small>
            </h6></div>`;
        } else if ((ratings > 2.0) && (ratings < 2.5)) {
            return `<div class="info-window"><h6> <small class='text-muted'>Rating</small> 
            <span>
            <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star-half-alt"></i>
             <i class="far fa-star"></i>
             <i class="far fa-star"></i>
              </span>
            <small class='text-muted'>of ${place.user_ratings_total}</small>
            </h6></div>`;


        } else if ((ratings > 3.0) && (ratings <= 3.5)) {
            return `<div class="info-window"><h6> <small class='text-muted'>Rating</small> 
            <span>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star-half-alt"></i>
             <i class="far fa-star"></i>
              </span>
            <small class='text-muted'>of ${place.user_ratings_total}</small>
            </h6></div>`;


        }
        else if ((ratings > 3.5) && (ratings <= 4.0)) {
            return `<div class="info-window"><h6> <small class='text-muted'>Rating</small> 
            <span>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="far fa-star"></i>
            </span>
            <small class='text-muted'>of ${place.user_ratings_total}</small>
            </h6></div>`;

        } else if ((ratings > 4.0) && (ratings <= 4.5)) {
            return `<div class="info-window"><h6> <small class='text-muted'>Rating</small> 
            <span>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>     
            <i class="fas fa-star-half-alt"></i> 
             </span>
            <small class='text-muted'>of ${place.user_ratings_total}</small>
            </h6></div>`;

        } else if ((ratings > 4.5) && (ratings <= 5.0)) {
            return `<div class="info-window"><h6> <small class='text-muted'>Rating</small> 
            <span>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
              </span>
            <small class='text-muted'>of ${place.user_ratings_total}</small>
            </h6></div>`;
        }
    }


    google.maps.event.addListener(marker, 'click', function () {

        infowindow.setContent(
            '<div>' +
            `<img style=" display: block;margin-left: auto;margin-right: auto;" src="${place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}"/>` +
            '<h6 style="text-align:center;margin-top:5px">' + place.name + '</h6>' +
            '<p>' + rating() +
            findtime(place.name) + '</p></div>'
        );
        // infowindow.open(map, this);
        infowindow.open(map, this)
    });

}

/*
function createMarker(place) {

function findtime(name) {
    console.log(name);
    for(var z=0; z<resultsTexSearch.length; z++) {
        if (resultsTexSearch[z].name==name){
            var found=resultsTexSearch[z].name;
            console.log(z);
             console.log("name"+found);
           for(var a=0; a<resultsPlace.lengthh; a++){
               if(resultsPlace[a].name==found){
                    console.log("name"+found);
                    console.log(" r lygu name"+resultsPlace[a].name);

                   }




           }
        }
    }
}
*/