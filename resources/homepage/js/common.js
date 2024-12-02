function serializeObject(form) {
	var o = {};
	var a = form.serializeArray();
	$.each(a, function () {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

function serializeCustom(form) {
	var a = form.serialize();
	return a.replace(/(\w*=&)|(&\w*=$)/g, '');
}

function serializeParameter(inputNames) {
	var param = '';

	for (var i = 0; i < inputNames.length; i++) {
		var inputNameValue = $('input#' + inputNames[i]).val();
		var selectNameValue = $('select#' + inputNames[i]).val();

		if (inputNameValue != '' && inputNameValue != undefined) {
			if (param != '') {
				param += '&';
			}
			param += inputNames[i] + '=' + inputNameValue;
		}

		if (selectNameValue != '' && selectNameValue != undefined) {
			if (param != '') {
				param += '&';
			}
			param += inputNames[i] + '=' + selectNameValue;
		}
	}

	return param;
}

//다이알로그 호출 함수
function modal_layer_add(div_id) {
	if (div_id == '') {
		//지정한 레이어가 없을때
		var modal_defaults_pop = "<div id='modal_defaults_pop'></div>";
		if ($('#modal_defaults_pop').length < 1) {
			//modal_defaults_pop 레이어가 없을때에는 BODY에 넣어준다
			$('body').prepend(modal_defaults_pop);
		}
	} else {
		//지정한 레이어가 있을때
		var modal_pop = "<div id='" + div_id + "'></div>";
		if ($('#' + div_id).length < 1) {
			//해당하는 레이어가 없을때 BODY에 넣어준다
			$('body').prepend(modal_pop);
		}
	}
}

function doAjaxPost(form, ajaxBody) {
	jQuery.ajaxSettings.traditional = true;
	var formData = serializeObject(form);
	var responseValid = false;

	$.ajax({
		type: 'POST',
		url: form.attr('action'),
		async: false,
		data: formData,
		dataType: 'json',
		success: function (response) {
			response = eval(response);
			responseValid = response.valid;
			if (response.valid) {
				if (response.message != null && response.message.replace(/\s/g, '').length != 0) {
					alert(response.message);
				}
				if (response.targetOpener) {
					window.open(response.url, '', 'width=500,height=510');
					return false;
				}
				if (response.reload) {
					location.reload();
				}

				if (response.url != null && response.url.replace(/\s/g, '').length != 0) {
					/**
					 * ajaxBody 값이 존재한다면 ajax , 아니라면 form 을 이용하여 화면이동한다.
					 */
					if (ajaxBody != null && ajaxBody.replace(/\s/g, '').length != 0) {
						doAjaxLoad(ajaxBody, response.url, response.data);
					} else {
						doGetLoad(response.url, response.data);
					}
				}
			} else {
				if (response.targetOpener) {
					window.open(response.url, '', 'width=500,height=510');
					return false;
				}

				if (response.message != null && response.message.replace(/\s/g, '').length != 0) {
					alert(response.message);
				} else {
					if (response.result != null && response.result.length > 0) {
						for (var i = 0; i < response.result.length; i++) {
							alert(response.result[i].code);
							$('#' + response.result[i].field).focus();
							$('#' + response.result[i].field, $(form)).css('border-color', 'red');
							$('#' + response.result[i].field, $(form)).on('change', function () {
								$(this).css('border-color', '');
							});
							break;
						}
					}
				}

				if (response.url != null && response.url.replace(/\s/g, '').length != 0) {
					if (ajaxBody != null && ajaxBody.replace(/\s/g, '').length != 0) {
						doAjaxLoad(ajaxBody, response.url, response.data);
					} else {
						doGetLoad(response.url, response.data);
					}
				}
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('[' + textStatus + ']관리자에게 문의하세요. : ' + errorThrown + ', ' + jqXHR.status);
		},
	});

	return responseValid;
}

function doAjaxOption(url, formData, ajaxType) {
	$.ajax({
		type: ajaxType,
		url: url,
		async: false,
		data: formData,
		success: function (response) {
			if (response.valid) {
				if (response.message != null && response.message.replace(/\s/g, '').length != 0) {
					alert(response.message);
				}
				if (response.url != null && response.url.replace(/\s/g, '').length != 0) {
					/**
					 * ajaxBody 값이 존재한다면 ajax , 아니라면 form 을 이용하여 화면이동한다.
					 */
					if (ajaxBody != null && ajaxBody.replace(/\s/g, '').length != 0) {
						doAjaxLoad(ajaxBody, response.url);
					} else {
						doGetLoad(response.url, response.data);
					}
				}
			} else {
				for (var i = 0; i < response.result.length; i++) {
					alert(response.result[i].code);
					$('#' + response.result[i].field).focus();
					break;
				}
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('[' + textStatus + ']관리자에게 문의하세요. : ' + errorThrown);
		},
	});
}

function doGetLoad(url, param) {
	var fullUrl = url;
	if (param != null && param.replace(/\s/g, '').length != 0) {
		var csrfIndex = param.indexOf('_csrf');
		if (csrfIndex > -1) {
			param = param.substring(0, csrfIndex - 1);
		}
		fullUrl = fullUrl + '?' + param;
	}

	$(location).attr('href', fullUrl);
}

function doAjaxLoad(ajaxBody, url, param) {
	var fullUrl = url;
	if (param != null && param.replace(/\s/g, '').length != 0) {
		fullUrl = fullUrl + '?' + param;
	}

	$(ajaxBody).load(fullUrl);
}

function contentPrintIE(e) {
	try {
		//참고로 IE 5.5 이상에서만 동작함

		//웹 브라우저 컨트롤 생성
		var webBrowser = '<OBJECT ID="previewWeb" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';

		//웹 페이지에 객체 삽입
		document.body.insertAdjacentHTML('beforeEnd', webBrowser);

		//ExexWB 메쏘드 실행 (7 : 미리보기 , 8 : 페이지 설정 , 6 : 인쇄하기(대화상자))
		previewWeb.ExecWB(7, 1);

		//객체 해제
		previewWeb.outerHTML = '';
	} catch (e) {
		alert(
			'- 도구 > 인터넷 옵션 > 보안 탭 > 신뢰할 수 있는 사이트 선택\n   1. 사이트 버튼 클릭 > 사이트 추가\n   2. 사용자 지정 수준 클릭 > 스크립팅하기 안전하지 않은 것으로 표시된 ActiveX 컨트롤 (사용)으로 체크\n\n※ 위 설정은 프린트 기능을 사용하기 위함입니다'
		);
	}
}

function contentPrint(e) {
	this.event.preventDefault();
	var browser = navigator.userAgent.toLowerCase();
	if (browser.indexOf('chrome') != -1) {
		var initBody = document.body.innerHTML;
		$('div#contentArea').printThis();
	} else if (browser.indexOf('trident') != -1 || browser.indexOf('MSIE') != -1) {
		window.open(location.href + '&printMode=true');
	}

	//alert(navigator.appName);
	//	if(navigator.appName.indexOf("Microsoft") > -1 ) {
	//		if(navigator.appVersion.indexOf("MSIE 6") != -1) {
	//			alert('익스플로어6 버전 에서는 지원하지 않는 기능입니다.');
	//			return;
	//		}
	//	}
	//	window.onbeforeprint = beforePrint;
	//	window.onafterprint = afterPrint;
	//	window.print();
	//var OLECMDID = 7;
	/* OLECMDID values:
	 * 6 - print
	 * 7 - print preview
	 * 1 - open window
	 * 4 - Save As
	 */
	//     var PROMPT = 1; // 2 DONTPROMPTUSER
	//     var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
	//     document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
	//     WebBrowser1.ExecWB(OLECMDID, PROMPT);
	//     WebBrowser1.outerHTML = "";
}

function HTMLDecode(str) {
	str = str.replace(/&lt;/gi, '<');
	str = str.replace(/&amp;/gi, '&');
	return str;
}

//사서에게 물어보세요
function linkToAskNl(libcode, libname) {
	var formTag = '<form id="linkToAskNl" method="post" target="mashup" action="http://www.nl.go.kr/ask/">';
	formTag += '<input type="hidden" name="lib_name" value="' + libname + '">';
	formTag += '<input type="hidden" name="lib_id" value="' + libcode + '">';
	formTag += '</form>';

	document.body.insertAdjacentHTML('beforeEnd', formTag);

	$('form#linkToAskNl').submit();
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

// ajax 캐시 지우기
$(document).ready(function () {
	$.ajaxSetup({
		cache: false,
	});
	$.getScript('/resources/common/js/printThis.js');
	$('a.sub-kakao').on('click', function (e) {
		e.preventDefault();
		//Kakao.init('3e85666c80454909276bb9d33de127c4');

		var homepage_id = $(this).attr('keyValue1');
		var menu_idx = $(this).attr('keyValue2');
		var menu_name = $(this).attr('keyValue3');
		var homepage_name = $(this).attr('keyValue4');
		var txtVal = HTMLDecode(homepage_name + '-' + menu_name);
		var urlVal = window.location.href;
		$.post('/sns/access.do', { homepage_id: homepage_id, menu_idx: menu_idx, type: 'KAKAOSTORY' });
		Kakao.Story.share({
			url: urlVal,
			text: txtVal,
		});
	});

	$('a.sub-twitter').on('click', function (e) {
		e.preventDefault();
		var homepage_id = $(this).attr('keyValue1');
		var menu_idx = $(this).attr('keyValue2');
		var menu_name = $(this).attr('keyValue3');
		var homepage_name = $(this).attr('keyValue4');
		var txtVal = HTMLDecode(homepage_name + '-' + menu_name);
		var url = window.location.href;
		$.post('/sns/access.do', { homepage_id: homepage_id, menu_idx: menu_idx, type: 'TWITTER' });
		window.open('http://twitter.com/share?text=' + encodeURIComponent(txtVal) + '&url=' + encodeURIComponent(url), 'ttsharer', 'width=500,height=300');
	});

	$('a.sub-facebook').on('click', function (e) {
		e.preventDefault();

		var homepage_id = $(this).attr('keyValue1');
		var menu_idx = $(this).attr('keyValue2');
		var menu_name = $(this).attr('keyValue3');
		var homepage_name = $(this).attr('keyValue4');
		var txtVal = HTMLDecode(homepage_name + '-' + menu_name);
		var url = window.location.href;

		$.post('/sns/access.do', { homepage_id: homepage_id, menu_idx: menu_idx, type: 'FACEBOOK' });
		window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(txtVal), 'fbsharer', 'width=500,height=300');
	});

	$('a.sub-qrcode').on('click', function (e) {
		e.preventDefault();
		var size = 150;
		var url = location.href;
		if (url.indexOf('/intro/search/detail.do') != -1) {
			size = 150;
		}

		/* qrcode 사이즈 ,
			width = 367 />9.7cm x 9.7cm
			width = 235 />6.2cm x 6.2cm
			width = 138 />3.7cm x 3.7cm
		 */
		if ($(this).attr('keyValue') == 'true') {
			if (url.indexOf('geiclib') != -1 || url.indexOf('geic') != -1) {
				$('div#container > div.section > div.content > div.doc > div.doc-body').prepend('<div id="qrcodeView" style="position:relative ;z-index: 99999; display:none;"></div>');
			} else if (url.indexOf('gbelib') != -1) {
				$('div#container div.section > div.content > div.doc > div.doc-body').prepend('<div id="qrcodeView" style="position:relative ;z-index: 99999; display:none;"></div>');
			} else if (url.indexOf('elib') != -1) {
				$('div#sub-container div.section > div.content > div.doc > div.doc-body').prepend('<div id="qrcodeView" style="position:relative ;z-index: 99999; display:none;"></div>');
			} else if (url.indexOf('libculture') != -1 || url.indexOf('nearbylib') != -1) {
			} else {
				$('div#container > div.section > div.content > div.doc').prepend('<div id="qrcodeView" style="position:relative ;z-index: 99999; display:none;"></div>');
			}

			$('div#qrcodeView').html('');

			url = encodeURIComponent(url);
			var src = 'http://chart.apis.google.com/chart?cht=qr&chof=gif&chl=' + url + '&choe=UTF-8&chld=H|0&chs=' + size + 'x' + size;

			if (url.indexOf('libculture') != -1 || url.indexOf('nearbylib') != -1) {
				$('div#qrcodeView').html('<img style="max-width:' + size + 'px; max-height:' + size + 'px; width:' + size + 'px; height:' + size + 'px;" alt="QR코드" src="' + src + '">');
			} else {
				$('div#qrcodeView').html(
					'<img style="position:absolute; right:0px;max-width:' + size + 'px; max-height:' + size + 'px; width:' + size + 'px; height:' + size + 'px;" alt="QR코드" src="' + src + '">'
				);
			}

			$('div#qrcodeView').show();
			$(this).attr('keyValue', false);
		} else {
			if (url.indexOf('libculture') != -1 || url.indexOf('nearbylib') != -1) {
				$('div#qrcodeView').empty();
			} else {
				$('div#qrcodeView').remove();
			}

			$(this).attr('keyValue', true);
		}
	});

	if (location.href.indexOf('/intro/login') != -1 || location.href.indexOf('/intro/join') != -1) {
		$('a.sub-qrcode').hide();
	}

	if (location.href.indexOf('printMode=true') != -1) {
		$('div.doc-head, div.lnb, div.doc-info, div.sub-visual, div#header, div#footer').remove();
		contentPrintIE();
	}
});

var token = $("meta[name='_csrf']").attr('th:content');
var header = $("meta[name='_csrf_header']").attr('th:content');

$(function () {
	$(document).ajaxSend(function (e, xhr, options) {
		//        xhr.setRequestHeader(header, token);
	});
});

function open_magazine(url) {
	window.open(url, 'magazine', 'width=1500,height=1024');
}

$(function () {
	// 테이블 공통 스타일 추가
	$('table tr:first-child').addClass('first');
	$('table tr').each(function () {
		$(this).children('th:first-child,td:first-child').addClass('first');
		$(this).children('th:last-child,td:last-child').addClass('last');
		$(this)
			.children('th')
			.each(function (index) {
				$(this).addClass('th' + (index + 1));
			});
		$(this)
			.children('td')
			.each(function (index) {
				$(this).addClass('td' + (index + 1));
			});
	});
	$('table col').each(function (index) {
		$(this).addClass('col' + (index + 1));
	});

	// 체크박스 선택 시 강조
	$('table tbody tr').on('click', function () {
		$(this).toggleClass('highlight', $(this).find('input[type="checkbox"]').is(':checked'));
	});

	// 갤러리 게시판 이미지 처리
	$('#board_tbody.bbs_gallery li img').on('error', function () {
		$(this).parent().addClass('noImg').end().attr('src', '/resources/common/img/blank.gif').off('error');
	});

	// 댓글 textarea 포커스 효과
	$('div.bbs-comment-textarea').on('click', function () {
		$(this).children().focus();
	});
	$('div.bbs-comment-textarea textarea')
		.on('focusin', function () {
			$(this).parent().addClass('current').siblings('.checkbox').show();
		})
		.on('focusout', function () {
			$(this).parent().removeClass('current');
		});

	// 탭 메뉴 클릭 처리
	$('div.tab-menu > ul > li > a, div.tablink > ul > li > a').on('click', function (e) {
		e.preventDefault();
		var $parent = $(this).parent();
		if (!$parent.hasClass('active')) {
			$parent.siblings().removeClass('active').end().addClass('active');
			var target = $(this).attr('href');
			$(target).addClass('active').siblings('.tabCon').removeClass('active');
		}
	});

	// 새창 링크 처리
	$('a[target="_blank"]').each(function () {
		$(this).addClass('newWin').attr('title', '새창으로 열립니다.').append('<i class="fa fa-external-link"></i>');
	});

	// 대메뉴 스타일 및 이벤트 처리
	$('div.Gnb ul.SubMenu li:first-child').addClass('first');
	$('div.Gnb ul.SubMenu li:last-child').addClass('last');
	$('div.Gnb li').last().addClass('Last');
	$('div.g-menu>ul.gnb-menu>li').each(function (index) {
		$(this).addClass('menu' + (index + 1));
	});

	// 서브메뉴 hover 이벤트
	$('div.Gnb ul.gnb-menu > li').hover(
		function () {
			$(this).children().addClass('active');
		},
		function () {
			$(this).children().removeClass('active');
		}
	);

	// 배너 슬라이더 초기화
	var bannerSlider1 = initBannerSlider('div.banner-wrap.type1 ul.banner-roll', { slideWidth: 150, maxSlides: 8 });
	var bannerSlider2 = initBannerSlider('div.banner-wrap.type2 ul.banner-roll', { mode: 'vertical', minSlides: 2, maxSlides: 3 });
	var bannerSlider3 = initBannerSlider('div.banner-wrap.type1 ul.banner-rolls', { slideWidth: 187, maxSlides: 8 });

	function initBannerSlider(selector, options) {
		if ($(selector).length > 0) {
			return $(selector).bxSlider({
				speed: 500,
				moveSlides: 1,
				slideMargin: 5,
				auto: true,
				autoHover: true,
				pager: false,
				controls: false,
				...options,
			});
		}
		return null;
	}

	// 추천 사이트 변경 시 새창 열기
	$('select#recommendSite1, select#recommendSite2').on('change', function () {
		if ($(this).val()) {
			window.open($(this).val());
		}
	});

	// 팝업존 슬라이더
	if ($('div.popupzone ul').length > 0) {
		$('div.popupzone ul').bxSlider({
			mode: 'fade',
			auto: true,
			controls: true,
			autoHover: true,
		});
	}

	// 클릭 이벤트 중복 방지 및 링크 설정
	$('a').each(function () {
		var target = $(this).attr('target');
		if (target && target.includes('_blank')) {
			$(this).attr('rel', 'noopener noreferrer');
		}
	});

	// 셀렉트 박스 이벤트 처리
	var $selectLayer = $('.divSelectText');
	var $currentSelectBox = $('.selectboxUl');
	$selectLayer.on('click', function () {
		$currentSelectBox.slideToggle('fast');
	});
	$('.selectboxUl li').on('click', function () {
		var $this = $(this);
		$this.addClass('selected').siblings().removeClass('selected');
		$('.divSelectText').text($this.text());
		$currentSelectBox.hide();
	});

	// 배너 컨트롤 버튼 이벤트
	$('div.banner-wrap a').on('click', function (e) {
		e.preventDefault();
		var action = $(this).data('action');
		var banner = bannerSlider1 || bannerSlider2 || bannerSlider3;
		if (action && banner) {
			banner[action]();
		}
	});
});

$(document).ready(function () {
	pageMain.init();
});

var pageMain = (function () {
	var init, bindEvent;

	init = function () {
		bindEvent();
	};

	bindEvent = function () {
		// TAB
		$(document).on('click', '.tabMenuS a.t-tabs', function () {
			var target = this.getAttribute('href').replace('#', '');
			var $box = $(this).closest('.tabS');
			var moreUrl = $(this).data('link');

			$(this).closest('.tabMenuS').find('li').removeClass('on');
			$(this).parent('li').addClass('on');

			$box.find('.con').hide();
			$box.find('[data-tab="' + target + '"]').show();
			$box.find('.more-more').attr('href', moreUrl);
		});
	};

	return {
		init: init,
	};
})();

$(function () {
	// 팝업존(중앙도서관)
	if ($('.popZone ul').length > 0) {
		$('.popZone ul').bxSlider({
			mode: 'fade',
			auto: true,
			pager: true,
			controls: false,
			autoControls: false,
		});
	}

	// 전광판(중앙도서관)
	$('.panelZone ul').bxSlider({
		mode: 'vertical',
		pager: false,
		controls: false,
		pagerType: 'short',
		auto: true,
		autoControls: true,
		autoControlsCombine: true,
	});

	$('.movieContent ul').bxSlider({
		auto: true,
		pager: true,
		controls: false,
		autoControls: false,
	});
});
