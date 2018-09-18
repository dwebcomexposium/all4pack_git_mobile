$(window).on('load scroll', function() {
    var winST = $(window).scrollTop();

    $('.site-banner').toggleClass('is-fixed', winST > 0);
    $('.lang-switcher').removeClass('is-open', winST > 0);
    $('.lang-switcher .ls-lang-list').slideUp();

    if ( $('.bread').length ) {
    	$('.bread').each(function() {
    		if ( $(this).find('.ql-list').outerWidth() > 355 ) {
    			$(this).addClass('bread--long')
    		}
    	})
    }
}).on('load', function() {

	var $clone = $('.article .social-sharing').clone().addClass('social-sharing--gray');

	$clone.insertAfter('.article-wrapper .article-title');

	if ($('.actualites .grid-la-list').length) {
		$('.actualites .grid-la-list').carouFredSel({
			width: '100%',
			height: 'auto',
			items: 1,
			responsive: true,
			swipe: {
				onTouch: true,
				onMouse: false
			},
			auto: {
				play: false,
				timeoutDuration: 5000
			},
			pagination: {
				container: '.pagination-alt'
			},
			infinite: true
		});
	}

	if ($('.secteurs .ql-list').length) {
		$('.secteurs .ql-list').each(function(){
			$(this).carouFredSel({
				width: "100%",
				items: {
					visible: 3,
					start: -1
				},
				scroll: { 
					items: 1,
					// duration: 700
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: false,
					timeoutDuration: 5000
				},
				
			});
		});
	}


	if ($('.list-features').length) {
		$('.list-features').carouFredSel({
			width: "100%",
			items: {
				visible: 3,
				start: -1
			},
			auto: true,
			// responsive: true,
			scroll: { 
				items:1,
				duration: 1000,
				timeoutDuration: 1000
			},
			infinite: true, 
		});
	}

})

$('.js-burger').on('click', function(e) {
	e.preventDefault();

	$(this).toggleClass('active');

	$('.global-wrapper').toggleClass('menu-active');
});

$('.newsletter-form .optin-container .nf-form-input').on('click', function() {
	$(this).toggleClass('active');
})

$('.global-wrapper').css('paddingTop', $('.site-banner').outerHeight())

