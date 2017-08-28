$(document).ready(() => {
  navigator.geolocation.getCurrentPosition(sucess, geo_error);

});


const sucess = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  // https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139
  const api = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`
  $.get(api, (data, status) => {
    console.log({data, status});
    const { name } = data;
    const { country } = data.sys
    const { temp } = data.main
    $('.city').text(`${name}, ${country}`);
    $('.temperature').text(temp)
  });
  // console.log(`this is the lat: ${lat}`);
};
const geo_error = () => {
  console.log('not supported');
};
