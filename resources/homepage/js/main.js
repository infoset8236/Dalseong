//main
document.addEventListener('DOMContentLoaded', () => {
	const bars = document.querySelectorAll('.bar');

	function animateBars() {
		bars.forEach(bar => {
			const scaleY = Math.random() * 1.5 + 0.5;
			bar.style.transform = `scaleY(${scaleY})`;
		});
	}

	setInterval(animateBars, 100);
});

$(document).ready(function () {
	const navLinks = $('.navbox li a');

	const activeLink = localStorage.getItem('activeLink');
	if (activeLink) {
		const $activeElement = navLinks.filter(`[href="${activeLink}"]`);
		if ($activeElement.length) {
			$activeElement.addClass('on');
		}
	}

	navLinks.click(function (event) {
		event.preventDefault();

		navLinks.removeClass('on');

		$(this).addClass('on');

		localStorage.setItem('activeLink', $(this).attr('href'));
	});
});

//로딩
$(document).ready(function () {
	$('#loading').show();

	setTimeout(function () {
		$('#loading').fadeOut();
	}, 3000);
});

//AI 도서추천
$(function () {
	$('.reco_tab a').click(function () {
		var tab_id = $(this).attr('data-tab');

		$('.reco_tab a').removeClass('active');
		$('.tab_content').removeClass('active');

		$(this).addClass('active');
		$('#' + tab_id).addClass('active');
	});
});

$(function () {
	$('.recom_tab a').click(function () {
		var tab_id = $(this).attr('data-tab');

		$('.recom_tab a').removeClass('active');
		$('.tab_contentt').removeClass('active');

		$(this).addClass('active');
		$('#' + tab_id).addClass('active');
	});
});

$(document).ready(function () {
	const groupSize = 12;

	$('#mn_tab9 .slider').each(function () {
		const $tab = $(this);
		const $lists = $tab.find('.list');
		const $swiperWrapper = $tab.find('.swiper-wrapper');

		$lists.hide();

		for (let i = 0; i < $lists.length; i += groupSize) {
			const $swiperSlide = $('<div class="swiper-slide"></div>');

			$lists.slice(i, i + groupSize).each(function () {
				$swiperSlide.append($(this).show());
			});

			$swiperWrapper.append($swiperSlide);
		}

		new Swiper($tab.find('.swiper-container')[0], {
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: $tab.find('.swiper-pagination')[0],
				clickable: true,
			},
			loop: false,
		});
	});
});

$(document).ready(function () {
	const groupSize = 12;

	$('#mn_tab10 .slider').each(function () {
		const $tab = $(this);
		const $lists = $tab.find('.list');
		const $swiperWrapper = $tab.find('.swiper-wrapper');

		$lists.hide();

		for (let i = 0; i < $lists.length; i += groupSize) {
			const $swiperSlide = $('<div class="swiper-slide"></div>');

			$lists.slice(i, i + groupSize).each(function () {
				$swiperSlide.append($(this).show());
			});

			$swiperWrapper.append($swiperSlide);
		}

		new Swiper($tab.find('.swiper-container')[0], {
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: $tab.find('.swiper-pagination')[0],
				clickable: true,
			},
			loop: false,
		});
	});
});

$(document).ready(function () {
	const groupSize = 6;

	$('#mn_tab12 .slider').each(function () {
		const $tab = $(this);
		const $lists = $tab.find('.list');
		const $swiperWrapper = $tab.find('.swiper-wrapper');

		$lists.hide();

		for (let i = 0; i < $lists.length; i += groupSize) {
			const $swiperSlide = $('<div class="swiper-slide"></div>');

			$lists.slice(i, i + groupSize).each(function () {
				$swiperSlide.append($(this).show());
			});

			$swiperWrapper.append($swiperSlide);
		}

		new Swiper($tab.find('.swiper-container')[0], {
			slidesPerView: 1,
			pagination: {
				el: $tab.find('.swiper-pagination')[0],
				clickable: true,
			},
			loop: false,
		});
	});
});

//도서검색 목록
$(function () {
	$('.info_fold').hide();

	$('.list_btn').on('click', function () {
		$('.info_fold')
			.not($('.' + $(this).attr('id')))
			.hide();
		$('.' + $(this).attr('id')).slideToggle(1000);
	});
});

//신착도서, 사서추천도서
$(document).ready(function () {
	const groupSize = 9;

	$('.books_swiper').each(function () {
		const $tab = $(this);
		const $lists = $tab.find('.slide-item');
		const $swiperWrapper = $tab.find('.swiper-wrapper');

		$lists.hide();

		for (let i = 0; i < $lists.length; i += groupSize) {
			const $swiperSlide = $('<div class="swiper-slide"></div>');

			$lists.slice(i, i + groupSize).each(function () {
				$swiperSlide.append($(this).show());
			});

			$swiperWrapper.append($swiperSlide);
		}

		new Swiper($tab.find('.swiper')[0], {
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: $tab.find('.swiper-pagination')[0],
				clickable: true,
			},
			loop: false,
		});
	});
});
//대출베스트
$(document).ready(function () {
	function LibBestSwiper() {
		const swiper = new Swiper('.best_wrap .swiper', {
			loop: false,
			pagination: {
				el: '.best_wrap .swiper-pagination',
				clickable: true,
			},
		});
	}

	LibBestSwiper();
});

//나의 서재
$(document).ready(function () {
	$('.mylib_wrap .my_tab a').click(function () {
		var tab_id = $(this).attr('data-tab');

		$('.mylib_wrap .my_tab a').removeClass('active');
		$('.mylib_wrap .tab_content').removeClass('active');

		$(this).addClass('active');
		$('#' + tab_id).addClass('active');
	});
});
