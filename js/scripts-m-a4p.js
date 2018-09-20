var $win = $(window);
var $articleTitle = $('.article .at-theme');

/**
 * Fonction titre
 */
function restrictArticleTitle() {
	var titleWidth = parseInt($articleTitle.css('width'));
	var titlePadding = parseInt($articleTitle.css('paddingLeft'));

	$articleTitle.css('max-width', titleWidth + titlePadding*2);

	$articleTitle.css('display', 'block');
}

/**
 *  breadcrumbs
 */
function initBreadcrumbs() {
	if ( $('.bread, .lp-sousnav').length ) {
    	$('.bread, .lp-sousnav').each(function() {
    		if ( $(this).find('.ql-list').outerWidth() > 355 ) {
    			$(this).parent().addClass('bread--long')
    		}

    		//Exposez page - exposnt
    		if ( $(this).hasClass('lp-sousnav') ) {
    			var $parent = $(this);
    			var $lastItem  = $parent.find('.ql-item:last-child');

    			$parent.parent().addClass('bread--long-blue')

    			$lastItem.detach().addClass('outer-link').prependTo('.wrapper');
    		}
    	})
    }
}

/*
 * Animated text count
 */
function animateCouter(){
	$('.js-count-to').each(function() {
		var $this           = $(this);
		var $statsContainer = $this.closest('.stats');
		var number          = $this.data('count-to');

		$win.on('load scroll', function() {
			var winST = $win.scrollTop();

			if (winST + $win.outerHeight() / 2 > $statsContainer.offset().top && !$this.hasClass('counted')) {
				$this.addClass('counted');

				$({ counter: 0 }).animate({
					counter: number
				}, {
					step: function(now) {
						if (now < 1000) {
							$this.text(parseInt(now));
						} else {
							$this.text((parseInt(now) / 1000).toFixed(3));
						}
					},
					duration: 2000
				});
			}
		});
	});
}

$win.on('load scroll', function() {
    var winST = $win.scrollTop();

    $('.site-banner').toggleClass('is-fixed', winST > 0 && !$('.global-wrapper').hasClass('menu-active'));

    $('.lang-switcher').removeClass('is-open', winST > 0);
    $('.lang-switcher .ls-lang-list').slideUp();

    
}).on('load', function() {

	restrictArticleTitle();
	initBreadcrumbs();
	animateCouter();

	/*
	 * Add language 
	 */
	$('.ls-lang-list').append('<li class="ls-lang-item ls-lang-de"><a href="#" class="ls-lang-link"><i></i></a></li><li class="ls-lang-item ls-lang-es"><a href="#" class="ls-lang-link"><i></i></a></li><li class="ls-lang-item ls-lang-it"><a href="#" class="ls-lang-link"><i></i></a></li>');

	//Clone social icons
	var $clone = $('.article .social-sharing').clone().addClass('social-sharing--gray');
	$clone.insertAfter('.article-wrapper .article-title');

	// SLiders 
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

	// SLiders 
	if ($('.exposez .list-articles .grid-la-list').length || $('.visitez .list-articles .grid-la-list').length || $('.lp-univers .list-articles .grid-la-list').length) {
		$('.exposez .list-articles .grid-la-list').add('.visitez .list-articles .grid-la-list').add('.lp-univers .list-articles .grid-la-list').carouFredSel({
			width: '100%',
			height: 'auto',
			items: 1,
			responsive: true,
			swipe: {
				onTouch: true,
				onMouse: false
			},
			auto: {
				play: true,
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

	if ($('.stats').length) {
		$('.stats').carouFredSel({
			width: '100%',
			height: 'auto',
			items: 1,
			responsive: true,
			swipe: {
				onTouch: true,
				onMouse: false
			},
			auto: {
				play: true,
				timeoutDuration: 5000
			},
			pagination: {
				container: '.pagination-alt'
			},
			infinite: true
		});
	}

})

$('.js-burger').on('click', function(e) {
	e.preventDefault();

	$(this).toggleClass('active');

	$('.global-wrapper').toggleClass('menu-active');

	if ( $('.site-banner').hasClass('is-fixed') && $('.global-wrapper').hasClass('menu-active') ) {
    	$('.site-banner').removeClass('is-fixed')
    }

    if ( !$(this).hasClass('active') && $win.scrollTop() > 0 ) {
    	$('.site-banner').addClass('is-fixed')	
    }
});

$('.newsletter-form .optin-container .nf-form-input').on('click', function() {
	$(this).toggleClass('active');
});

$('.article-wrapper .article-content h4').each(function() {
	var $this = $(this);

	var width = $this.outerWidth();

	if (width > 312) {
		$this.addClass('long')
	}

	$this.css('max-width', width);

	setTimeout(function() {
		$this.css('display', 'block');
	}, 100);
})

//Adds padding-top to global wrapper 
$('.global-wrapper').css('paddingTop', $('.site-banner').outerHeight());

/*
 * Google map
 */
window.initMap = function() {
	var $map = $('.map');
	var lat  = $map.data('lat');
	var lng  = $map.data('lng');

	new google.maps.Map($map.get(0), {
		center			: {
			lat: lat,
			lng: lng
		},
		zoom   			: 13,
		disableDefaultUI: true,
		styles 		    : [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
	});
};
