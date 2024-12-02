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
