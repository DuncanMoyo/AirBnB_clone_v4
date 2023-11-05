$(document).ready(function () {
  const amenitiesDict = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      // If the checkbox is checked, store the Amenity ID in the dictionary
      amenitiesDict[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the dictionary
      delete amenitiesDict[amenityId];
    }

    // Update the h4 tag within the Amenities section with the list of Amenities checked
    const amenitiesList = Object.values(amenitiesDict);
    $('.amenities h4').text(amenitiesList.join(', '));
  });

  // Request the API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Request places_search
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        $('.places').append('<article><div class="title"><h2>' + place.name +
          '</h2><div class="price_by_night">' + place.price_by_night +
          '</div></div><div class="information"><div class="max_guest">' +
          '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' +
          place.max_guest + ' Guests</div><div class="number_rooms">' +
          '<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' +
          place.number_rooms + ' Bedrooms</div><div class="number_bathrooms">' +
          '<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' +
          place.number_bathrooms + ' Bathroom</div></div>' +
          '<div class="description">' + place.description + '</div></article>');
      }
    }
  });
});

