db = (function () {
	'use strict';
	var data = 0;

	$.getJSON( "players.json", function( data ) {
		var items = [];
		$.each( data, function( key, val ) {
			items.push( "<li id='" + key + "'>" + val + "</li>" );
		});

		$( "<ul/>", {
			"class": "my-new-list",
			html: items.join( "" )
		}).appendTo( "body" );
	});

	var initModule = function () {

	}

	return {
		data : data
	}
}());

