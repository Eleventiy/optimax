$(function () {

	'use strict';

	// Init Slick Slider
	var articlesSlider = $('#articlesSlider');
	if (articlesSlider.length) {
		articlesSlider.slick({
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slideToScroll: 1,
			infinite: false,
			vertical: true
			// adaptiveHeight: true,
			// autoplay: true,
			// draggable: false
		});
	}

});
