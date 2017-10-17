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
      const icon = hourlyData.icon;
      const temp = Math.floor(hourlyData.temperature);
      // console.log(time)
      $('.secondary-info').append(`
        <tr>
          <td>${time}</td>
          <td>${icon}</td>
          <td>${temp}&deg;F</td>
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
