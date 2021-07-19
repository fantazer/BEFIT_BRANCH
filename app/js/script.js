$(document).ready(function () {

	var body = $('body')

	// watch window resize
	var windowSize = $(window).width()
	$(window).resize(function(){
		windowSize = $(window).width();
		return windowSize;
	});
	// watch window resize === end

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth= window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight:scrollWidth
			});

		}
		modalState.isMofdalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight:0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function(){
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		},600);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();

		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.js-modal-close, .modal-hide').click(function () {
		closeModal();
	});

	$(document).on('keyup',function(e){
		e.key === 'Escape' ? closeModal() : ''
	})

	$('.modal-wrap').click(function(e){
		e.target.className === 'modal-wrap' ? closeModal() : false
	});

	//modal msg
	var showModalMsg = function(current,time){
		$('.modal-msg').removeClass('active')
		setTimeout(function(){
			$('.modal-msg[data-modalMsg=' + current + ']').addClass('active')
			//console.log(11);
		},time)
	}
	//modals===end



	// toggle single
	body.on('click','.js-toggle',function(){
		$(this).toggleClass("active")
	})
	// toggle single === end

	// slide toggle
	body.on('click','.js-slide',function(){
		$(this).toggleClass('active')
		$(this).closest('.js-slide-wrap').toggleClass('active').find('.js-slide-cont').slideToggle(500);
	});
	// slide toggle === end

	// toggle class one from list
	var actionTick;
	(
		actionTick = function(){
				$('body').on('click','.js-tick',function(){
					var parent = $(this).closest('.js-tick-cont');
					parent.find('.js-tick').removeClass('active');
					$(this).addClass('active')
				});
			}
	)()
	// toggle class one from list === end

	//toggle class + neighbor
	body.on('click','.js-commutator-el', function(){
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		}else{
			selector = $(".js-commutator-cont");
		}
		selector.each(function(){
			if($(this).data("item")=== thisItem){
				$(this).toggleClass('active');
			}else{
				isEach ? $(this).removeClass("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	// switch
	body.on('click', '.js-switch', function (e) {
		if (e.target.className != 'style-input') {
			var typeItem = $(this).data("item");
			var hasParent = $(this).closest('.js-switch-wrap').length
			if (hasParent < 1) {
				var groupItem = $(this).data("group");
				var selector = $('.js-switch[data-group=' + groupItem + ']');
				var size = selector.size()
				selector.each(function () {
					$(this).removeClass("active");
				});
				$('.js-switch-cont').each(function () {
					var hasParentInner = $(this).closest('.js-switch-wrap').length
					if ($(this).data("group") === groupItem && $(this).data("group") != undefined) {
						console.log('inner');
						if ($(this).data("item") === typeItem) {
							if (size === 1) {
								$(this).toggleClass("hidden")
							} else {
								$(this).removeClass("hidden")
							}
						} else {
							$(this).addClass("hidden");
						}
					} else {
						if ($(this).data("item") === typeItem) {
							$(this).toggleClass("hidden");
						}
					}
				});
			} else {
				var parent = $(this).closest('.js-switch-wrap');
				parent.find('.js-switch').filter(function() {
						return $(this).closest('.js-switch-wrap').not(parent).length < 1
				}).removeClass('active')
				parent.find('.js-switch-cont').each(function () {
					if ($(this).data("item") === typeItem) {
						$(this).removeClass("hidden")
					} else {
						$(this).addClass("hidden");
					}
				});
			}
			$(this).addClass("active");
		}
	});
	// switch === end

	// toggle program types list
	var actionTab;
	(
		actionTab = function(){
			$('body').on('click','.js-tab',function(){
				var current = $(this).index();
				var parent = $(this).closest('.js-tab-wrap')
				parent.find('.js-tab-cont').removeClass('active')
				parent.find('.js-tab-cont').eq(current).addClass('active')
			});
		}
	)()
	// toggle program types list  === end

	// accordion row toggle
	body.on('click','.js-accordion-head', function(e){
		var current = $(this).closest('.js-accordion-el').index()
		$(this).closest('.js-accordion').find('.js-accordion-el').each(function(){
			if($(this).index()!=current){
				 $(this).find('.js-accordion-head').removeClass('active')
				 $(this).find('.js-accordion-content').slideUp('active')
			}else{
				 $(this).find('.js-accordion-content').slideToggle('active')
				 $(this).find('.js-accordion-head').toggleClass('active')
			}
		})
	});
	// accordion row toggle === end

	// dropdown
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	});
	$('.dropdown').focusout(function (e) {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	});
	$('.dropdown .dropdown-menu__el').click(function (e) {
		if($(e.target).closest('a').length){
			e.stopPropagation();
		}
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	// dropdown === end

	// animate placeholder
	$('.input').each(function(){
		var current = $(this);
		if(current.data('placeholder')){
		var dataString = "<span class='input-placeholder-val'>"+current.data('placeholder')+"</span>";
			current.after(dataString);
			if ($(this).val()){
				$(this).attr('data-empty', !this.value);
			}
		}
	});

	$('.input').on('input', function (e) {
		$(e.currentTarget).attr('data-empty', !e.currentTarget.value);
	});

	$('.input-placeholder-val').click(function(){
		$(this).parent().find('.input').focus(); //найти Input и повесить focus
	});
	// animate placeholder === end

	// === slick ===

	// slider pagination
	$('.js-slider-pagination').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	  var i = (currentSlide ? currentSlide : 0) + 1;
	  $(this).closest('.slider-wrap').find('.number-slide').text(i + ' / ' + slick.slideCount);
	});
	// slider pagination === end
	
	// main slider mobile bg

	var mainSliderColorArray = [];
	$('.slider-main .board__el').each(function(){
		var currentColor = {}
		currentColor.name = $(this).attr("class").split(/\s+/)[1]
		currentColor.val = $(this).css("backgroundColor")
		mainSliderColorArray.push(currentColor)
	})
	//console.log(mainSliderColorArray);

	$('.slider-main').on('init setPosition', function (event, slick, currentSlide, nextSlide) {
	 $(this).find('.slider-el-wrap').each(function(){
	 		if($(this).hasClass('slick-active')){
	 		var currentClass = $(this).find('.board__el').attr("class").split(/\s+/)[1]
	 		var currentColor = mainSliderColorArray.filter(
	 			function(item) {
	 				return item.name == currentClass
	 			})[0]

	 		$('.slider-main .board__el').add(".slider-main").css('backgroundColor',currentColor.val)
	 		
	 		}
	 	});
	});

	// main slider mobile bg === end
	
	// main slider
	$('.slider-main').slick({
		slidesToShow: 1,
		speed: 200,
		dots:false,
		arrows:false,
		rows:0,
		fade:true,
		responsive: [
			{
				breakpoint: 800,
					settings: {
						fade:false,
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 1,
						speed: 800
				}
			}
		]
	});
	// main slider === end

	// main slider
	$('.slider-lk').slick({
		slidesToShow: 1,
		speed: 800,
		dots:false,
		arrows:false,
		fade:true,
		responsive: [
			{
				breakpoint: 640,
					settings: {
						slidesToShow: 1.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,
						fade:false,
				}
			}
		]
	});
	// main slider === end

	// review slider
	$('.slider-review').slick({
		slidesToShow: 4,
		speed: 800,
		dots:false,
		arrows:false,
		rows:0,
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 3.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 769,
					settings: {
						slidesToShow: 2.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 640,
					settings: {
						slidesToShow: 1.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			}
		]
	});
	// review slider === end

	// review slider
	$('.slider-press').slick({
		slidesToShow: 6,
		speed: 800,
		dots:false,
		arrows:false,
		rows:0,
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 769,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 640,
					settings: {
						slidesToShow: 2.5,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			}
		]
	});
	// review slider === end

	// === custom arrow el ===
	$('.js-control-right').click(function(){
		$(this).closest(".js-slider-wrap").find(".js-slider").slick('slickNext');
	});

	$('.js-control-left').click(function(){
		$(this).closest(".js-slider-wrap").find(".js-slider").slick('slickPrev');
	});
	// custom arrow el === end

	// === slick === end

	// animate scroll to id
	$(".js-scroll-to").mPageScroll2id({
		offset:0,
	});
	// animate scroll to id === end

	// drop click on contract
	body.on('click','.js-contract-el', function(e){
		$(this).find('input[type="radio"]').prop('checked', true);
	});
	// drop click on contract === end*/

	// slide menu
	body.on('click','.js-slide-block-toggle', function(event){
		$(".js-slide-block-toggle").not(this).removeClass('slide-block-toggle--open');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("slide-block--open")
			} else {
				$(this).removeClass("slide-block--open")
			}
		})
		$(this).toggleClass('slide-block-toggle--open');
	});
	// slide menu === end
	
	
	// toggle contract full view
	body.on('click','.js-config-head', function(event){
		var parent = $(this).closest('.js-config');
		parent.toggleClass('active')
		parent.find('.js-contract-config-wrap').slideToggle();
	});
	// toggle contract full view === end

	// copy code
	$('.js-copy').click(function(){
		$(this).addClass('active')
		var valueCode = $(this).find('.js-copy-val')
		valueCode.select()
		document.execCommand("copy");
	});
	// copy code === end

	// animate sort
	if($('.blog-list').length > 0){
		var mixer = mixitup('.blog-list', {
				selectors: {
						target: '.blog-el'
				},
				animation: {
						duration: 500,
						effects: 'fade'
				}
		});
	}
	// animate sort === end
	
	// init fancybox
	$('.fancybox').fancybox();
	// init fancybox === end

	//upload-btn
	$(".upload-btn").change(function () { //Если выбрал файл
		//console.log('img');
		if (this.files && this.files[0].size < 655360) {
			var uploadList = $(this).closest('.upload-wrap').find('.upload-list');
			if(!$(this).data('group')){
				uploadList.empty()
			}
			uploadList.append('<div class="upload-list__el" onclick="this.parentNode.removeChild(this);"><svg class="icon"><use xlink:href="#close"></use></svg><span></span></div>');
			var currentUpload = $('.upload-list .upload-list__el:last').find('span'); //выбираем куда
			currentUpload.text(this.files[0].name);
			$('.js-upload-msg').addClass('validate-msg--error');
		} else{
			$('.js-upload-msg').removeClass('validate-msg--error');
		}
		console.log(this.files[0].size);
	});
	//upload-btn
	
	// horizontal scroll
	if(windowSize>1025){
		$(".js-horizontal-scroll").mousewheel(function(event, delta) {
				//this.scrollLeft -= (delta * 30);
				return (this.scrollLeft-=(delta * 40))!=this.scrollLeft
		 });
   }
	// horizontal scroll === end

	// edit history
	//TODO SET PRETTY THIS CODE
	var btnToDefault = function(parent){
		parent.find('.js-history-edit').removeClass('active');
		parent.find('.btn-menu').slideUp(200)
	}
	body.on('click','.js-history-edit', function(){
		var current = $(this)
		var notCurrent = $('.js-history-edit').not(this)

		notCurrent.removeClass('active')
		notCurrent.closest('.btn-menu-wrap').find('.btn-menu').slideUp(200)

		current.toggleClass('active');
		current.closest('.btn-menu-wrap').find('.btn-menu').slideToggle(200)
	});
	body.on('click','.btn-menu__el', function(event){
		var parent = $(this).closest('.btn-menu-wrap')
		btnToDefault(parent);
	});
	$(document).mouseup(function (e) {
		var parent = $(".btn-menu-wrap");
		if (!parent.is(e.target) && parent.has(e.target).length === 0) {
			btnToDefault(parent);
		}
	});
	// edit history === end

	// chart
	$(".chart").circleProgress({
		animation: true,
		size: 160,
		startAngle: -1.6,
		lineCap: 'round',
		thickness: 10,
		fill: 'white',
		emptyFill: "#ffffff80"
	});
	// chart === end

	// history panel slideToggle
	body.on('click','.history-panel-toggle', function(){
		$(this).closest('.history-list-el').find('.history-wrap').slideToggle()
	})
	// history panel slideToggle === end

	// incr
	var incrEl = {}
	$('body').on('click', '.incr__nav', function (e) {
		incrEl.parent = $(this).closest(".incr");
		incrEl.value = parseInt(incrEl.parent.find('.incr__val span').html());
		incrEl.state = incrEl.parent.find('.incr__val span')
		incrEl.min = incrEl.parent.data('min')*1 || 0
	});
	$('body').on('click', '.incr__minus', function (e) {
		incrEl.value = incrEl.value <= incrEl.min ? incrEl.min : --incrEl.value
		incrEl.state.html(incrEl.value);
	});
	$('body').on('click', '.incr__plus', function (e) {
		++incrEl.value;
		incrEl.value = incrEl.value > 100 ? 100 : incrEl.value;
		incrEl.state.html(incrEl.value);
	});
	// incr === end

	// rating size
	$('.rating').each(function(){
    var sizeRating  = $(this).data('size')*1;
    var totalRating = (sizeRating * 100) / 5 + '%'
    $(this).find('.rating--fill').css('width','calc('+totalRating+' - 2.5px')
	})
	// rating size === end

	// range slider
	if($('.js-sale-range').length){
			
			var rangeConfig = $(".js-sale-range").data('config');
			var listSize = [];
			rangeConfig.forEach(function(el){
				listSize.push(el.value)
			})
			console.log(listSize);
			var rangeSalePercent = $('.js-sale-calc-total__val')
			var rangeSaleCost = $('.js-sale-calc-total__cost')
			//var rangeCountPerson = $('.js-sale-calc-total__cost')
		 $(".js-sale-range").ionRangeSlider({
			prefix: "<span class='msg-range-icon'><svg class='icon'><use xlink:href='#userGroup'></use></svg></span>От ",
			postfix: "-х",
			from:0,
			values: listSize,
			to_fixed: true,
			onChange: function (data) {
				rangeConfig.forEach(function(item){
					if(item.value == data.from_value){
						rangeSalePercent.text(item.sale);
						rangeSaleCost.text(item.cost);
					}
				})
			},
		})
	}
	// range slider === end
	
	//  filter list
	body.on('click','.js-filter-result__el', function(){
		$(this).remove()
	});

	/*body.on('click','.js-filter-list-el', function(){
		$(this).closest('.js-filter-list').addClass('hide');
		var filterValue = $(this).text();
		$(this).closest('.js-filter-wrap').find('.filter-result').append('<div class="filter-result__el js-filter-result__el"><span>'+filterValue+'</span><svg class="icon"><use xlink:href="#close"></use></svg></div>')
	});*/

	$(document).mouseup(function (e) {
		var parrent = $(".filter-item");
		if (!parrent.is(e.target) && parrent.has(e.target).length === 0) {
			$('.filter-list').addClass('hide');
		}
	});
	//  filter list === end

	// set mark
	body.on('click','.js-mark', function(){
		$(this).closest('.js-mark-wrap').find('.js-mark').removeClass('active');
		$(this).addClass('active');
		var sizeMark = $(this).prevAll('.js-mark').addClass('active').length
		var msgMark = $(this).closest('.js-mark-wrap').find('.js-mark-msg')
		if(sizeMark<1){
			msgMark.removeClass('hidden')
		}else{
			msgMark.addClass('hidden')
		}
	});
	// set mark === end

	// countDown
	if ($('.js-timer').length > 0 && false)  {
		var declOfNum = function(n, textType) {
				n = Math.abs(n) % 100; var n1 = n % 10;
				if (n > 10 && n < 20) { return textType[2]; }
				if (n1 > 1 && n1 < 5) { return textType[1]; }
				if (n1 == 1) { return textType[0]; }
				return textType[2];
		}

		var timeVal = $('.js-timer').data('time');
		var endTime = new Date(timeVal);
		endTime = (Date.parse(endTime) / 1000);

		var makeTimer = function() {
			var now = new Date();
			now = (Date.parse(now) / 1000);
			var timeLeft = endTime - now;
			var days = Math.floor(timeLeft / 86400);
			var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
			var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
			var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

			if (hours < "10") {
				hours = "0" + hours;
			}
			if (minutes < "10") {
				minutes = "0" + minutes;
			}
			if (seconds < "10") {
				seconds = "0" + seconds;
			}

			days*1 < 0 ? $('.js-promo-cont').addClass('hidden') : ""

			$(".js-timer__el-day").html(days);
			$(".js-timer__el-day-name").html(declOfNum(days,['день','дня','дней']));

			$(".js-timer__el-hour").html(hours);
			$(".js-timer__el-hour-name").html(declOfNum(hours,['час','часа','часов']));

			$(".js-timer__el-min").html(minutes);
			$(".js-timer__el-min-name").html(declOfNum(minutes,['минута','минуты','минут']));

			$(".js-timer__el-sec").html(seconds);
			$(".js-timer__el-sec-name").html(declOfNum(seconds ,['секунда','секунды','секунд']));

			$('.timer-dot').toggleClass('hideOpacity')
		}
		if(days*1>0){
			setInterval(function () {
				makeTimer();
			}, 1000);
		}
	}
	// countDown === end

	// paralax
	if ($('.paralax-el').length > 0 && windowSize>1023) {
		$(window).scroll(function() {
			$('.paralax-el').each(function(){
				var depth = - $(window).scrollTop() / $(this).data('depth')*1;
				//depth = depth || 40
				$(this).css({
					"-webkit-transform" : "translate3d(0px, " + depth  + "%, 100px)",
				});
			})
		})
	}
	// paralax === end

	// phone mask
	var isFieldStart = true;
	var phoneMaskOption = {
		'translation': {
    	A: {
    		pattern: /[7,8]/,
    		fallback:'7',
    	},
		},
		onKeyPress: function (cep, event, currentField, options) {
			//console.log("key PRESS");
			if (cep == '+7(8' && isFieldStart) {
				$('.input-mask--phone').val("+7(")
				//return isFieldStart = false;
			}
			if (cep.indexOf("+8") == 0 && isFieldStart) {
				//console.log(0);
				$('.input-mask--phone').val(cep.replace("+8(",'+7('))
				//return isFieldStart = false;
			}
			if (cep == '+8' && isFieldStart) {
				$('.input-mask--phone').val("+7")
				//console.log(cep);
				//return isFieldStart = false;
			}

			if (currentField.val().length < 4) {
				isFieldStart = true
			}
		},

	}
	/*$('.input-mask--phone').bind('paste', function(e) {
			$(this).unmask()
			var data = e.originalEvent.clipboardData.getData('Text');
			 $(this).val(data.replace(new RegExp('\\+7\\(|8\\(|8', 'g'),"")).mask('+7(000)000-00-00', phoneMaskOption);
		});*/

	$('.input-mask--phone').on('change', function(e) {
			//console.log("change");
			$(this).unmask()
			var data = e.target.value
			//console.log(e.target);
			//console.log("reg",data.replace(new RegExp('\\+7\\(|8\\(|\\+7|8', 'g'),""));
			var reg = data.replace(new RegExp('\\+7\\(|8\\(|\\+7|^[8]', 'g'),"")
			//console.log("data",data);
			//console.log("reg",reg);
			 $(this).val(reg).mask('+7(000)000-00-00', phoneMaskOption);
		})

	$('.input-mask--phone').mask('+A(000)000-00-00', phoneMaskOption);
	// phone mask === end


	// animate show card
/*	var $cardItem = $('.program-el')
	var $cardItemFirstHeight;
	$('.program-days__el').click(function(){
		$cardItem.closest('.program-list').css('min-height', $cardItem.height())
			$cardItem.removeClass('is-animated')
		.fadeOut().finish().promise().done(function () {
		$cardItem
			.each(function (i) {
				$(this).delay((i++) * 120).fadeIn().addClass('is-animated');
			});
	})
	});*/

	// animate show card === end

	// fix top-menu
	var stopShrinkStar
	var stopShrinkEnd
	var calcShrinkExtends = function(){
		if ($('.js-stopShrink').length > 0) {
			stopShrinkStart = $('.js-stopShrink').offset().top
			stopShrinkEnd = $('.js-stopShrink').offset().top + $('.js-stopShrink').height()
		}
	}
	setTimeout(function () {
		var shrinkHeader = 150;
		var head = $('.js-header');
		if ($('.js-stopShrink').length > 0) {
			calcShrinkExtends()
			//console.log("stopShrinkStart", stopShrinkStart);

		var heightHeader = head.height();
		$(window).scroll(function () {
			var scroll = $(this).scrollTop();
			//console.log("scroll", scroll);
			if (scroll >= shrinkHeader) {
				$('body').css('paddingTop', heightHeader);
				head.addClass('shrink');
			} else {
				$('body').css('paddingTop', 0);
				head.removeClass('shrink');
			}

			if (scroll > stopShrinkStart - heightHeader && scroll < stopShrinkEnd + heightHeader) {
				$('body').css('paddingTop', 0);
				head.removeClass('shrink');
			}
		});
		}
	}, 0)
	// fix top-menu === end


	window.condition = {};
	window.condition.closeModal = closeModal
	window.condition.initModal = initModal
	window.condition.calcShrinkExtends = calcShrinkExtends
	window.condition.showModalMsg = showModalMsg
	//window.condition.showModalMsg("modalMsgPromoCode",200)
});
