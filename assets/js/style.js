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
		popTopPosition($('.'+ popup +' .popWrap'));
	}, 0);

	$('.'+ popup).addClass('open').find('.dim').show();
	$('body').addClass('bodyFixed').css('top', -posY);

	var objPopWrap = $('.'+ popup +' .popWrap');

	$(window).resize(function(){
		setTimeout(function(){
			//var windowHeight = $(window).height();
				popTopPosition(objPopWrap);
		}, 0);
	});
}

//페이지 온로드 시 스마트학습진단 창 브라우저 중앙(또는 탑)에 고정
function sldOpen(sldName){
	$('.'+ sldName).fadeIn(100);
	setTimeout(function(){
		popTopPosition($('.'+ sldName +' .sldWrap'));
	}, 0);

	var objSldWrap = $('.'+ sldName +' .sldWrap');

	$(window).resize(function(){
		setTimeout(function(){
			//var windowHeight = $(window).height();
				popTopPosition(objSldWrap);
		}, 0);
	});
}

//팝업 내 닫기 버튼 클릭 시 팝업을 닫음
//팝업 열기 전의 바디스크롤 위치를 계산하여, 팝업을 열었다가 닫았을때 바디스크롤이 원래 위치로 돌아오게 함
function popClose(e){
	var posTop = Math.abs(parseInt($('body').css('top')));
	$('body').removeClass('bodyFixed').css('top', 0);
	$(window).scrollTop(posTop);
	e.parents('.popFixedWrap').removeClass('open').fadeOut(300);
}

//survey.html 학습경험설문 페이지에서 필수 사항 모두 답변 완료 했는지 체크하고, 다음 버튼 활성화
function confirmChkList(chkList, chkBtnOn){

 	$(chkList).on('click change focus blur keyup', function(){

			//console.log('========================================================');
			var $selectMustLength = $('.selectMust').find("select").length;//2개
			var $selectedMustLength = $('.selectMust').find("select option[value!='']:selected").length;
			var $chkMustLength = $('.chkMust').length;//2개
			var $noExpChkedLength = $('.chkMust .noExp input[type="radio"]:checked').length;
			var $testHaveExpChkedLength = $('.testExpCondition .haveExp input[type="radio"]:checked').length;
			var $workHaveExpChkedLength = $('.workExpCondition .haveExp input[type="radio"]:checked').length;
			var $testExpStatusChkedLength = $('.testExpStatus input[type="radio"]:checked').length;
			var $testExpStatusSelectedLength = $('.testExpStatus').find("select option[value!='']:selected").length;
			var $testExpStatusChkedInputLength =  $('.testExpStatus').find(".input01.checkTrue input[value!='']").length;
			var $workExpStatusChkedLength = $('.workExpStatus input[type="radio"]:checked').length;
			var $workExpStatusChkedInputLength = $('.workExpStatus').find(".input01.checkTrue input[value!='']").length;
			var $testExpStatus = $('.testExpStatus');
			var $workExpStatus = $('.workExpStatus');

			if($selectedMustLength == $selectMustLength){
				//console.log('응시직렬 셀렉트 박스 모두 선택함');
				if($noExpChkedLength == $chkMustLength){
					//console.log('수험경험, 사회경험 모두 무경험 선택함');
					emptyStatus($testExpStatus);
					emptyStatus($workExpStatus);
					turnOnBtn(chkBtnOn);
				}else if($noExpChkedLength == 1){
					if($testHaveExpChkedLength == 1){
						//console.log('수험경험만 유경험 선택함');
						emptyStatus($workExpStatus);
						if($testExpStatusChkedLength == 2 && $testExpStatusSelectedLength == 5 && $testExpStatusChkedInputLength == 5){
							//console.log('수험경험 내 라디오버튼 모두 선택, 셀렉트 박스 모두 선택, 점수 모두 입력함');
							turnOnBtn(chkBtnOn);
						}else{
							//console.log('수험경험 내 선택사항 누락');
							turnOffBtn(chkBtnOn);
						}
					} else if($workHaveExpChkedLength == 1){
						//console.log('사회경험만 유경험 선택함');
						emptyStatus($testExpStatus);
						if($workExpStatusChkedLength == 2){
							//console.log('사회경험 내 라디오 버튼 모두 선택함');
							turnOnBtn(chkBtnOn);
						} else if($workExpStatusChkedLength ==1 && $workExpStatusChkedInputLength ==1){
							//console.log('사회경험 내 라디오 버튼 한 개 선택하고 사회경험 유형을 직접 입력함');
							turnOnBtn(chkBtnOn);
						} else{
							//console.log('사회경험 내 선택사항 누락');
							turnOffBtn(chkBtnOn);
						}
					} else if($testHaveExpChkedLength == 0 && $workHaveExpChkedLength == 0){
						//console.log('수험경험, 사회경험 모두 무경험 선택 또는 유경험 선택 안함');
						emptyStatus($testExpStatus);
						emptyStatus($workExpStatus);
					}
				}else if($noExpChkedLength == 0){
					//console.log('수험경험, 사회경험 모두 선택 안했거나 유경험 선택함');
					if($testExpStatusChkedLength == 2 && $testExpStatusSelectedLength == 5 && $testExpStatusChkedInputLength == 5){
						//console.log('수험경험 선택 사항 모두 체크함');
						if($workExpStatusChkedLength == 2){
							//console.log('사회경험 내 라디오 버튼 모두 선택함');
							turnOnBtn(chkBtnOn);
						} else if($workExpStatusChkedLength ==1 && $workExpStatusChkedInputLength ==1){
							//console.log('사회경험 내 라디오 버튼 한 개 선택하고 사회경험 유형을 직접 입력함');
							turnOnBtn(chkBtnOn);
						} else{
							//console.log('사회경험 내 선택사항 누락');
							turnOffBtn(chkBtnOn);
						}
					}
				}
			} else{
				//console.log('응시직렬 셀렉트 박스 둘 다 선택안함 또는 둘 중 하나 선택 안함');
				turnOffBtn(chkBtnOn);
			}
 });
}

//diagnosis04.html 학습방법 및 패턴조사 페이지에서 필수 사항 모두 답변했는지 체크 후 다음 버튼 활성화, 체크 안했을 경우 버튼 비활성화
function confirmChkList02(chkList, chkBtnOn){
	$(chkList).on('click change focus blur keyup mouseup mousedown', function(){
		var $chkListLength = $('.chkList').length;
		//console.log('$chkListLength = ', $chkListLength);
		var $chkedLength = $('.surveyWrap02').find('.chkList.checkTrue').length;
		//console.log('$chkedLength = ', $chkedLength);
		if($chkListLength == $chkedLength) {
			turnOnBtn(chkBtnOn);
		}else {
			turnOffBtn(chkBtnOn);
		}
	});
}

//diagnosis03.html 학습진단페이지에서 답변 체크 후 다음 버튼 활성화, 답변 체크 안했을 경우 버튼 비활성화
function confirmChkList03(chkList, chkBtnOn){
	$(chkList).on('click change focus blur keyup mouseup mousedown','input', function(){
		//console.log('======');
		var $chkListLength = $('.chkList').length;
		//console.log('$chkListLength = ', $chkListLength);
		var $chkedLength = $(chkList).find('input[type="radio"]:checked').length;
		//console.log('$chkedLength = ', $chkedLength);
		if($chkListLength == $chkedLength) {
			turnOnBtn(chkBtnOn);
		}else {
			turnOffBtn(chkBtnOn);
		}
	});
}

//다음 버튼 활성화, active 클래스 추가 disabled 해제
function turnOnBtn(chkBtnOn){
	$(chkBtnOn).removeClass('disabled').addClass('active').text('다음').attr('disabled', false);
}

//다음 버튼 비활성화, active 클래스 제거 disabled 설정
function turnOffBtn(chkBtnOn){
	$(chkBtnOn).removeClass('active').addClass('disabled').text('위 항목들을 모두 선택하세요!').attr('disabled', true);
}

//survey.html 학습경험설문 페이지에서 수험경험 또는 사회경험 무경험 선택 시 하위 메뉴 모두 체크 해제
function emptyStatus(status){
	status.find('input[type="radio"]').prop('checked', false);
	status.find('.input01 input').val("").parents('.input01').removeClass('checkTrue');
	status.find('select').prop('selected', false);
}

//survey.html 학습경험설문 페이지에서 수험경험 또는 사회경험 유경험 선택 시 하위 메뉴 슬라이드다운으로 노출,
//무경험 선택 시 슬라이드 업으로 메뉴 숨김
function checkExpStatus(expCondition, expStatus) {
	var $itsRadio = expCondition.find('.radioExp');
	$itsRadio.on('click', function(){
		if($(this).hasClass('haveExp')){
			expStatus.hide().css({height:'auto', visibility:'visible'}).slideDown(200);
		}else{
			expStatus.stop().slideUp(300);
			expStatus.css({height:'0', visibility:'hidden'});
		}
	});
}

//survey.html 학습경험설문 페이지에서 사회경험유형 radio 버튼 클릭 시 input(기타입력)박스 value 값 제거,
//기타영역 input에 사용자가 입력값을 넣었을 때 사회경험유형 radio 버튼 클릭 해제, input01 클래스에  checkTrue 클래스 추가
function checkWorkExpType(workExpType, workExpTypeEtc){
	workExpType.on('click', function(){
		workExpTypeEtc.val('').parents('.input01').removeClass('checkTrue');
	});
	workExpTypeEtc.on('focus keyup keydown', function(){
		workExpType.prop('checked', false);
	}).on('blur keyup keydown', function(){
		if($(this).val().length > 0) {
			$(this).parents('.input01').addClass('checkTrue');
		} else {
			$(this).parents('.input01').removeClass('checkTrue');
		}
	})
}

//survey.html 학습경험설문 페이지에서 과목별 점수 input에 입력값을 넣었을 때 input01클래스에 checkTrue 클래스 추가
//input에 입력값이 없을 경우 input01클래스에 checkTrue 클래스 제거
function checkScoreInput(scoreInput){
	scoreInput.on('focus blur keyup keydown', function(){
		if($(this).val().length > 0) {
			$(this).parents('.input01').addClass('checkTrue');
		} else {
			$(this).parents('.input01').removeClass('checkTrue');
		}
	})
}

//survey.html 학습경험설문 페이지에서 셀렉트 박스 선택 시 select01 클래스에 checkTrue클래스 추가
function checkOptionSelected(selectEl){
	selectEl.on('change focus blur', function(){
    if($(this).find(':selected').val().length > 0) {
			$(this).parents('.select01').addClass('checkTrue');
		} else {
			$(this).parents('.select01').removeClass('checkTrue');
		}
	});
}

//diagnosis04.html 학습방법 및 패턴조사 페이지에서 사용자가 range slider로 값 조절 시 checkTrue 클래스 추가
function checkRangeSlider(sliderInput){
	sliderInput.on('click change mousedown mouseup', function(){
		$(this).parents('.chkList').addClass('checkTrue');
		$(this).siblings('.rangeValueWrap').css('visibility','visible');
	});
}

//diagnosis04.html 학습방법 및 패턴조사 페이지에서 사용자가 학습집중시간대 체크박스 한개라도 선택 시 checkTrue 클래스 추가
function checkCheckedBox(checkbox){
	checkbox.on('click', function(){
		var checkedBoxLength = $(this).parents('.circleList02').find('input[type="checkbox"]:checked').length;
		console.log('checkedBoxLength = ', checkedBoxLength);
		if(checkedBoxLength >= 1){
			$(this).parents('.chkList').addClass('checkTrue');
		}else {
			$(this).parents('.chkList').removeClass('checkTrue');
		}
	});
}

//diagnosis04.html 학습방법 및 패턴조사 페이지에서 rangeslider.js 플러그인 사용하여 슬라이더 구현
//슬라이더 핸들 조작 시 슬라이더 하단에 왼쪽과 오른쪽 값 노출
function rangeSlider(slider){
	var $rangeslider = slider;
	$rangeslider.rangeslider({
			polyfill: false,
		}).on('input', function() {
			var thisValue = $(this).val();
			var leftValue;
			var rightValue;
			if(thisValue < 50 ){
				leftValue = (50 - thisValue) + 50 ;
				rightValue = 100 - leftValue;
			}else if (thisValue == 50) {
				leftValue = 50;
				rightValue = 50;
			}else if(thisValue > 50) {
				rightValue = (thisValue - 50) + 50;
				leftValue = 100 - rightValue;
			}
			rightValue = 100 - leftValue;
			$(this).siblings('.rangeValueWrap').find('.leftValue').text(leftValue+'%');
			$(this).siblings('.rangeValueWrap').find('.rightValue').text(rightValue+'%');
		});
}

//main02.html 메이페이지(학습진단경험 있는 경우) 진단결과 슬라이더 swiper.js 플러그인으로 구현(버튼)
function basicSwiper(slider){
	setTimeout(function() {
		var swiper = new Swiper(slider, {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}, 0);
}

//login.html 로그인 페이지 왼쪽 슬라이더 swiper.js 플러그인으로 구현(자동재생, 페이저, 버튼)
function autoplaySwiper(slider){
	setTimeout(function() {
		var mySwiper = new Swiper(slider, {
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			loop : true,
			autoplay: {
				delay: 5000,
			},
			autoplayDisableOnInteraction: false,
			speed: 400,
		});
	}, 0);
}

//diagnosis03.html 학습진단 페이지에서 문제에 타이핑 효과 애니메이션 구현
function typingEffect(txtQuestion){
	getTxtHeight(txtQuestion);

	//문제길이에 따라 높이가 변하기 때문에, 텍스트의 높이값을 구한 뒤 txtQuestion 클래스에 min-height추가
	function getTxtHeight(txt){
		var txtQ = $('.txtQuestion');
		var txtToGetHeight = '<p class="txtToGetHeight">'+ txt + '</p>';
		txtQ.css('opacity', '0').prepend(txtToGetHeight);
		var txtHeight = $('.txtToGetHeight').height();
		txtQ.css('min-height', txtHeight);
		txtQ.find('p.txtToGetHeight').remove();
		txtQ.css('opacity', '1');
	}

	var typingApp = {
			text: " " + txtQuestion,
			index: 0,
			chars: 0,
			speed: 80,
			container: ".typingTxtWrap .content",
			init: function() {
				this.chars = this.text.length;
				return this.write();
			},
			write: function() {
				$(this.container).append(this.text[this.index]);
				if (this.index < this.chars) {
					this.index++;
					return window.setTimeout(function() {
						return typingApp.write();
					}, this.speed);
				}
			}
		};

		setTimeout(function() {
			typingApp.init();
		}, 200);

		giveAnimDelayTimeToAnswer();

		//diagnosis03.html 학습진단 페이지에서 문제 타이핑 효과가 끝난 후 답안이 시간차로 노출되는 애니메이션 구현
		function giveAnimDelayTimeToAnswer(){
			var animLi = $('.longAnswerList02 li');
			var liLength = $('.longAnswerList02 li').length;
			var txtInstruction = $('.txtInstruction');
			var qTxtLengthTime = typingApp.text.length/10;

			setTimeout(function() {
				$('.typingTxtWrap').removeClass('showDash');
			}, qTxtLengthTime*1000);

			txtInstruction.css('animation-delay', qTxtLengthTime + 0.2 + 's');
			for(var i=0; i < liLength; i++){
				//console.log('i = ', typingApp.text.length);
				var animDelayTime = qTxtLengthTime + 0.2 + (i*0.2) + 's';
				animLi.eq(i).find('label').css('animation-delay', animDelayTime);
			}
		}
}

//브라우저 사이즈가 변해도 항상 footer를 하단에 고정
function putFooterOnBottom(sldContainer, sldHeader, sldBody, sldFooter){
	compareHeight();
	//sldContainer안의 내용이 sldContainer 보다 작을 경우, 클경우에 footer css 속성을 바꿈
	function compareHeight(){
		var sldContainerHeight = sldContainer.outerHeight();
		var sldInsideHeight = sldHeader.outerHeight() + sldBody.outerHeight() + sldFooter.outerHeight();
		if(sldContainerHeight <= sldInsideHeight){
			//브라우저 높이(sldContainer 높이)가 내용(sld header, body, footer 합한 값)보다 작을 경우에 footer를 기존 css 값대로 position:relative
				sldFooter.css({
					'position': 'relative',
					'bottom':'auto'
				});
		} else {
			//브라우저 높이(sldContainer 높이)가 내용(sld header, body, footer 합한 값)보다 클 경우 footer를 position:absolute로 하단에 고정
				sldFooter.css({
					'position': 'absolute',
					'bottom': '0',
				});
		}
	}
	//윈도우가 리사이즈 될때마다 footer 위치를 재배치
	$(window).resize(function(){
		setTimeout(function(){
			compareHeight();
		}, 0);
	});
}

function navFixed(){
	var windowWidth = $(window).width();
	function headerFixed(){
		var didScroll = false;
		var lnbTop = $('.sldHeader').offset().top;
		var lnbHeight = $('.sldHeader').outerHeight();
		 windowWidth = $(window).width();
		console.log(windowWidth, 'windowWidth');

		$(window).add('.sldContainer').on('scroll', function(){
			if(windowWidth < 960){
				didScroll = true;
				console.log(didScroll);
				scrollFunc();
			}else {
				didScroll = false;
				$('.sldHeader').removeClass('fixed');
				$('.sldBody').css('padding-top', 0);
			}
		});
		function scrollFunc(){
			setInterval(function(){
				if(didScroll){
					var scrTop = $('.sldContainer').scrollTop();
						if(scrTop > lnbTop){
							$('.sldHeader').addClass('fixed');
							$('.sldBody').css('padding-top', lnbHeight);//nav fixed 되면서 사라지는 높이값 보정
						} else {
							$('.sldHeader').removeClass('fixed');
							$('.sldBody').css('padding-top', 0);
						}
					}
					didScroll = false;
			}, 100);
		}
	}

	if(windowWidth < 960){
		headerFixed();
	}

	$(window).resize(function(){
			headerFixed();
	});

}


$(function(){

	if($('.surveyExp').length > 0){
		confirmChkList('.chkList', '.chkBtnOn');
	}

	if($('.rangeSliderW').length > 0){
		checkRangeSlider($('.rangeSlider'));
		checkCheckedBox($('.circleList02.chkList input'));
		confirmChkList02('.chkList', '.chkBtnOn');
		rangeSlider($('.rangeSlider'));
	}

	if($('.diagnosisQuestion').length > 0){
		confirmChkList03('.chkList', '.chkBtnOn');
	}

	if($('.testExpCondition').length > 0){
		checkExpStatus($('.testExpCondition'), $('.testExpStatus'));
	}

	if($('.workExpCondition').length > 0){
		checkExpStatus($('.workExpCondition'), $('.workExpStatus'));
	}

	if($('.workExpTypeEtc').length > 0){
		checkWorkExpType($('.workExpType input'), $('.workExpTypeEtc input'))
	}

	if($('.scoreInput').length > 0){
		checkScoreInput($('.scoreInput input'))
	}

	if($('.select01.selectMust').length > 0){
		checkOptionSelected($('.select01.selectMust select'))
	}

	if($('.sld01').length > 0){
		sldOpen('sld01');
	}

	if($('.mainSlider').length > 0){
		basicSwiper('.mainSlider');
	}

	if($('.resultSlider').length > 0){
		basicSwiper('.resultSlider');
	}

	if($('.loginSliderWrap').length > 0){
		autoplaySwiper('.loginSliderWrap');
	}

	if($('.sldFooter').length > 0){
		putFooterOnBottom($('.sldContainer'), $('.sldHeader'), $('.sldBody'), $('.sldFooter'));
	}
	if($('.sldHeader').length > 0){
			 navFixed();
	}
});
