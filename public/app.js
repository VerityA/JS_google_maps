document.addEventListener('DOMContentLoaded', () => {

  const mapContainer = document.querySelector('#main-map');

  const center = {lat: 40.712784, lng: -74.005941};

  const mainMap = new MapWrapper(mapContainer, center, 12);

  mainMap.addMarker(center);
  mainMap.addMarker({lat: 55.946962, lng:-3.201958});
  mainMap.addClickListener();

  const chicagoButton = document.querySelector('#chicago-button');
  chicagoButton.addEventListener('click', () => {
    mainMap.setCenter({lat: 41.8781 ,lng: -87.6298});
  });

  const whereAmIButton = document.querySelector('#where-am-i');
  whereAmIButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
      console.log('not working');
      return ;
    }

    navigator.geolocation.getCurrentPosition( (position) => {
      const coOrds = {lat: position.coords.latitude, lng: position.coords.longitude};
      mainMap.setCenter(coOrds);
      mainMap.addMarker(coOrds);
    });

  });
});
