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

   var buttonHandler = function (event, msg_map) {
      switch (msg_map.action) {
         case 'help'       : console.log('help'); break;
         case 'our-team'   : console.log('our-team'); break;
         case 'contact-us' : console.log('contact-us'); break;
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
		db.initModule();
		//Для работы кнопок, подписка на события
		$.gevent.subscribe( jqueryMap.$footer, 'footer-menu',  buttonHandler );		
	};

	return { initModule : initModule };

}());
