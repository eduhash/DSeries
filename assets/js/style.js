//팝업  또는 sldWrap을 브라우저 중앙에 위치시킴
function popTopPosition(obj){
	var wHeight = $(window).height();
	var contHeight = obj.outerHeight();

	if(wHeight <= contHeight){
		//브라우저 크기가 팝업 사이즈 보다 작을 경우 팝업 위치를 top:15px에 고정
			obj.css({
				'top': '15px'
			});
	} else {
		//브라우저 크기가 팝업 사이즈 보다 클 경우 팝업을 브라우저 중앙에 고정
			obj.css({
				'top': (wHeight/2) - (contHeight/2)
			});
	}
}

//버튼 클릭 시 팝업을 호출
function popOpen(popup){
	$('body').attr('style','');
	var posY = $(window).scrollTop();

	$('.'+ popup).fadeIn(100);

	setTimeout(function(){
		popTopPosition($('.'+ popup +' .dp-popWrap'));
	}, 0);

	$('.'+ popup).addClass('open').find('.dim').show();
	$('body').addClass('bodyFixed').css('top', -posY);

	var objPopWrap = $('.'+ popup +' .dp-popWrap');

	$(window).resize(function(){
		setTimeout(function(){
			//var windowHeight = $(window).height();
				popTopPosition(objPopWrap);
		}, 0);
	});
}

//팝업 내 닫기 버튼 클릭 시 팝업을 닫음
//팝업 열기 전의 바디스크롤 위치를 계산하여, 팝업을 열었다가 닫았을때 바디스크롤이 원래 위치로 돌아오게 함
function popClose(e){
	var posTop = Math.abs(parseInt($('body').css('top')));
	$('body').removeClass('bodyFixed').css('top', 0);
	$(window).scrollTop(posTop);
	e.parents('.dp-popFixedWrap').removeClass('open').fadeOut(300);
}

// 필수 사항 모두 선택 했는지 체크하고, 다음 버튼 활성화
function confirmChkList(chkList, chkBtnOn, btnReset){

 	$(chkList).on('click change focus blur keyup', function(){
			var $selectMustLength = $('.dp-selectMust').find("select").length;//3개
			var $selectedMustLength = $('.dp-selectMust').find("select option[value!='']:selected").length;
			var $chkMustLength = $('.dp-chkMust').length; //1개
			var $chkMustChkedLength = $('.dp-chkMust input[type="radio"]:checked').length;

			if($selectedMustLength == $selectMustLength && $chkMustLength == $chkMustChkedLength){
				turnOnBtn(chkBtnOn);
			} else{
				turnOffBtn(chkBtnOn);
			}
 });
	$(btnReset).on('click', function(){
		$('.dp-selectMust').find("select option[value!='']:selected").removeAttr("selected");
		$('.dp-selectMust').removeClass('checkTrue');
		$('.dp-chkMust input[type="radio"]:checked').removeAttr("checked");
		$('.dp-filter01-label').removeClass('checkTrue');
		turnOffBtn(chkBtnOn);
	});

}

//다음 버튼 활성화, active 클래스 추가 disabled 해제
function turnOnBtn(chkBtnOn){
	$(chkBtnOn).removeClass('disabled').addClass('active').attr('disabled', false);
}

//다음 버튼 비활성화, active 클래스 제거 disabled 설정
function turnOffBtn(chkBtnOn){
	$(chkBtnOn).removeClass('active').addClass('disabled').attr('disabled', true);
}

// 셀렉트 박스 선택 시 dp-select01 클래스에 checkTrue클래스 추가
function checkOptionSelected(selectEl){
	selectEl.on('change focus blur', function(){
    if($(this).find(':selected').val().length > 0) {
			$(this).parents('.dp-select01').addClass('checkTrue');
		} else {
			$(this).parents('.dp-select01').removeClass('checkTrue');
		}
	});
}

//라디오 버튼 선택 시 checkTrue 클래스 추가
function checkRadioChecked(chkedRadio){
	chkedRadio.on('click', function(){
		if($(this).parents('.dp-chkList').find(':checked').length > 0) {
			$(this).parents('.dp-chkList').find('.dp-filter01-label').removeClass('checkTrue');
			$(this).parents('.dp-filter01-label').addClass('checkTrue');
		}else {
			$(this).parents('.dp-filter01-label').removeClass('checkTrue');
		}
	});
}

function navToggle(btn){
	btn.on('click', function(){
		var parent = btn.parents('.dp-left-nav');
		if(parent.css('left')!= '0px'){
			btn.addClass('active');
			btn.parents('.dp-left-nav').css('left','0');
		}else if(parent.css('left')== '0px') {
			btn.removeClass('active');
			btn.parents('.dp-left-nav').css('left','-220px');
		}
	});
}

//슬라이더 swiper.js 플러그인으로 구현(자동재생, 페이저, 버튼)
function autoplaySwiper(slider){
	setTimeout(function() {
		var mySwiper = new Swiper(slider, {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			loop : true,
			loopFillGroupWithBlank: true,
			autoplay: {
				delay: 5000,
			},
			autoplayDisableOnInteraction: false,
			speed: 400,
			breakpoints: {
		    // when window width is <= 320px
		    320: {
		      slidesPerView: 1,
		      spaceBetween: 20
		    },
		    // when window width is <= 480px
		    480: {
		      slidesPerView: 2.5,
		      spaceBetween: 20
		    },
		    // when window width is <= 640px
		    640: {
		      slidesPerView: 3.5,
		      spaceBetween: 30
		    }
		  }
		});
	}, 0);
}

function mainBannerSwiper(slider){
	setTimeout(function() {
		var mySwiper = new Swiper(slider, {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			// loop : true,
			// loopFillGroupWithBlank: true,
			// autoplay: {
			// 	delay: 5000,
			// },
			// autoplayDisableOnInteraction: false,
			// speed: 400,
		});
	}, 0);
}

function tabWrap(){
    var tabLi = $('.dp-mydata-tab-wrap .tab li');

    $('.dp-mydata-tab-wrap .tabCon').hide();
    $('.dp-mydata-tab-wrap .tabCon.first').show();

    tabLi.click(function(e){
        e.preventDefault();
        var $this = $(this);
        var $tabCon = $this.parents('.tab').siblings('.tabCon');
        var $thisIndex = $(this).index();
        $this.siblings('li').removeClass('on');
        $this.addClass('on');
        $tabCon.hide();
        $tabCon.eq($thisIndex).show();
    });
}

function counterUpNumber(){
	$('.dp-counterup').counterUp();
}

function movingClock(){
	function Horloge() {
	  var laDate = new Date();
		if(laDate.getHours() < 10) {
			var hours = "0" + laDate.getHours();
		}
		else {
			var hours = laDate.getHours();
		}
		if(laDate.getHours() < 12) {
			var hpercent = laDate.getHours()/12*360;
		}
		else {
			var hpercent = (laDate.getHours()-12)/12*360;
		}
		$('.h-aiguille').css('transform', 'rotate(' + hpercent + 'deg)');
		if(laDate.getMinutes() < 10) {
			var minutes = "0" + laDate.getMinutes();
		}
		else {
			var minutes = laDate.getMinutes();
		}
		if(laDate.getSeconds() < 10) {
			var seconds = "0" + laDate.getSeconds();
		}
		else {
			var seconds = laDate.getSeconds();
		}
		var spercent = laDate.getSeconds()/60*360;
		$('.s-aiguille').css('transform', 'rotate(' + spercent + 'deg)');
	   var h = hours + ":" + minutes + ":" + seconds;
		$('.hour').text(h);
		var mpercent = minutes/60*360;
		$('.m-aiguille').css('transform', 'rotate(' + mpercent + 'deg)');
	}
	setInterval(Horloge, 1000);
}

$(function(){

	if($('.dp-mobile-menu-btn').length > 0){
		navToggle($('.dp-mobile-menu-btn'));
	}

	if($('.dp-chkList').length > 0){
		confirmChkList('.dp-chkList', '.dp-chkBtnOn', '.dp-filter-btn-reselect');
	}

	if($('.dp-selectMust').length > 0){
		checkOptionSelected($('.dp-selectMust select'));
	}

	if($('.dp-filter01-list').length > 0){
		checkRadioChecked($('.dp-filter01-list input'));
	}

	if($('.dp-untact-lecture-swiper').length > 0){
		autoplaySwiper('.dp-untact-lecture-swiper');
	}

	if($('.dp-main-banner-swiper').length > 0){
		mainBannerSwiper('.dp-main-banner-swiper');
	}

	if($('.dp-mydata-tab-wrap').length > 0){
		tabWrap();
	}

	if($('.dp-counterup').length > 0){
		counterUpNumber();
	}

	if($('.dp-clock-wrap').length > 0){
		movingClock();
	}
});
