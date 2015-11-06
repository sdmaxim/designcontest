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

   var clearField = function () {
      jqueryMap.$field.empty();
   }

   var showPlayer = function (item) {
      var tag, keyText, itemList;
      //Формирование списка по частям
      for (var key in item) {
         if (key != "id") {

            if (key == "name") {
               tag = '<h1>'; 
               keyText = "";
            } else { 
               tag = '<h3>';
               keyText = key + ': ';
            }
            itemList = $(tag, {
               'class' : 'itemlist'
            });

            itemList.text(keyText + item[key]);
            jqueryMap.$field.append(itemList);
         }
      }
   }

   var showList = function(list) {
      //listItem.append

      /*jqueryMap.$menu.append(button(
            menuList[i].name,
            menuList[i].action
         ));*/
   }

   //Зададим поле
   var setJqueryMap = function () {
      var $container = stateMap.$container;
      jqueryMap.$search = $container.find('.search');
      jqueryMap.$search.append( configMap.search );
      jqueryMap.$search.searchString = $container.find('input[name=searchString]');
      jqueryMap.$search.searchString.keyup(keyUpSearchHendler);
      jqueryMap.$field = $container.find('.field');

   }

   //Инит модуля
   var initModule = function ( $container ) {
      $container.append( configMap.main_html );
      stateMap.$container = $container;
      setJqueryMap();
   }

   return {
      initModule  : initModule,
      showPlayer : showPlayer,
      clearField : clearField
   }

}());