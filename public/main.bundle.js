'use strict';

/* eslint-disable */

$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, geoError);
  } else {
    $('.city').html('Geolocation is not supported by this browser.');
    $('.body-class').css('background-color', '#3498db');
  }
});

var success = function success(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var geocodeAPI = 'http://geocoder.ca/?latt=' + lat + '&longt=' + long + '&reverse=1&allna=1&geoit=xml&corner=1&json=1';
  var darkskyAPI = 'https://api.darksky.net/forecast/1c78397d346738576bfbfae26282ddee/' + lat + ',' + long;

  // get city
  $.get(geocodeAPI, function (data, status) {
    console.log(data);
    $('.city').html(data.city + ' ' + data.prov);
  });
  // get weather data
  $.ajax({
    url: darkskyAPI,
    dataType: 'jsonp',
    crossDomain: true
  }).done(function (data) {
    console.log('done: ', data);
    var currentTime = data.currently.time;
    console.log(moment.unix(currentTime).format('ddd h:mm a'));
    $('.time').html(moment.unix(currentTime).format('ddd h:mm a'));
    $('.temperature').html(Math.floor(data.currently.temperature) + '&deg;F');
    $('.summary').html('' + data.currently.summary);
    setBackground(data.currently.icon);
    for (var i = 1; i < 5; i++) {
      var hourlyData = data.hourly.data[i];
      var time = moment.unix(hourlyData.time).format('ddd h:mm a');
      var temp = Math.floor(hourlyData.temperature);
      var icon = hourlyData.icon;

      switch (icon) {
        case 'clear-day':
          icon = '<i class="wi wi-day-sunny"></i>';
          break;
        case 'clear-night':
          icon = '<i class="wi wi-night-clear"></i>';
          break;
        case 'rain':
          icon = '<i class="wi wi-raindrops"></i>';
          break;
        case 'snow':
          icon = '<i class="wi wi-snow"></i>';
          break;
        case 'sleet':
          icon = '<i class="wi wi-sleet"></i>';
          break;
        case 'wind':
          icon = '<i class="wi wi-strong-wind"></i>';
          break;
        case 'fog':
          icon = '<i class="wi wi-fog"></i>';
          break;
        case 'cloudy':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
          icon = '<i class="wi wi-cloudy"></i>';
          break;
        default:
          icon = '<i class="wi wi-na"></i>';
      }
      $('.loader').fadeOut(300, function () {
        $('.time').fadeIn(300);
        $('.temperature').fadeIn(300);
        $('.summary').fadeIn(300);
        $('.city').fadeIn(300);
        $('.secondary-info').fadeIn(300);
        $('.flex-box').fadeIn(300);
        $('.secondary-info').fadeIn(300);
        $('.weather-secondary').css('background-color', 'whitesmoke');
      });
      $('.hourly-tab').html('Hourly');
      $('tbody').append('\n        <tr>\n          <td class=\'secondary-info-row table-time\'>' + time + '</td>\n          <td class=\'secondary-info-row table-icon\'>' + icon + '</td>\n          <td class=\'secondary-info-row table-temp\'>' + temp + '&deg;F</td>\n        </tr>\n        ');
    }
  }).fail(function (xhr) {
    console.log('fail: ', xhr);
  });
};
var geoError = function geoError(error) {
  if (error.message) {
    $('.loader').fadeOut(300, function () {
      $('.city').text(error.message).fadeIn(300);
      $('.body-class').css('background-color', '#3498db');
    });
  } else {
    $('.loader').fadeOut(300, function () {
      $('.city').text('Browser not supported').fadeIn(300);
      $('.body-class').css('background-color', '#3498db');
    });
  }
};

var setBackground = function setBackground(description) {
  switch (description) {
    case 'clear-day':
      $('.weather-main').css('background', 'url(\'../clear-day.jpeg\') no-repeat center center');
      break;
    case 'clear-night':
      $('.weather-main').css({ 'background': 'url(\'../clear-night.jpeg\')\n        no-repeat bottom center', 'background-size': 'cover' });
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
      $('.weather-main').css('background', 'url(\'../fog.jpg\') no-repeat 50% 65%');
      break;
    case 'cloudy':
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      $('.weather-main').css('background', 'url(\'../cloudy.jpeg\') no-repeat bottom center');
      break;
    default:
      ;
  }
};
