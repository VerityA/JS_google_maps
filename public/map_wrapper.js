function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};



const MapWrapper = function(container, center, zoom) {

  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
  this.markers = [];
};

MapWrapper.prototype.addMarker = function (coOrds) {
  const marker = new google.maps.Marker({
    map: this.googleMap,
    position: coOrds
  });

  this.markers.push(marker);

  this.addMarkerClickListener(marker);
};

MapWrapper.prototype.addClickListener = function () {
  google.maps.event.addListener(this.googleMap, 'click', (event) => {
    const coOrds = {
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    };
    this.addMarker(coOrds);
  });

};

MapWrapper.prototype.addMarkerClickListener = function (marker) {
  google.maps.event.addListener(marker, 'click', (event) => {
    const infowindow = new google.maps.InfoWindow({
      content: `The co-ordinates for the location you have pinned are: <br/>
      latitude: ${precisionRound(marker.position.lat(), 4)}, <br/>
      longitude: ${precisionRound(marker.position.lng(), 4)}`
    });

    infowindow.open(this.googleMap, marker);
  });


MapWrapper.prototype.setCenter = function (coOrds) {
  this.googleMap.setCenter(coOrds);
};


};
