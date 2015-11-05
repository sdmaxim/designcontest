footer = (function () {
	'use strict';
	var
	configMap = {
		main_html : '<div class="footer-management"></div>'
	},
	stateMap = {
		$container : {}
	},
	jqueryMap = {
		$setSize : {
			maxAngle : {},
			zoom : {}
		},
		$menu    : {}
	},
	menuList = [
		{	name: "HELP",		action: "help"},
		{	name: "OUR TEAM",		action: "out-team"},
		{	name: "CONTACT US",		action: "contact-us"}
	];

	var button = function (name, action) {
		var htmlButton;

		//Формирование HTML кнопки по частям
		htmlButton = $('<li>', {
			'class' : 'menuitem',
			'action' : action
		});

		htmlButton.click(function () {
			var msg_text = {
				maxAngle : jqueryMap.$setSize.maxAngle.val(),
				zoom : jqueryMap.$setSize.zoom.val()
			}
			$.gevent.publish(
				'footer-menu',
				[{
					action : $( this ).attr('action'),
					data : msg_text
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

		jqueryMap.$menu = $container.find('.footer-management');

		jqueryMap.$setSize.maxAngle = $container.find('input[name=maxAngle]');
		jqueryMap.$setSize.zoom = $container.find('input[name=zoom]');
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
