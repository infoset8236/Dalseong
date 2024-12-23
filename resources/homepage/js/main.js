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

$(document).ready(function () {
	// 팝업 스와이퍼 페이지네이션
	let slidesPerPage = 1;
	const totalSlides = $('.popup_swiper .swiper-slide').length;
	let totalPages = Math.ceil(totalSlides / slidesPerPage);

	// 팝업 스와이퍼
	const popupSwiper = new Swiper('.popup_swiper .swiper', {
		speed: 3000,
		pagination: {
			el: '.popup_swiper .swiper-pagination',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' + ' / ' + totalPages;
			},
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		loop: true,
		slidesPerView: 1,
		loopAddBlankSlides: true,
		navigation: {
			nextEl: '.popup_swiper .swiper-button-next',
			prevEl: '.popup_swiper .swiper-button-prev',
		},
	});

	// 팝업 스와이퍼 정지 OR 재생
	var popzoneConLen = $('.popup_swiper .swiper-slide').length;
	if (popzoneConLen > 1) {
		const autoplayButton = document.querySelector('.popup_autoplay');

		autoplayButton.addEventListener('click', () => {
			if (popupSwiper.autoplay.running) {
				popupSwiper.autoplay.stop();
				updateAutoplayButton('../../../../resources/homepage/img/common/play.svg', '재생버튼');
			} else {
				popupSwiper.autoplay.start();
				updateAutoplayButton('../../../../resources/homepage/img/common/stop.svg', '정지버튼');
			}
		});

		function updateAutoplayButton(src, alt) {
			autoplayButton.src = src;
			autoplayButton.alt = alt;
		}
	}

	/* ------------------------------------------------------------------------------------------------------------------- */
});

$(document).ready(function () {
	var swiper = new Swiper('#main3 .swiper-container', {
		slidesPerView: 6, // 한 화면에 보이는 슬라이드 개수
		spaceBetween: 28, // 슬라이드 간 간격
		loop: true, // 무한 반복
		autoplay: {
			delay: 3000, // 3초마다 자동 이동
		},
	});
});
