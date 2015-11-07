middle = (function () {
   'use strict';
   var configMap = {
      main_html : String()
         + '<div class="search"></div>'
         + '<div class="field"></div>',
      search : String()
         + '<form>'
            + '<input type="text" name="searchString" value="">'
         + '</form>'
   },
   stateMap = {
		$container : {}
	},
	jqueryMap = {
		$field : {},
      $search : {}
	};

   //Обработчик отжатой клавиши
   var keyUpHandler = function () {
      var str, dataInd, wordInd, searchInd, resInd, i, isFlag, temp, nWords =0, relClass, sFlag, //Флак кавычек
      findIndPlayes = Array(), 
      resArr = Array(), 
      search = $( this ).val(), 
      reg = /^[a-zA-Z0-9 -?"]+$/; //Буквы англ, цифры, точка, пробел, кавычки

      clearField();
      search = search.trim();
      if (search.length > 2 && reg.test(search)) {
         search = search.toLowerCase();
         search = search.split(' ');

         //Проверка есть ли такое слово в значениях объекта
         nWords = search.length;
         for (wordInd = 0; wordInd < nWords; wordInd++) {
            sFlag = 0;
            //Если слово имеет кавычки
            if (search[wordInd][0] == '"' && search[wordInd][search[wordInd].length-1] == '"') {
               search[wordInd] = search[wordInd].slice(1, -1);
               sFlag = 1;
            }

            //если слово слева имеет минус
            if (search[wordInd][0] == '-') {
               search[wordInd] = search[wordInd].slice(1);
               sFlag = 2; 
            }

            // Если слово не имеет длины пропускаем его
            if (!search[wordInd]) {
               nWords--;
               continue;
            }

            findIndPlayes[wordInd] = Array();
            searchInd = 0;
            //Находим/не находим слово в игроке и обозначаем индекс и необходимость показа
            db.data.forEach(function(item, dataInd) {
               str = '';
               for (var key in item) {
                  str += item[key]+' ';
               }
               str = str.toLowerCase();
               if (str.indexOf(search[wordInd]) + 1) {
                  //Если слово найдено но оно с минусов пропускаем этого игрока
                  if (sFlag == 2) temp = 0; else temp = 1;
                  findIndPlayes[wordInd][searchInd] = {
                     ind : dataInd,
                     show : temp
                  }
                  searchInd++;
               } else if (sFlag == 1) {
                  //Если не найдено слово в кавычках, показ запретить
                  findIndPlayes[wordInd][searchInd] = {
                     ind : dataInd,
                     show : 0
                  }
                  searchInd++;
               }
            });   
         }

         //Расставляем релевантность
         resInd = 0;
         //Проход по массивам индексов найденных слов в объектах игроков
         for (wordInd = 0; wordInd < findIndPlayes.length; wordInd++) {
            //Проход по результатам(индексам игроков)
            for (searchInd = 0; searchInd < findIndPlayes[wordInd].length; searchInd++) {
               isFlag = 0;
               //Проверка есть ли такой индекс в результате
               for (i = 0; i < resArr.length; i++) {
                  if (resArr[i].ind == findIndPlayes[wordInd][searchInd].ind) {
                     isFlag = 1;
                     break;
                  }
               }
               //Если индекса нет добавляем его к результату
               if (!isFlag) {
                  resArr[resInd] = {
                     ind : findIndPlayes[wordInd][searchInd].ind,
                     rel : 1,
                     show : findIndPlayes[wordInd][searchInd].show
                  }
                  resInd++;
               //Если индекс есть увеличиваем релевантность
               } else {
                  resArr[i].rel ++;
                  resArr[i].show *= findIndPlayes[wordInd][searchInd].show;
               }
            }
         }
         //Получили массив индексов с релевантностью

         //Сортируем массив по релевантности
         for (resInd = 0; resInd < resArr.length-1; resInd++) {
            if (resArr[resInd+1].rel > resArr[resInd].rel) {
               temp = resArr[resInd+1];
               resArr[resInd+1] = resArr[resInd];
               resArr[resInd] = temp;
               resInd = -1;
            }
         }

         //Выводим найденные результаты
         for (resInd = 0; resInd < resArr.length; resInd++) {
            if (resArr[resInd].show) {
               //Подсветка если точное совпадение
               if (resArr[resInd].rel == nWords) relClass = "full"; else relClass = "half";
               showPlayer(db.data[resArr[resInd].ind], relClass);
            }
         }
      }
   }

   //Очистка поля результатов
   var clearField = function () {
      jqueryMap.$field.empty();
   }

   //Показать блок информации о игроке
   var showPlayer = function (item, rel) {
      var tag, keyText, $itemList, $playerBlock, className;

      switch (rel) {
         case "full" : className = "fullRel"; break;
         case "half" : className = "halfRel"; break;
      }
      //Формирование списка по частям
      $playerBlock = $('<div>', {
         class : className
      });

      for (var key in item) {
         if (key != "id") {

            if (key == "name") {
               tag = '<h1>'; 
               keyText = "";
            } else { 
               tag = '<h3>';
               keyText = key + ': ';
            }
            $itemList = $(tag, {
               class : 'itemlist'
            });

            $itemList.text(keyText + item[key]);
            $playerBlock.append($itemList);
         }
      }
      jqueryMap.$field.append($playerBlock);
   }

   //Зададим карту jQuery
   var setJqueryMap = function () {
      var $container = stateMap.$container;
      jqueryMap.$search = $container.find('.search');
      jqueryMap.$search.append( configMap.search );
      jqueryMap.$search.searchString = $container.find('input[name=searchString]');
      jqueryMap.$search.searchString.keyup(keyUpHandler);
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