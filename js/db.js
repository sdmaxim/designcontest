db = (function () {
	'use strict';
	var jsonData = new Array();

	var initModule = function () {
		$.getJSON( "https://raw.githubusercontent.com/sdmaxim/designcontest/master/players.json", function( data ) {
			$.each( data, function( key, val ) {
				jsonData[key] = val;
			});
		});
	}

	return {
		data : jsonData,
		initModule : initModule
	}
}());

