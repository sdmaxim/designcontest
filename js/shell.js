shell = (function () {
	'use strict';

	var
		configMap = {
			main_html : String()
				+'<div id="header">'
					+'<div class="center_wrapper">'
						+'<div class="logo">'
							+'<a href="/" title="DesignContest">DesignContest</a>'
							+'<span class="since_logo">на ринку з 2003</span>'
							+'<span class="subtext_logo">графічний дизайн - просто як ніколи</span>'
						+'</div>'
						+'<div class="help_block unlogged"></div>'
					+'</div>'
				+'</div>'
				+'<div id="middle">'
					+'<div class="center_wrapper">'
					+'</div>'
				+'</div>'
				+'<div id="footer">'
					+'<div class="center_wrapper">'
					+'</div>'
				+'</div>'

		},
		stateMap = {
			$container : {},
			quan : 0
		},
		jqueryMap = {
			$footer : {}
		};

	//Обработчик кнопок
	var buttonHandler = function (event, msg_map){	
		var line1 = 0;	
		switch (msg_map.action) {
			case 'draw'		: middle.initField(msg_map.data); break;
			case 'clear'	: middle.clearField(); break;
		};
	};

	//Задание карты JQuery
	var setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap.$footer = $container.find('#footer .center_wrapper');
		jqueryMap.$middle = $container.find('#middle .center_wrapper');
	};

	//Точка входа модуля
	var initModule = function ( $container ) {
		$container.html( configMap.main_html );
		stateMap.$container = $container;
		setJqueryMap();
		footer.initModule( jqueryMap.$footer );
		middle.initModule( jqueryMap.$middle );
		$.gevent.subscribe( jqueryMap.$footer, 'footer-menu',  buttonHandler );
	};

	return { initModule : initModule };

}());
