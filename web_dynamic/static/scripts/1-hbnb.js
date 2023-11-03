// static/scripts/1-hbnb.js
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
});
