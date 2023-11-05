/* global $, HOST */

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

  $.post({
	  url: `http://0.0.0.0:5001/api/v1/places_search`,
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      data.forEach((place) =>
        $('section.places').append(
        `<article>
      <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
      <div class="max_guest">${place.max_guest} 
        Guest${place.max_guest !== 1 ? 's' : ''}
      </div>
      <div class="number_rooms">${place.number_rooms} Bedroom${
        place.number_rooms !== 1 ? 's' : ''}</div>
      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
        place.number_bathrooms !== 1 ? 's' : ''}
      </div>
      </div> 
      <div class="description">
        ${place.description}
      </div>
      </article>`
        )
      );
    },
    dataType: 'json'
  });

  // Handle the Search button click event
  $('button').click(function () {
    const amenityIds = Object.keys(amenitiesDict);

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }),
      success: function (data) {
        $('section.places').empty();

        data.forEach(function (place) {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${
                  place.max_guest !== 1 ? 's' : ''
                }</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${
                  place.number_rooms !== 1 ? 's' : ''
                }</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                  place.number_bathrooms !== 1 ? 's' : ''
                }</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        });
      },
      dataType: 'json',
    });
  });
});
