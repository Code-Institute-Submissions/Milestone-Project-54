
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
var openHours;
var weekDay;
var mapMarkers = [];
var resultsPlace = [];
var resultsTexSearch = [];
var zoom;

//var kingston = new google.maps.LatLng(18.020067, -76.796858);
//  var moraineLakeCoo= new google.maps.LatLng(51.322047,-116.185993);
//  var sognefjordCoo= new google.maps.LatLng(61.170106, 6.581191);


function initMap() {
    $("#jamaica").click(function () {
        city = new google.maps.LatLng(18.020067, -76.796858);
        visit = "hotels";
        search(city, visit);
        $("#kingston").prop("checked", true);
        $("#hotels").prop("checked", true);
        
    });
    $("#norway").click(function () {
        city = new google.maps.LatLng(61.170106, 6.581191);
        visit = "hotels";
        search(city, visit);
        $("#Moraine-Lake").prop("checked", true);
        $("#hotels").prop("checked", true);
    });

    $("#canada").click(function () {
        city = new google.maps.LatLng(51.322047, -116.185993);
       visit = "hotels";
        search(city, visit);
        $("#Sognefjord").prop("checked", true);
        $("#hotels").prop("checked", true);
    });
    city = new google.maps.LatLng(18.020067, -76.796858);
    visit = "hotels";
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(
        document.getElementById('map'), {
        center: city,
        zoom: 12
    });
    //  var kingston= $("input[name='kingston']" ).val();
    search(city, visit);

    $("input[type='radio']").change(function () {
        if (this.value == "kingston") {
            city = new google.maps.LatLng(18.020067, -76.796858);
             
         
            search(city, visit);
        } else if (this.value == "Moraine-Lake") {
            city = new google.maps.LatLng(51.322047, -116.185993);
          
         
           search(city, visit);
        } else if (this.value == "Sognefjord") {
            city = new google.maps.LatLng(61.170106, 6.581191);
       
     
         search(city, visit);
        }   
    });
    $("input[type='radio']").change(function () {
        if (this.value == "hotels") {
            // $("input[value='restaurants']").prop( "disabled", true );
            //  $("input[value='beach']").prop( "disabled", true );
            visit = "hotels";
             
              search(city, visit);
        } else if (this.value == "restaurants") {
            visit = "restaurants";
             
          
             search(city, visit);
        } else if (this.value == "beach") {
            visit = "beach";
          
             search(city, visit);
        }      
    });
    function search(city, visit) {
        deleteMarkers();
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
                        }
                    });
                }
                map.setCenter(results[0].geometry.location);
            }
        });

    }
}

function jamaicaTime() {
    date = new Date();
    var weekDayStartsMonday = date.getDay() - 1;
    return weekDayStartsMonday;
}


function setMapOnAll(map) {
    for (var i = 0; i <  mapMarkers.length; i++) {
        mapMarkers[i].setMap(map);
    }
    console.log("this is for map"+map)
}
 function clearMarkers() {
        setMapOnAll(null);
      }

function deleteMarkers() {
        clearMarkers();
        mapMarkers = [];
      }

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
                            openDay = date.getDay();
                            var dd = date.getHours() + ((Math.abs(resultsPlace[a].utc_offset_minutes) + Math.abs(n)) / 60);
                            if ((openDay == 0) && (dd > 24)) {
                                openDay = 6;
                            } else {
                                OpenDay = 0;
                            }
                            openHours = date.getHours();
                            n = date.getTimezoneOffset();
                            date.getHours();       
                            closesH = ((resultsPlace[a].opening_hours.periods[date.getDay()].close.hours) * 60 + resultsPlace[a].opening_hours.periods[date.getDay()].close.minutes - ((date.getHours()) * 60)) - date.getMinutes();
                            closesM = resultsPlace[a].opening_hours.periods[date.getDay()].close.minutes - date.getMinutes();
                            b = Math.floor((closesH + Math.abs(resultsPlace[a].utc_offset_minutes + n)) / 60);
                            k = Math.floor(((closesH + Math.abs(resultsPlace[a].utc_offset_minutes + n)) / 60 - b) * 60);
                            if ((resultsPlace[a].opening_hours.isOpen() == false) && (date.getHours() + ((Math.abs(resultsPlace[a].utc_offset_minutes) + Math.abs(n)) / 60) > 24)) {
                                return '<div class="info-window"><p style="margin-bottom:3px;color:#fc6f03"><strong>closed, open again : </strong><span style="font-size:14px;font-weight:600; color:black">' + resultsPlace[a].opening_hours.weekday_text[openDay]+ '</span></p><strong>Phone:</strong>' + resultsPlace[a].formatted_phone_number + '<br><p style="margin-top:4px"><a href=' + resultsPlace[a].url + '>open on google maps</a></p></div>'+resultsPlace[a].opening_hours.periods[date.getDay()].close.hours;
                            } else if ((resultsPlace[a].opening_hours.isOpen() == false) && (date.getHours() + ((Math.abs(resultsPlace[a].utc_offset_minutes) + Math.abs(n)) / 60) < 24))  {
                               return '<div class="info-window"><p style="margin-bottom:3px;color:#fc6f03"><strong>closed, open again : </strong><span style="font-size:14px;font-weight:600; color:black">' + resultsPlace[a].opening_hours.weekday_text[openDay-1]+ '</span></p><strong>Phone:</strong>' + resultsPlace[a].formatted_phone_number + '<br><p style="margin-top:4px"><a href=' + resultsPlace[a].url + '>open on google maps</a></p></div>'+resultsPlace[a].opening_hours.periods[date.getDay()].close.hours;
                            }else {
                                return closes = '<div class="info-window"><p style="margin-bottom:3px;color:#fc6f03"><strong>Closing In </strong><span style="font-size:14px;font-weight:600; color:black">' + b + "H:" + k+"m"+ '</span></p><strong>Phone:</strong>' + resultsPlace[a].formatted_phone_number + '<br><p style="margin-top:4px"><a href=' + resultsPlace[a].url + '>open on google maps</a></p></div>';
                            }
                        } catch (error) {
                            if (error.message == "Cannot read property 'close' of undefined") {
                                return closes = "<p><strong>" + resultsPlace[a].opening_hours.weekday_text[jamaicaTime()] + "</strong><br><strong> Phone:</strong>" + resultsPlace[a].formatted_phone_number + "</p>";
                            } else if (error.message == "Cannot read property 'periods' of undefined") {
                                return closes = "open/close time is not specified";
                            } else if (error.message == "Uncaught TypeError: Cannot read property '0' of undefined") {
                                return closes = "Picture is on the way";
                            }
                        }
                    }
                }
            }
        }
    }
    var sizeMarker = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(60, 60));
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      //  icon: sizeMarker,
        title: "click",
        size: new google.maps.Size(70, 70),
        animation: google.maps.Animation.DROP,

        label: {
            text: `${isItOpen()}`,
            color: 'white',
            fontSize: '8px',
            fontWeight: "bold",
        },
    });
    mapMarkers.push(marker);

    function isItOpen() {
        try {
            if (place.opening_hours.open_now == false) {


                return "Closed"
            } else {
                return "Open"
            }
        } catch (err) {
            if (err.message == "Cannot read property 'open_now' of undefined") {
                return ".";
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


        } else if ((ratings > 3.5) && (ratings <= 4.0)) {
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
            `<img class="rounded" style=" display: block;margin-left: auto;margin-right: auto;" src="${place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}"/>` +
            '<h6 style="text-align:center;margin-top:5px">' + place.name + '</h6>' +
            '<p>' + rating() +
            findtime(place.name) +
            '</p><p><strong>Address:</strong>' + place.formatted_address + '</p></div>'
            
        );
        // infowindow.open(map, this);
        infowindow.open(map, this)
       
      
    });
}
