// main.js

function setMarker(lat, lng, theMap, title) {
    new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng
        },
        map: theMap,
        title: title
    });
}

const myCurrentCoords = {
    lat: 41.3977381,
    lng: 2.190471916
};

const theMap = new google.maps.Map(
    document.getElementById('map'),
    {
        zoom: 12,
        center: myCurrentCoords
    }
);

class Airport {
    constructor(lng, lat, desc) {
        if (lng < -180 || lng > 180) throw new RangeError("longitude is not valid")
        if (lat < -90 || lat > 90) throw new RangeError("latitude is not valid")

        this.lng = lng
        this.lat = lat
        this.desc = desc
    }
}

var markersAreBeingShown = false;

document.querySelector("#show-hide").onclick = function () {
    markersAreBeingShown = !markersAreBeingShown

    if (markersAreBeingShown) {
        axios
            .get("/airports")
            .then(allAirports => {
                allAirports.data.forEach(airportData => {

                    var marker = new google.maps.Marker({
                        position: {
                            lat: airportData.coords.coordinates[1],
                            lng: airportData.coords.coordinates[0]
                        },
                        map: theMap,
                        title: airportData.name,
                        draggable: true,
                    })

                    google.maps.event.addListener(marker, 'click', function () {
                        document.querySelector("#airport-name").innerHTML = airportData.name
                    });

                    google.maps.event.addListener(marker, 'dragend', function(marker){
                        var latLng = marker.latLng; 
                        currentLatitude = latLng.lat();
                        currentLongitude = latLng.lng();

                        console.log(currentLatitude)
                        console.log(currentLongitude)
                     }); 
                })
            })
    }
}



