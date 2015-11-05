middle = (function () {
   'use strict';
   var configMap = {
      main_html : String()
         + '<div class="search"></div>'
         + '<div class="field"></div>',
      search : String()
         + '<form>'
            + '<input type="text" name="searchString" value="Maradona">'
         + '</form>'
   },
   stateMap = {
		$container : {}
	},
	jqueryMap = {
		$field : {},
      $search : {}
	};

   var keyUpSearchHendler = function () {
      $.gevent.publish(
         'search',
         [{
            str : $( this ).val()
         }]
      );
   }

   //Зададим поле
   var setJqueryMap = function () {
      var $container = stateMap.$container;
      jqueryMap.$search = $container.find('.search');
      jqueryMap.$search.append( configMap.search );
      jqueryMap.$field = $container.find('.field');
      jqueryMap.$field.searchString = $container.find('input[name=searchString]');
      jqueryMap.$field.searchString.keyup(keyUpSearchHendler);
   }

   //Задание конфигурации
   var setConfigMap = function (options) {
      configMap.searchString = parseInt(options.searchString, 10);
   }

   //Инит модуля
   var initModule = function ( $container ) {
      $container.append( configMap.main_html );
      stateMap.$container = $container;
      setJqueryMap();
   }

   //Инит поля
   var initField = function (options) {
      setConfigMap(options);
      clear();
   }

   return {
      initModule  : initModule,
      initField : initField
   }

}());