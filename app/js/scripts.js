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

	// Callback Modal window
	var callbackLink = $('#callbackLink'),
			callbackModal = $('#modalCallback'),
			modalOverlay = $('#modalOverlay'),
			closeModalLink = $('#closeCallbackModal');

	callbackLink.click(function(e) {
		e.preventDefault();

		callbackModal.addClass('active');
		modalOverlay.addClass('active');
	});

	closeModalLink.click(function(e) {
		e.preventDefault();

		callbackModal.removeClass('active');
		modalOverlay.removeClass('active');
	});

	modalOverlay.click(function(e) {
		e.preventDefault();

		callbackModal.removeClass('active');
		$(this).removeClass('active');
	});

	// On press ESC button
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			callbackModal.removeClass('active');
			modalOverlay.removeClass('active');
		}
	});
});



