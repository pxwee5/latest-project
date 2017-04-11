(function(){
  var templateSource = 'scripts/templates/';

  $('#bh-sl-map-container').storeLocator({
  	'visibleMarkersList': false, //probably best used with side panel numbering switched off
  	'autoGeocode': false,
  	'autoComplete': false,
  	'markerImg': 'images/ballance-marker.png',
  	'markerDim': { height: 40, width: 40 },
  	'loading': true,
  	'autoComplete': false,
  	'mapSettings': {
    	zoom     : 11, //orginal setting 12. fullMapStart sets initial extent based all markers. zoom establishes extent following search query
    	mapTypeId: google.maps.MapTypeId.HYBRID
  	},
  	'dragSearch': false,
  	'fullMapStart': true,
    'bounceMarker': false,
  	'lengthUnit': 'km',
  	'storeLimit': -1,
  	'distanceAlert': -1,
  	'dataType': 'kml',
  	'dataLocation': 'data/locations.xml',
    'infowindowTemplatePath'   : templateSource + 'infowindow-description.html',
		'listTemplatePath'         : templateSource + 'location-list-description.html',
		'KMLinfowindowTemplatePath': templateSource + 'kml-infowindow-description.html',
		'KMLlistTemplatePath'      : templateSource + 'kml-location-list-description.html',
    callbackCreateMarker: function(map, point, letter, category, id) {
      var mapIcon = {
        url: this.settings.markerImg,
        labelOrigin: new google.maps.Point(20, 15),
        size: new google.maps.Size(this.settings.markerDim.width, this.settings.markerDim.height),
        scaledSize: new google.maps.Size(this.settings.markerDim.width, this.settings.markerDim.height)
      };
      var mapLabel = {
        color: '#FFFFFF',
        fontWeight: 'bold',
        text: id.toString(),
      };

      return new google.maps.Marker({
        position  : point,
        map       : map,
        icon      : mapIcon,
        label     : mapLabel,
        draggable : false,
      });
    }
  });
})();
