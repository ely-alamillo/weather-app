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
    $('.temperature').html(`${Math.floor(data.currently.temperature)}&deg;F`)
    $('.summary').html(`${data.currently.summary}`)
    for (let i = 0; i < 4; i++) {
      const hourlyData = data.hourly.data[i];
      const time = moment.unix(hourlyData.time).format('ddd h:mm a');
      let icon = hourlyData.icon;
      console.log(icon);
      const temp = Math.floor(hourlyData.temperature);
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
