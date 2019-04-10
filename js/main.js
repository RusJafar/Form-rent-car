   jQuery(document).ready(function($){
	function ProductBuilder( element ) {
		this.element = element;
		this.stepsWrapper = this.element.children('.cd-builder-steps');
		this.steps = this.element.find('.builder-step');
		// сохраняем некоторые конкретные шаги строителя
		this.models = this.element.find('[data-selection="models"]'); 
		this.summary;
		this.optionsLists = this.element.find('.options-list');
		//bottom summary  // нижняя сводка
		this.fixedSummary = this.element.find('.cd-builder-footer');
		this.modelPreview = this.element.find('.selected-product').find('img');
		this.totPriceWrapper = this.element.find('.pass').find('b');
		this.totPriceWrapper1 = this.element.find('.time').find('b');
		this.totPriceWrapper2 = this.element.find('.fin_prise').find('b');
		this.inp = 0;
		this.price = 0;
		this.out_inf = 0;
		this.$liElements = 0;
		this.place = 0;
		/* this.start = this.element.find('.start').find('b');
		this.finish = this.element.find('.finish').find('b'); */
		
		
		////////////////////////////
		//this.inp = this.element.find('#contenInput').find('text').val;
		
		///console.log('Inp' + this.inp);
		
		//builder navigations // навигационные системы
		this.mainNavigation = this.element.find('.cd-builder-main-nav');
		this.secondaryNavigation = this.element.find('.cd-builder-secondary-nav');
		//used to check if the builder content has been loaded properly // используется для проверки правильности загрузки содержимого строителя
		this.loaded = true;
		
		// bind builder events  // связывать события компоновщика
		this.bindEvents();
		console.log("Run function ProductBuilder");/////Ok
	}
////////////////обнаружение клика////////////////////
	ProductBuilder.prototype.bindEvents = function() {
		var self = this;

		////////////////Клик на Верхнее меню////////////////////
		this.mainNavigation.on('click', 'li:not(.active)', function(event){
			event.preventDefault();
			self.loaded && self.newContentSelected($(this).index());
			console.log("Run bindEvents");
		});

		//detect click on bottom fixed navigation // обнаружение клика по фиксированной навигации внизу
		this.secondaryNavigation.on('click', '.nav-item li:not(.buy)', function(event){ 
			event.preventDefault();
			var stepNumber = ( $(this).parents('.next').length > 0 ) ? $(this).index() + 1 : $(this).index() - 1;
			self.loaded && self.newContentSelected(stepNumber);
			console.log("secondaryNavigations");
		});
		//detect click on one element in an options list (e.g, models, accessories) // обнаруживать щелчок по одному элементу в списке опций (например, модели, аксессуары)
		this.optionsLists.on('click', '.js-option', function(event){
			self.updateListOptions($(this));
			console.log("optionsLists");
			$('#foot_chege').css('background', '#d2e1f7');
		});
		//detect clicks on customizer controls (e.g., colors ...) / обнаруживать клики на элементах настройки (например, цвета ...)
		this.stepsWrapper.on('click', '.cd-product-customizer span', function(event){
			event.preventDefault();
			self.customizeModel($(this));
			console.log("stepsWrapper.on");
		});
		
			this.stepsWrapper.on('click', '.cd-product-customizer select', function(event){
			event.preventDefault();
			self.customizeModel($(this));
			console.log("stepsWrapper.on");
		});
	};
////////////////////////////обнаружение клика//////////////////////////////////



	ProductBuilder.prototype.newContentSelected = function(nextStep) {
		//first - check if a model has been selected - user can navigate through the builder // сначала - проверьте, была ли выбрана модель - пользователь может перемещаться по строителю
		if( this.fixedSummary.hasClass('disabled') ) {
			//no model has been selected - show alert  // не выбрана модель - показать предупреждение
			this.fixedSummary.addClass('show-alert');
		} else {
			//model has been selected so show new content 
			//first check if the color step has been completed - in this case update the product bottom preview
			// выбрана модель, чтобы показать новый контент.
			// сначала проверьте, завершен ли шаг цвета - в этом случае обновите предварительный просмотр продукта
			if( this.steps.filter('.active').is('[data-selection="accessories"]') & this.steps < 0 ) {
				//in this case, color has been changed - update the preview image // в этом случае цвет был изменен - обновите изображение предварительного просмотра
				var imageSelected = this.steps.filter('.active').find('.accessories-list').children('.selected').children('img').attr('src');
				this.modelPreview.attr('src', imageSelected);
			}
			//if Summary is the selected step (new step to be revealed) -> update summary content 
			// если Сводка - это выбранный шаг (новый шаг будет показан) -> Обновить итоговый контент
			if( nextStep + 1 >= this.steps.length ) { 
				this.createSummary();
			}
			
			this.showNewContent(nextStep);
			this.updatePrimaryNav(nextStep);
			this.updateSecondaryNav(nextStep);
		}
		///////////////////////Шаги конструктора по номерам////////////////
		console.log("+++newContentSelected"+this.steps.filter('.active').index() );
		var step_num = this.steps.filter('.active').index();
		if (step_num == 2){
			//alert('Второй шаг здесь');
			var filt_st = $(".stan_class");
			/* var data_price = filt_st.attr('data-price','5000');
			
			alert(data_price); */
			
			
			//filt_st.attr('hidden','hidden');
			
			
		}
		//Если нажимаем на кнопку "#standart" всем блокам с классом ".stan"
		//Фильтры на страницу выбора авто
		
		$('#standart').click(function (event) {
				event.preventDefault();
				var filt_st = $(".stan");
				var filt_bs = $(".bis");
				filt_bs.hide();
				filt_st.show();
				$('#standart').css("background-color","#013e9c");
				$('#bissnes').css("background-color","#2563c3");
				$('#all').css("background-color","#2563c3");
				
				$('#standart').css("color","#fdd79b");
				$('#bissnes').css("color","white");
				$('#all').css("color","white");
				
				return true;
			});

			$('#bissnes').click(function (event) {
				event.preventDefault();
				var filt_st = $(".stan");
				var filt_bs = $(".bis");
				filt_st.hide();
				filt_bs.show();
				$('#standart').css("background-color","#2563c3");
				$('#bissnes').css("background-color","#013e9c");
				$('#all').css("background-color","#2563c3");
				
				$('#standart').css("color","white");
				$('#bissnes').css("color","#fdd79b");
				$('#all').css("color","white");
				return true;
			});	
			$('#all').click(function (event) {
				event.preventDefault();
				var filt_st = $(".stan");
				var filt_bs = $(".bis");
				 filt_st.show();
				filt_bs.show();
				$('#standart').css("background-color","#2563c3");
				$('#bissnes').css("background-color","#2563c3");
				$('#all').css("background-color","#013e9c");
				
				$('#standart').css("color","white");
				$('#bissnes').css("color","white");
				$('#all').css("color","#fdd79b");
				return true;
			});	
		
	}

	
	
	ProductBuilder.prototype.showNewContent = function(nextStep) {
		var actualStep = this.steps.filter('.active').index() + 1;
		if( actualStep < nextStep + 1 ) {
			//go to next section
			this.steps.eq(actualStep-1).removeClass('active back').addClass('move-left');
			this.steps.eq(nextStep).addClass('active').removeClass('move-left back');
		} else {
			//go to previous section
			this.steps.eq(actualStep-1).removeClass('active back move-left');
			this.steps.eq(nextStep).addClass('active back').removeClass('move-left');
		}
	}

	ProductBuilder.prototype.updatePrimaryNav = function(nextStep) {
		this.mainNavigation.find('li').eq(nextStep).addClass('active').siblings('.active').removeClass('active');
	}

	ProductBuilder.prototype.updateSecondaryNav = function(nextStep) {
		( nextStep == 0 ) ? this.fixedSummary.addClass('step-1') : this.fixedSummary.removeClass('step-1');

		this.secondaryNavigation.find('.nav-item.next').find('li').eq(nextStep).addClass('visible').removeClass('visited').prevAll().removeClass('visited').addClass('visited').end().nextAll().removeClass('visible visited');
		this.secondaryNavigation.find('.nav-item.prev').find('li').eq(nextStep).addClass('visible').removeClass('visited').prevAll().removeClass('visited').addClass('visited').end().nextAll().removeClass('visible visited');
	}

	//////////////////////////////////////////////Итоговый шаг/////////////////////////////////////////
	ProductBuilder.prototype.createSummary = function() {
		var self = this;
		this.steps.each(function(){
			//this function may need to be updated according to your builder steps and summary
			// эта функция может нуждаться в обновлении в соответствии с вашими шагами строителя и сводкой
			var step = $(this);
			if( $(this).data('selection') == 'colors' ) {
				//create the Color summary // создаем сводку цвета
				var colorSelected = $(this).find('.accessories-list').find('li.selected'),
					color = colorSelected.children('a').data('color'),
					colorName = colorSelected.data('content');
					imageSelected = $(this).find('.accessories-list').find('.selected img').attr('src'),//Фото автомобиля//перенес добавление фото на событие выбора авто
				//console.log("AAAAAAAAAAAAA");
				self.summary.find('.summary-color').find('.color-label').text(colorName).siblings('.color-swatch').attr('data-color', color);
				self.summary.find('.product-preview').attr('src', imageSelected);
			} else  if( $(this).data('selection') == 'accessories' ) {
				var selectedOptions = $(this).find('.selected'),
				imageSelected = $(this).find('.accessories-list').find('.selected img').attr('src'),//Фото автомобиля
				optionsContent = '';
				console.log(selectedOptions);
				//Сверху код// добавил фото автомобиля на итоговую
				
				var	color = $(this).find('.accessories-list').find('.selected a').text(),
					colorName = $(this).find('.accessories-list').find('.selected a').data('color');
					$('.color-swatch').css('background', colorName);

				self.summary.find('.summary-color').find('.color-label').text(color).siblings('.color-swatch').attr('background', colorName);
				
				console.log("colorName=", colorName)
				console.log(color);
				if( selectedOptions.length == 0 ) {  
					optionsContent = 'Автомобиль не выбран';
				} else {
					selectedOptions.each(function(){
						optionsContent = $(this).find('p').text();//console.log($(this).find('p').text());
					});
				}

				self.summary.find('h3').text(optionsContent);
				self.summary.find('.product-preview').attr('src', imageSelected);////***********************
			
				self.summary.find('.summary-accessories').find('.time_travel').text('Маршрут трансфера:' + '   ' + self.out_inf);
				
				//Обработка события: если ничего не выбрано
				var totals_price = self.price ? self.price : 0;
				
				self.summary.find('.summary-accessories').find('.summ_travel').text('Стоимость трансфера: от' + '   ' + totals_price);
				
				$('#inp').val(self.out_inf);
				console.log('self.out_inf',self.out_inf+'');
				$('#price').val( totals_price );
				console.log(' self.price ', self.price+'' );
				$('#rent_car').val(optionsContent);
				
				
			}
		});
	}

	ProductBuilder.prototype.updateListOptions = function(listItem) {
		var self = this;
		
		if( listItem.hasClass('js-radio') ) {
			// это означает, что может быть выбран только один параметр (например, модели) - поэтому проверьте, есть ли другой параметр и отмените его выбор
			var alreadySelectedOption = listItem.siblings('.selected');
			self.price = (alreadySelectedOption.length > 0 ) ? -Number(alreadySelectedOption.data('price')) : 0;
			// если опция уже была выбрана и вы ее не выбрали - цена - это цена только что нажатой опции
			( listItem.hasClass('selected') ) 
				? self.price = -Number(listItem.data('price'))
				: self.price = Number(listItem.data('price')) + self.price;
			// теперь отменим выбор всех других параметров
			alreadySelectedOption.removeClass('selected');
			//toggle the option just selected
			listItem.toggleClass('selected');
			//update totalPrice - only if the step is not the Models step // update totalPrice - только если шаг не является Шагом Модели
			(listItem.parents('[data-selection="models"]').length == 0) && self.updatePrice(price);
		} else {
			var alreadySelectedOption1 = listItem.siblings('.selected');
				//price = (alreadySelectedOption1.length > 0 ) ? Number(alreadySelectedOption1.data('price')) : 0;
				self.price = alreadySelectedOption1.find('span#'+self.inp).html();
			( listItem.hasClass('selected') ) 
				self.price = listItem.find('span#'+self.inp).html();
				self.place = parseInt(listItem.find('b').html());
			alreadySelectedOption1.removeClass('selected');
			//toggle the option just selected
			listItem.toggleClass('selected');
			console.log("Place" +  self.place);
			/* $('inp_place input').attr('max', self.place); */
			$('.cd-step-content').find('.inp_place').attr('max', self.place);
			$('.cd-step-content').find('.inp_place').attr('placeholder', 'Не более'+ ' ' + self.place + ' ' + 'пассажиров');
			//update totalPrice
			//self.updateWayPrice(price);
			self.updateFinPrice(self.price);
		}
		
		if( listItem.parents('[data-selection="models"]').length > 0 ) {
			//since a model has been selected/deselected, you need to update the builder content
			self.updateModelContent(listItem);
		}
	};
///////////////////////////////////////////////////////////Ajax запрос для смены уонтента/////////////////
	ProductBuilder.prototype.updateModelContent = function(model) {
		var self = this;
		if( model.hasClass('selected') ) {
			var modelType = model.data('model'),
				modelImage = model.find('img').attr('src');
			//need to update the product image in the bottom fixed navigation
			this.modelPreview.attr('src', modelImage);
			// необходимо обновить содержимое строителя в соответствии с выбранным продуктом
			// сначала - удалите контект, который относится к другой модели
			this.models.siblings('li').remove();
			//second - load the new content  // second - загрузить новый контент
			$.ajax({
		        type       : "GET",
		        dataType   : "html",
		        url        : modelType+".html",
		        beforeSend : function(){
		        	self.loaded = false;
		        	model.siblings().removeClass('loaded');
		        },
		        success    : function(data){
		        	self.models.after(data);
		        	self.loaded = true;
		        	model.addClass('loaded');
		        	//activate top and bottom navigations
		        	self.fixedSummary.add(self.mainNavigation).removeClass('disabled show-alert');
		        	//update properties of the object
					self.steps = self.element.find('.builder-step');
					self.summary = self.element.find('[data-selection="summary"]');
					//detect click on one element in an options list
					self.optionsLists.off('click', '.js-option');
					self.optionsLists = self.element.find('.options-list');
					self.optionsLists.on('click', '.js-option', function(event){
						self.updateListOptions($(this));
					});

					//this is used not to load the animation the first time new content is loaded
					self.element.find('.first-load').removeClass('first-load');
		        },
		        error     : function(jqXHR, textStatus, errorThrown) {
		            //you may want to show an error message here
		        }
			});

			//update price (no adding/removing)
			this.totPriceWrapper.text(model.data('price'));
		} else {
			//no model has been selected
			this.fixedSummary.add(this.mainNavigation).addClass('disabled');
			//update price
			this.totPriceWrapper.text('0');

			this.models.find('.loaded').removeClass('loaded');
		}
	};
/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////Шаг выбора направления трансфера////////////////////////////
	ProductBuilder.prototype.customizeModel = function(target) {
		//this.updatePrice('');
		var self = this;
		//this.inp = Number(this.element.find('#contenInput').find('text'));
		var car_remove = 0;//переменая для хранения обекта html
		$('#contenInput').on("change", function()
		{
		self.$liElements = $('ul.accessories-list li.js-option').find('span').hide();//Скрыть все цены
		self.out_inf = $('#contenInput option:selected').html(); //Взять выбранный текст и селектра
		self.inp = $('#contenInput option:selected').val() + ''; //Взять значение выбрынногго селектра
		var way = self.out_inf.split('-');
		var st = way[0];
		var fin = way[1];
		var start = $('.start').find('p').text(st);
		var start = $('.finish').find('p').text(fin);
		$(".coll_me").hide();
			$(".coll_me_bt").hide();
		
		//Удаляем обьекты с пустым полем цен для напрвлений: 5 6 7 8 9
		if (self.inp ==  '5' || self.inp == '6' || self.inp == '7' || self.inp == '8' || self.inp == '9' ){
		 car_remove = $('.rem_class').remove(':contains("noway")');//сохраняем в переменную обьект и удаляем его с html
		 //console.log('dckjndcdkcnscndsn',car_remove);
		}
		else if (car_remove.length > 0 ){
			car_remove.appendTo('.accessories-list');//возвращаем обьект на страницу из переменной
			car_remove = 0;
			
		}else if(self.inp ==  '10' || self.inp == '0' ){
			$(".coll_me").show();
			$(".coll_me_bt").show();
			st = '';
			fin = '';
			self.out_inf = st + '-' + fin;
			self.updatePrice(self.out_inf);
			var start = $('.start').find('p').text(st);
		var start = $('.finish').find('p').text(fin);
			
		}
		self.out_inf = st + '-' + fin;
		self.updatePrice(self.out_inf);
	
		self.$liElements = $('ul.accessories-list li.js-option').find('span#' + self.inp).show();
		
			
			$('.chenge').on("click", function()
				{
					var cang_var = st;
					st = fin;
					fin = cang_var;
					var start = $('.start').find('p').text(st);
					var start = $('.finish').find('p').text(fin);
					self.out_inf = st + '-' + fin
					self.updatePrice(self.out_inf);	
				});

			
			
			return false;
		});	
		
		

};
		
	ProductBuilder.prototype.updateWay = function(st) {	
		
		this.start.text(st);
		
		console.log(self.start);
	
			
			/* //Количество автомобилей в списке
			 var id_index = this.inp * '';
			console.log('id_index',id_index);
			var $liElements = $('ul.accessories-list li.js-option').find('span id.'+id_index).html();
			console.log('$liElements',$liElements);  */
			
			
	};

	ProductBuilder.prototype.updatePrice = function(price) {
		var actualPrice = price;
		this.totPriceWrapper1.text(actualPrice);
	};
	ProductBuilder.prototype.updateWayPrice = function(price) {
		var actualPrice = Number(price);
		this.totPriceWrapper1.text(actualPrice);
	};
	ProductBuilder.prototype.updateFinPrice = function(price) {
		
		var actualPrice = price;
		this.totPriceWrapper2.text( actualPrice); //'<small class="ot">от</small>' +
		
	};

	if( $('.cd-product-builder').length > 0 ) {
		$('.cd-product-builder').each(function(){
			//create a productBuilder object for each .cd-product-builder
			new ProductBuilder($(this));
		});
	}

});



