/* eslint-disable */

$(document).ready(() => {
  navigator.geolocation.getCurrentPosition(success, geoError);
});


const success = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const geocodeAPI = 'http://geocoder.ca/?latt=' + lat + '&longt=' + long + '&reverse=1&allna=1&geoit=xml&corner=1&json=1'
  const darkskyAPI =`https://api.darksky.net/forecast/1c78397d346738576bfbfae26282ddee/${lat},${long}`;

  // get city
  $.get(geocodeAPI, (data, status) => {
    console.log(data);
    $('.city').html(`${data.city} ${data.prov}`)
  });
  // get weather data
  $.ajax({
    url: darkskyAPI,
    dataType: 'jsonp',
    crossDomain: true,
  })
  .done((data) => {
    console.log('done: ', data);
    const currentTime = data.currently.time;
    console.log(moment.unix(currentTime).format('ddd h:mm a'));
    $('.temperature').html(`${Math.floor(data.currently.temperature)}&deg;F`)
    $('.summary').html(`${data.currently.summary}`)
    setBackground(data.currently.icon);
    for (let i = 1; i < 5; i++) {
      const hourlyData = data.hourly.data[i];
      const time = moment.unix(hourlyData.time).format('ddd h:mm a');
      const temp = Math.floor(hourlyData.temperature);
      let icon = hourlyData.icon;

      switch (icon) {
        case 'clear-day':
          icon = `<i class="wi wi-day-sunny"></i>`;
          break;
        case 'clear-night':
          icon = `<i class="wi wi-night-clear"></i>`;
          break;
        case 'rain':
          icon = `<i class="wi wi-raindrops"></i>`;
          break;
        case 'snow':
          icon = `<i class="wi wi-snow"></i>`;
          break;
        case 'sleet':
          icon = `<i class="wi wi-sleet"></i>`;
          break;
        case 'wind':
          icon = `<i class="wi wi-strong-wind"></i>`;
          break;
        case 'fog':
          icon = `<i class="wi wi-fog"></i>`;
          break;
        case 'cloudy':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
          icon = `<i class="wi wi-cloudy"></i>`;
          break;
        default:
          icon = `<i class="wi wi-na"></i>`;
      }
      // console.log(time)
      $('tbody').append(`
        <tr>
          <td class='secondary-info-row table-time'>${time}</td>
          <td class='secondary-info-row table-icon'>${icon}</td>
          <td class='secondary-info-row table-temp'>${temp}&deg;F</td>
        </tr>
        `);
    }
  })
  .fail((xhr) => {
    console.log('fail: ', xhr);
  });

};
const geoError = () => {
  // console.log('not supported');
  $('.city').text('not supported');
};

const setBackground = (description) => {
  switch (description) {
    case 'clear-day':
      $('.weather-main').css(`background`, `url('../clear-day.jpeg') no-repeat center center`);
      break;
    case 'clear-night':
      $('.weather-main').css(`background`, `url('../clear-night.jpeg') no-repeat bottom center`);
      break;
    case 'rain':
      break;
    case 'snow':
      break;
    case 'sleet':
      break;
    case 'wind':
      break;
    case 'fog':
      $('.weather-main').css(`background`, `url('../fog.jpg') no-repeat 50% 65%`);
      break;
    case 'cloudy':
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      $('.weather-main').css(`background`, `url('../cloudy.jpeg') no-repeat bottom center`);
      break;
    default:;
  }
};
