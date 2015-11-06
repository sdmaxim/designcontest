shell = (function () {
	'use strict';

	var
		configMap = {
			main_html : String()
				+'<div id="header">'
					+'<div class="center_wrapper">'
						+'<div class="logo">'
							+'<a href="/" title="DesignContest">DesignContest</a>'
							+'<span class="since_logo">since 2003</span>'
							+'<span class="subtext_logo">custom graphic design done affordably</span>'
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
			$container : {}
		},
		jqueryMap = {
			$footer : {},
			$middle : {}
		};

	//Обработчик кнопок
	var buttonHandler = function (event, msg_map) {	
		switch (msg_map.action) {
			case 'help'			: console.log('help'); break;
			case 'our-team'	: console.log('our-team'); break;
			case 'contact-us'	: console.log('contact-us'); break;
		};
	};

	var keyUpHandler = function (event, msg_map) {
		var str, search, reg = /^[a-zA-Z0-9.]+$/;
		middle.clearField();
		if (msg_map.str.length > 2 && reg.test(msg_map.str)) {
			search = msg_map.str.toLowerCase();
			//Нужно организовать разбиение на слова и проверить какие из них с кавычками, подправить регул выраж.

			//Прверка есть ли такое слово в сереализованном объекте
			db.data.forEach(function(item, i) {
				str = JSON.stringify(item).toLowerCase();
				if (str.indexOf(search) + 1) {
					middle.showPlayer(item);
				}
			});
		}
	}

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
		$.gevent.subscribe( jqueryMap.$middle, 'search',  keyUpHandler );
		db.initModule();
	};

	return { initModule : initModule };

}());
