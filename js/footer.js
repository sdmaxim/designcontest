footer = (function () {
	'use strict';
	var
		configMap = {
			main_html : '<div class="footer-menu"></div>'
		},
		stateMap = {
			$container : {}
		},
		jqueryMap = {
			$menu    : {}
		},
		menuList = [
			{	name: "HELP",		action: "help"},
			{	name: "OUR TEAM",	action: "our-team"},
			{	name: "CONTACT US",	action: "contact-us"}
		];

	var button = function (name, action) {
		var htmlButton;

		//Формирование HTML кнопки по частям
		htmlButton = $('<li>', {
			'class' : 'menuitem',
			'action' : action
		});

		htmlButton.click(function () {
			$.gevent.publish(
				'footer-menu',
				[{
					action : $( this ).attr('action')
				}]
			);
		});
		return htmlButton.text( name );
	};

	//Отрисовка меню
	var renderMenu = function () {
		for (var i = 0; i < menuList.length; i++) {
			jqueryMap.$menu.append(button(
				menuList[i].name,
				menuList[i].action
			));
		}
	};

	//Задание карты JQuery
	var setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap.$menu = $container.find('.footer-menu');
	}

	//Точка входа модуля
	var initModule = function ($container) {
		$container.append( configMap.main_html );
		stateMap.$container = $container;
		setJqueryMap();
		renderMenu();
	}

	return { initModule : initModule };
}());
