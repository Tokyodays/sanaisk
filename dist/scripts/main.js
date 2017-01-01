'use strict';
(function() {

	// detect if IE : from http://stackoverflow.com/a/16657946
	var ie = (function(){
		var undef,rv = -1; // Return value assumes failure.
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');

		if (msie > 0) {
			// IE 10 or older => return version number
			rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		} else if (trident > 0) {
			// IE 11 (or newer) => return version number
			var rvNum = ua.indexOf('rv:');
			rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
		}

		return ((rv > -1) ? rv : undef);
	}());


	// disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = [32, 37, 38, 39, 40], wheelIter = 0;

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault){
      e.preventDefault();
    }

		e.returnValue = false;
	}

	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				preventDefault(e);
				return;
			}
		}
	}

	function touchmove(e) {
		preventDefault(e);
	}

	function wheel(e) {
		// for IE
		//if( ie ) {
			//preventDefault(e);
		//}
	}

	function disable_scroll() {
		window.onmousewheel = document.onmousewheel = wheel;
		document.onkeydown = keydown;
		document.body.ontouchmove = touchmove;
	}

	function enable_scroll() {
		window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
	}

	var docElem = window.document.documentElement,
		scrollVal,
		isRevealed,
		noscroll,
		isAnimating,
		container = document.getElementById( 'container' ),
		trigger = container.querySelector( 'button.trigger' );

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	function scrollPage() {
		scrollVal = scrollY();

		if( noscroll && !ie ) {
			if( scrollVal < 0 ) return false;
			// keep it that way
			window.scrollTo( 0, 0 );
		}

		if( classie.has( container, 'notrans' ) ) {
			classie.remove( container, 'notrans' );
			return false;
		}

		if( isAnimating ) {
			return false;
		}

		if( scrollVal <= 0 && isRevealed ) {
			toggle(0);
		}
		else if( scrollVal > 0 && !isRevealed ){
			toggle(1);
		}
	}

	function toggle( reveal ) {
		isAnimating = true;

		if( reveal ) {
			classie.add( container, 'modify' );
      $("#navigation").removeClass("effect");
		}
		else {
			noscroll = true;
			disable_scroll();
			classie.remove( container, 'modify' );
      $("#navigation").addClass("effect");
		}

		// simulating the end of the transition:
		setTimeout( function() {
			isRevealed = !isRevealed;
			isAnimating = false;
			if( reveal ) {
				noscroll = false;
				enable_scroll();
			}
		}, 1200 );
	}

	// refreshing the page...
	var pageScroll = scrollY();
	noscroll = pageScroll === 0;

	disable_scroll();

	if( pageScroll ) {
		isRevealed = true;
		classie.add( container, 'notrans' );
		classie.add( container, 'modify' );
	}

	if($('.intro-effect-push').length){
		window.addEventListener( 'scroll', scrollPage );
		trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
	} else {
		$('#navigation').removeClass('effect')
	}
})();

(function(win, doc) {
  if ($('#gmap').length) {
    var request = {
      placeId: 'ChIJlfzkL8hLj18R_M1MhUnKXqg'
    };
    var google = win.google,
    elm = $('#gmap'),
    mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      scaleControl: true
    },
    styles = [
      {
        'stylers': [
          {'saturation': 0}
        ]
      }
    ],
    map = new google.maps.Map(elm.get(0), mapOptions),
    geocoder = new google.maps.Geocoder(),
    STYLE_NAME = 'monochrome';
    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        geocoder.geocode({
          'address':'サンアイ精機'
        }, function(results, status){
          if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent(place.adr_address);
            infowindow.open(map, marker);
          }
        });
      }
    });
  }
})(this, document);

$(function(){
  $('.player').YTPlayer();

  // handle the mouseenter functionality
  $('.img').mouseenter(function(){
    $(this).addClass('hover');
  });
  // handle the mouseleave functionality
  $('.img').mouseleave(function(){
    $(this).removeClass('hover');
  });

  //smooth scroll
  $('nav#navigation a').smoothScroll();

	$('#container').hasClass('modify') && $("#navigation").removeClass("effect");

	$('#product a').matchHeight();

	$('#staff div.card').matchHeight();

	$('#inputName, #inputEmail, #inputDetail').change(function(){
		if($('#inputName').val().length > 0 && $('#inputEmail').val().length > 0 && $('#inputDetail').val().length > 0){
			$('#submitbutton').prop('disabled', false);
		} else {
			$('#submitbutton').prop('disabled', true);
		}
	});

	$('#requireform').submit(function(e){
		e.preventDefault();

		var $form = $(this);
		var $button = $form.find('#submitbutton');

    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: $form.serialize()
            + '&delay=1',  // （デモ用に入力値をちょいと操作します）
        timeout: 10000,  // 単位はミリ秒

        // 送信前
        beforeSend: function(xhr, settings) {
            // ボタンを無効化し、二重送信を防止
            $button.attr('disabled', true);
        },
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、再送信を許可
            $button.attr('disabled', false);
        },

        // 通信成功時の処理
        success: function(result, textStatus, xhr) {
            // 入力値を初期化
            $form[0].reset();

            $('#result').text('OK');
        },

        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {}
    });


	});

/*
  $('.effect-left').onScreen({
    container: window,
    direction: 'vertical',
    doIn: function() {
     // Do something to the matched elements as they come in
    },
    doOut: function() {
     // Do something to the matched elements as they get off scren
    },
    tolerance: 0,
    throttle: 50,
    toggleClass: 'onScreen',
    lazyAttr: null,
    lazyPlaceholder: 'someImage.jpg',
    debug: false
  });
	*/
});
